const readline = require('readline');
const {read_str} = require('./reader.js');
const {pr_str} = require('./printer.js');

const READ = read_str;
const EVAL = (ast, env) => {
  if(!Array.isArray(ast)) return eval_ast(ast, env);
  else if(ast.length === 0) return ast;
  else {
    const [fn, ...args] = eval_ast(ast, env);
    return fn(...args);
  }
};
const PRINT = pr_str;


const repl_env = {
  [Symbol.for('+')]: (a, b) => a+b,
  [Symbol.for('-')]: (a, b) => a-b,
  [Symbol.for('*')]: (a, b) => a*b,
  [Symbol.for('/')]: (a, b) => parseInt(a/b, 10),
};

const eval_ast = (ast, env) => {
  if(typeof ast === 'symbol'){
    if(ast in env) return env[ast];
    else throw new Error(`${Symbol(ast)} not found`);
  }
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
    if(answer==null) rl.close();
    else {
      try {
        console.log(rep(answer));
      } catch (error) {
        console.warn(error);
      }
      recursiveRl();
    }
  });
};

recursiveRl();
