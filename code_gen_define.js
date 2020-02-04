const Log = (...val) => {
  console.log(...val);
};

const parse_exp = (exp) => {
  //以降改行がない行頭にreturnを追加して、すべての行頭にインデントを追加する
  return exp.replace(/^(?!.*\n)/gm, 'return ').replace(/^/gm, '  ');
};

const code_gen_define = (label, params, exp) => {
  Log('code_gen_define:label:params:exp', label, params, exp);
  const parsed_params = params.map((p, idx) => {
    if(idx%2==0) return Symbol.keyFor(params[idx]) + ' ' + Symbol.keyFor(params[idx+1]);
  }).filter((x)=>x);

  const parsed_exp = parse_exp(exp);
  // [FIX ME]文字列にインデントのスペースが含まれちゃうからインデント崩してる。
  const code = `def ${Symbol.keyFor(label[1])}(${parsed_params.join(', ')}) -> (${Symbol.keyFor(label[0])}):\n${parsed_exp}`;
  return code;
};

module.exports = {
  code_gen_define,
};
