const readline = require('readline');
const {Env} = require('./env.js');
const {read_str} = require('./reader.js');
const {pr_str} = require('./printer.js');
const {ns} = require('./core.js');

const Log = (str, label) => {
  process.stdout.write(label + ': ');
  console.log(str);
};

const READ = read_str;
const PRINT = pr_str;
// const rep = (str) => PRINT(EVAL(READ(str), repl_env));
// なんでこれは動かんのや。
const rep = (str) => {
  const r = READ(str);
  Log(r, 'AST');
  return PRINT(EVAL(r, repl_env));
};


const repl_env = new Env(null);
Object.keys(ns).forEach((key) => {
  repl_env.set(Symbol.for(key), ns[key]);
});

const EVAL = (ast, env) => {
  Log(ast, 'ast in EVAL');
  if(!Array.isArray(ast)) return eval_ast(ast, env);
  else if(ast.length === 0) return ast;
  // apply section
  else {
    const [sym, a0, a1, a2] = ast;
    switch(typeof sym === 'symbol' ? Symbol.keyFor(sym) : Symbol(':default')){
      case 'def!':
        return env.set(a0, EVAL(a1, env));
      case 'let*':
        const let_env = new Env(env);
        const bindings = a0;
        for(let i=0; i<bindings.length; i+=2){
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
      case 'fn*':
        return (...args) => EVAL(a1, new Env(env, a0, args));

      default:
        const [fn, ...args] = eval_ast(ast, env);
        Log([...args], 'default');
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
