const Log = (...val) => {
  console.log(...val);
};

const parse_exp = (exp_str) => {
  // 以降改行がない行頭にreturnを追加して、すべての行頭にインデントを追加する
  return exp_str.replace(/^(?!.*\n)/gm, 'return ').replace(/^/gm, '  ');
};

const variant_replace = (exp_str) => {
  // ほんとはifかどうかも分ける必要ある
  // returnしているexpをキャプチャ
  const return_str = /return(.*)$/.exec(exp_str)[1];
  // trueの場合とfalseの場合の返り値をキャプチャ
  const return_value1 = /then (.*) else/.exec(return_str)[1];
  const return_value2 = /else (.*) fi/.exec(return_str)[1];
  // ほんとはvalueの中の型を見て、typeを決める必要がある
  const variant1 = `variant {type: 0, value: ${return_value1}}`;
  // type voidのときはnullがないのでvalue: 0にする
  const variant2 = `variant {type: 1, value: 0}`;
  const esc = (s) => s.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');

  const regexp1 = new RegExp(`${esc(return_value1)}`);
  const regexp2 = new RegExp(`${esc(return_value2)}`);
  return exp_str.replace(regexp1, variant1).replace(regexp2, variant2);
};


const code_gen_define = (return_type, fn_name, params, exp_str) => {
  // 関数の引数のパース
  const parsed_params = params.map((p, idx) => {
    if(idx%2==0) return Symbol.keyFor(params[idx]) + ' ' + Symbol.keyFor(params[idx+1]);
  }).filter((x)=>x);
  // 関数のexpのパース
  const parsed_exp_str = parse_exp(exp_str);

  // variantを返す関数
  if(Array.isArray(return_type) && Symbol.keyFor(return_type[0]) == '|'){
    const variant_replaced_exp_str = variant_replace(parsed_exp_str);
    const code = `def ${Symbol.keyFor(fn_name)}(${parsed_params.join(', ')}) -> (variant):\n${variant_replaced_exp_str}`;
    return code;
  } else {
    // その他の型を返す関数
    // [FIX ME]文字列にインデントのスペースが含まれちゃうから一行で書いてて長い。
    const code = `def ${Symbol.keyFor(fn_name)}(${parsed_params.join(', ')}) -> (${Symbol.keyFor(return_type)}):\n${parsed_exp_str}`;
    return code;
  }
};

module.exports = {
  code_gen_define,
};
