const Log = (...val) => {
  console.log(...val);
};

const code_gen_let = (bindings, exp) => {
  const parsed_bindings = bindings.map((b, idx) => {
    if(idx%3==0) {
      // ヴァリアント型宣言の場合

      if(Array.isArray(bindings[idx]) && Symbol.keyFor(bindings[idx][0]) === '|'){
        const global_struct_code = '<global>\nstruct variant {\n  field type\n  field value\n}\n</global>';
        // ヴァリアントは初期値に関数を取れないので、適当な初期値を置く
        const assignment_code = (
          'variant ' + Symbol.keyFor(bindings[idx+1]) + ' = variant {type: 0, value: 0}\n' +
          Symbol.keyFor(bindings[idx+1]) + ' = '+ bindings[idx+2]
        );
        const variant_code = global_struct_code + '\n' + assignment_code;
        return variant_code;
      } else {
        const assignment_code = Symbol.keyFor(bindings[idx]) + ' ' + Symbol.keyFor(bindings[idx+1]) + ' = ' + bindings[idx+2];
        return assignment_code;
      }
    }
  }).filter((x)=>x);

  const code = `${parsed_bindings.join('\n')}\n${exp}`;
  return code;
};

module.exports = {
  code_gen_let,
};
