const readline = require('readline');
const {Env} = require('./env.js');
const {read_str} = require('./reader.js');
const {pr_str} = require('./printer.js');

const READ = read_str;

const repl_env = new Env(null);
const num_funcs = {
  [Symbol.for('+')]: (a, b) => a+b,
  [Symbol.for('-')]: (a, b) => a-b,
  [Symbol.for('*')]: (a, b) => a*b,
  [Symbol.for('/')]: (a, b) => parseInt(a/b, 10),
};

Object.getOwnPropertySymbols(num_funcs).forEach((key) => {
  repl_env.set(key, num_funcs[key]);
});

const EVAL = (ast, env) => {
  if(!Array.isArray(ast)) return eval_ast(ast, env);
  else if(ast.length === 0) return ast;
  // apply section
  else {
    const [sym, a0, a1] = ast;
    switch(Symbol.keyFor(sym)){
      case 'def!':
        return env.set(a0, EVAL(a1, env));
      case 'let*':
        const let_env = new Env(env);
        const bindings = a0;
        for(let i=0; i<bindings.length; i+=2){
          let_env.set(bindings[i], EVAL(bindings[i+1], let_env));
        }
        return EVAL(a1, let_env);
      default:
        const [fn, ...args] = eval_ast(ast, env);
        return fn(...args);
    }
  }
};
const PRINT = pr_str;


const eval_ast = (ast, env) => {
  if(typeof ast === 'symbol') return env.get(ast);
  else if(Array.isArray(ast)){
    return ast.map((item) => EVAL(item, env));
  }
  else return ast;
};


const rep = (str) => PRINT(EVAL(READ(str), repl_env));

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// [FIX ME]infinite recursion is BAD???
const recursiveRl= () => {
  rl.question('user> ', (answer)=>{
    if(answer==null) return rl.close();
    else {
      try {
        console.log(rep(answer));
      } catch (error) {
        console.warn(error);
      }
      return recursiveRl();
    }
  });
};

recursiveRl();
