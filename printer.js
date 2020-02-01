const Log = (...val) => {
  console.log(...val);
};


const pr_str = (obj) => {
  Log('obj in pr_str', obj);
  if(Array.isArray(obj)){
    return '(' + obj.map((item) => pr_str(item)).join(' ') + ')';
  }
  else if(typeof obj === 'symbol'){
    return Symbol.keyFor(obj);
  }
  else if(obj === null){
    return 'nil';
  }
  else {
    Log('obj.toString()', obj.toString());
    return obj.toString();
  }
};

module.exports = {
  pr_str,
};
