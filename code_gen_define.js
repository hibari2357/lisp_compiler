const Log = (...val) => {
  console.log(...val);
};

const code_gen_define = (label, params, exp) => {
  const parsed_params = params.map((p, idx) => {
    if(idx%2==0) return Symbol.keyFor(params[idx]) + ' ' + Symbol.keyFor(params[idx+1]);
  }).filter((x)=>x);

  const code = `
    def ${Symbol.keyFor(label[1])}(${parsed_params.join(', ')}) -> (${Symbol.keyFor(label[0])}):
      return ${exp}
  `;
  return code;
};

module.exports = {
  code_gen_define,
};
