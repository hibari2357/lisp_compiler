const readline = require('readline');
const {read_str} = require('./reader.js');
const {pr_str} = require('./printer.js');




const READ = read_str;
const EVAL = (str) => {return str};
const PRINT =  pr_str;


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
