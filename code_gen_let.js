const Log = (...val) => {
  console.log(...val);
};

const code_gen_let = (bindings, exp) => {
  Log('bindings', bindings);
  const parsed_bindings = bindings.map((b, idx) => {
    if(idx%3==0) return Symbol.keyFor(bindings[idx]) + ' ' + Symbol.keyFor(bindings[idx+1]) + ' = ' + String(bindings[idx+2]);
  }).filter((x)=>x);

  const code = `${parsed_bindings.join('\n')}\n${exp}`;
  return code;
};

module.exports = {
  code_gen_let,
};
