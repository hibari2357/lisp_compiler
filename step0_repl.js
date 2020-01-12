const readline = require('readline');

const READ = (str) => {return str};
const EVAL = (str) => {return str};
const PRINT = (str) => {return str};
const rep = (str) => {return PRINT(EVAL(READ(str)))};

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});


// [FIX ME]infinite recursion is BAD???
const recursiveRl= () => {
  rl.question('user> ', (answer)=>{
    if(answer==null) rl.close();
    else {
      console.log(rep(answer));
      recursiveRl();
    }
  })
};

recursiveRl();
