const Log = (...val) => {
  console.log(...val);
};

const code_gen_if = (cond, t_exp, f_exp) => {
  const code = `if ${cond} then ${t_exp} else ${f_exp} fi`;
  return code;
};

module.exports = {
  code_gen_if,
};
