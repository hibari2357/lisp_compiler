const readline = require('readline');
const {Env} = require('./env.js');
const {read_str} = require('./reader.js');
const {pr_str} = require('./printer.js');
const {ns} = require('./core.js');

const {code_gen_define} = require('./code_gen_define.js');
const {code_gen_let} = require('./code_gen_let.js');
const {code_gen_if} = require('./code_gen_if.js');

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
  // if(!Array.isArray(ast)) return eval_ast(ast);
  if(!Array.isArray(ast)) return typeof ast === 'symbol'? env.get(ast) : ast;
  else if(ast.length === 0) return ast;
  // apply section
  else {
    const [sym, a0, a1, a2] = ast;
    switch(typeof sym === 'symbol' ? Symbol.keyFor(sym) : Symbol(':default')){
      case 'define': {
        Log('defineの中', sym, a0, a1, a2);
        const label = a0;
        const exp = a1;
        if(Array.isArray(exp) && Symbol.keyFor(exp[0]) == 'lambda'){
          const [params, exp_str] = EVAL(exp, env);
          Log('define lambda', params, exp_str);

          // 関数呼び出しがあったときに出力するコードをset
          env.set(label[1], (...args)=>`${Symbol.keyFor(label[0])}(${args.join(', ')})`);
          return code_gen_define(label, params, exp_str);
        } else {
          return env.set(a0, EVAL(a1, env));
        }
      }
      case 'let': {
        const let_env = new Env(env);
        const bindings = a0;
        const exp = a1;
        for(let i=0; i<bindings.length; i+=3){
          const value_str = EVAL(bindings[i+2], let_env);
          let_env.set(bindings[i+1], value_str);
          bindings[i+2] = value_str;
        }
        Log('let_env', let_env);
        const exp_str = EVAL(exp, let_env);
        return code_gen_let(bindings, exp_str);
      }
      case 'do': {
        // return eval_ast(ast.slice(1), env)[ast.length-2];
        return EVAL(ast.slice(1), env)[ast.length-2];
      }
      case 'if': {
        const cond = EVAL(a0, env);
        const t_exp = EVAL(a1, env);
        const f_exp = EVAL(a2, env);
        return code_gen_if(cond, t_exp, f_exp);
      }
      case 'lambda': {
        // a0は(field a field b)、Envが配列を受けるようにする必要ある。
        // けど一旦全部変数として確かめる。
        const params = a0;
        const exp = a1;
        const exp_str = EVAL(exp, new Env(env, params, Array(params.length)));
        Log('zokEXPinLambda', lambda_exp_str);
        return [params, exp_str];
      }
      default: {
        // const [fn, ...args] = eval_ast(ast, env);
        // 上記以外のときは最初のsynbolが基本演算子か、defineした関数
        const [fn, ...args] = ast.map((a) => EVAL(a, env));
        Log('default_args', [...args]);
        Log('default_fn', fn);
        const fncall_or_initial_operator_str = fn(...args);
        return fncall_or_initial_operator_str;
      }
    }
  }
};

// const eval_ast = (ast, env) => {
//   if(typeof ast === 'symbol') return env.get(ast);
//   else if(Array.isArray(ast)){
//     return ast.map((item) => EVAL(item, env));
//   } else {
//     return ast;
//   }
// };


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
