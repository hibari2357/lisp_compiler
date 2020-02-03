const Log = (...val) => {
  console.log(...val);
};

const code_gen_define = (label, params, exp) => {
  Log('code_gen_labe_params_exp', label, params, exp);
  const parsed_params = params.map((p, idx)=>{
    if(idx%2==0){
      const r = Symbol.keyFor(params[idx]) + ' ' + Symbol.keyFor(params[idx+1]);
      Log('code_gen_param_map', r);
      return r;
    }
  }).filter((x)=>x);

  Log('parsed_params', parsed_params);
  const code = `
  def ${Symbol.keyFor(label[1])}(${parsed_params.join(', ')}) -> (${Symbol.keyFor(label[0])}):
    return ${exp}
`;
  return code;
};

module.exports = {
  code_gen_define,
};
