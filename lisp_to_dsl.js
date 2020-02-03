const readline = require('readline');
const {Env} = require('./env.js');
const {read_str} = require('./reader.js');
const {pr_str} = require('./printer.js');
const {ns} = require('./core.js');

const {code_gen_define} = require('./code_gen_define.js');

const Log = (...val) => {
  console.log(...val);
};

const READ = read_str;
const PRINT = pr_str;
// const rep = (str) => PRINT(EVAL(READ(str), repl_env));
const rep = (str) => {
  const r = READ(str);
  Log('AST', r);
  return PRINT(EVAL(r, repl_env));
};


const repl_env = new Env(null);
Object.keys(ns).forEach((key) => {
  repl_env.set(Symbol.for(key), ns[key]);
});

const EVAL = (ast, env) => {
  Log('ast in EVAL', ast);
  if(!Array.isArray(ast)) return eval_ast(ast, env);
  else if(ast.length === 0) return ast;
  // apply section
  else {
    const [sym, a0, a1, a2] = ast;
    switch(typeof sym === 'symbol' ? Symbol.keyFor(sym) : Symbol(':default')){
      case 'define':
        Log('defineの中', sym, a0, a1, a2);
        if(Array.isArray(a1) && Symbol.keyFor(a1[0]) == 'lambda'){
          const [params, exp] = EVAL(a1, env);
          Log('define lambda', params, exp);

          // 関数呼び出しがあったときに出力するコードをset
          env.set(a0[1], (...args)=>`${Symbol.keyFor(a0[1])}(${args.join(', ')})`);
          return code_gen_define(a0, params, exp);
        } else {
          return env.set(a0, EVAL(a1, env));
        }
      case 'let':
        const let_env = new Env(env);
        const bindings = a0;
        for(let i=0; i<bindigs.length; i+=2){
          let_env.set(bindings[i], EVAL(bindings[i+1], let_env));
        }
        return EVAL(a1, let_env);
      case 'do':
        return eval_ast(ast.slice(1), env)[ast.length-2];
      case 'if':
        const cond = EVAL(a0, env);
        if(cond !== false && cond !== null){
          return EVAL(a1, env);
        } else {
          return typeof a2 === 'undefined' ? null : EVAL(a2, env);
        }
      case 'lambda':
        // a0は(field a field b)、Envが配列を受けるようにする必要ある。
        // けど一旦全部変数として確かめる。
        const exp = EVAL(a1, new Env(env, a0, Array(a0.length)));
        Log('lambdaEXP', exp);
        return [a0, exp];
      default:
        const [fn, ...args] = eval_ast(ast, env);
        Log('default_args', [...args]);
        Log('default_fn', fn);
        return fn(...args);
    }
  }
};

const eval_ast = (ast, env) => {
  if(typeof ast === 'symbol') return env.get(ast);
  else if(Array.isArray(ast)){
    return ast.map((item) => EVAL(item, env));
  } else {
    return ast;
  }
};


const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// [FIX ME]infinite recursion is BAD???
const recursiveRl= () => {
  rl.question('user> ', (input)=>{
    if(input==null) return rl.close();
    else {
      try {
        console.log(rep(input));
      } catch (error) {
        console.warn(error);
      }
      return recursiveRl();
    }
  });
};

recursiveRl();
