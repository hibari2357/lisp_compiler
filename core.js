const {pr_str} = require('./printer.js');

const ns = {
  '+': (a, b) => '(' + String(a) + ' + ' + String(b) + ')',
  '-': (a, b) => '(' + String(a) + ' - ' + String(b) + ')',
  '*': (a, b) => '(' + String(a) + ' * ' + String(b) + ')',
  '/': (a, b) => '(' + String(a) + ' / ' + String(b) + ')',

  'prn': (a) => {
    console.log(pr_str(a));
    return null;
  },
  'list': (...a) => a,
  'list?': (a) => Array.isArray(a),
  'empty?': (a) => a.length === 0,
  'count': (a) => a === null ? 0 : a.length,

  '=': (a, b) => {
    if(Array.isArray(a) && Array.isArray(b)){
      if(a.length !== b.length) return false;
      for(let i=0; i<a.length; i++){
        if(a[i] !== b[i]) return false;
      }
      return true;
    } else {
      return a === b;
    }
  },
  '<': (a, b) => a < b,
  '<=': (a, b) => a <= b,
  '>': (a, b) => a > b,
  '>=': (a, b) => a >= b,
};


module.exports = {
  ns,
};
