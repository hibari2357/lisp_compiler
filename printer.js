const pr_str = (obj) => {
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
    return obj.toString();
  }
};

module.exports = {
  pr_str,
};
