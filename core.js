const {pr_str} = require('./printer.js');

const ns = {
  '+': {
    value: (a, b) => `(${a} + ${(b)})`,
    type: 'field',
    params_type: ['field', 'field'],
  },
  '-': {
    value: (a, b) => `(${a} - ${(b)})`,
    type: 'field',
    params_type: ['field', 'field'],
  },
  '*': {
    value: (a, b) => `(${a} * ${(b)})`,
    type: 'field',
    params_type: ['field', 'field'],
  },
  '/': {
    value: (a, b) => `(${a} / ${(b)})`,
    type: 'field',
    params_type: ['field', 'field'],
  },
  '&&': {
    value: (a, b) => `(${a} && ${(b)})`,
    type: 'bool',
    params_type: ['bool', 'bool'],
  },
  '||': {
    value: (a, b) => `(${a} || ${(b)})`,
    type: 'bool',
    params_type: ['bool', 'bool'],
  },

  // 'prn': (a) => {
  //   console.log(pr_str(a));
  //   return null;
  // },
  // 'list': (...a) => a,
  // 'list?': (a) => Array.isArray(a),
  // 'empty?': (a) => a.length === 0,
  // 'count': (a) => a === null ? 0 : a.length,

  '=': {
    value: (a, b) => `(${a} == ${(b)})`,
    type: 'bool',
    params_type: ['field', 'field'],
  },
  '<': (a, b) => a < b,
  '<=': (a, b) => a <= b,
  '>': (a, b) => a > b,
  '>=': (a, b) => a >= b,
};

module.exports = {
  ns,
};
