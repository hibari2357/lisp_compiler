const readline = require('readline');
const {Env} = require('./env.js');
const {read_str} = require('./reader.js');
const {pr_str} = require('./printer.js');
const {ns} = require('./core.js');

const {code_gen_define} = require('./code_gen_define.js');
const {code_gen_let} = require('./code_gen_let.js');
const {code_gen_if} = require('./code_gen_if.js');

const Log = (...val) => {
  console.log(...val);
};

const READ = read_str;
const PRINT = pr_str;
// const rep = (str) => PRINT(EVAL(READ(str), repl_env));
const rep = (str) => {
  const r = READ(str);
  return PRINT(EVAL(r, repl_env));
};


const repl_env = new Env(null);
Object.keys(ns).forEach((key) => {
  repl_env.set(Symbol.for(key), ns[key]);
});

const EVAL = (ast, env) => {
  if(!Array.isArray(ast)) return typeof ast === 'symbol'? env.get(ast).value : String(ast);
  else if(ast.length === 0) return ast;
  // apply section
  else {
    const [sym, a0, a1, a2] = ast;
    switch(typeof sym === 'symbol' ? Symbol.keyFor(sym) : Symbol(':default')){
      case 'define': {
        const fn_type = a0[0];
        const label = a0[1];
        const exp = a1;
        if(Array.isArray(exp) && Symbol.keyFor(exp[0]) == 'lambda'){
          const [params, exp_str] = EVAL(exp, env);
          const define_obj = {
            // 関数呼び出しがあったときに出力するコードをset
            value: (...args)=>`${Symbol.keyFor(label)}(${args.join(', ')})`,
            type: null,
            params_type: params.map((p, idx) => {
              if(idx%2==0) return Symbol.keyFor(params[idx]);
            }).filter((x)=>x),
          };

          // ヴァリアントかどうかで型の入れ方を変える
          if(Array.isArray(fn_type) && Symbol.keyFor(fn_type[0]) === '|'){
            define_obj.type = fn_type.slice(1).map((p)=>Symbol.keyFor(p)).join(' | ');
          } else {
            define_obj.type = Symbol.keyFor(fn_type);
          }

          env.set(label, define_obj);
          return code_gen_define(fn_type, label, params, exp_str);
        }
      }
      case 'lambda': {
        // a0は(field a field b)、Envが配列を受けるようにする必要ある。
        // けど一旦全部変数として確かめる。
        const params = a0;
        const exp = a1;
        // インタープリタでは宣言時に評価されないが、コンパイラなのでパラメータ以外の変数が使われていなか
        // チェックするために適当な初期値(Array(params.length))->undefの配列をいれてenv.setしておく
        const exp_str = EVAL(exp, new Env(env, params, Array(params.length/2)));
        return [params, exp_str];
      }
      case 'do': {
        // return eval_ast(ast.slice(1), env)[ast.length-2];
        return EVAL(ast.slice(1), env)[ast.length-2];
      }
      case 'if': {
        const cond = EVAL(a0, env);
        const t_exp = EVAL(a1, env);
        const f_exp = EVAL(a2, env);
        return code_gen_if(cond, t_exp, f_exp);
      }
      case 'let': {
        const let_env = new Env(env);
        const bindings = a0;
        const exp = a1;
        for(let i=0; i<bindings.length; i+=3){
          const type = bindings[i];
          const label = bindings[i+1];
          const initial_value = bindings[i+2];
          if(typeof initial_value === 'number'){
            if(Symbol.keyFor(type) !== 'field') throw new Error(`typeof initial_value is 'field', but typeof '${Symbol.keyFor(label)}' is '${Symbol.keyFor(type)}'`);
          } else if(typeof initial_value === 'boolean') {
            if(Symbol.keyFor(type) !== 'bool') throw new Error(`typeof initial_value is 'bool', but typeof '${Symbol.keyFor(label)}' is '${Symbol.keyFor(type)}'`);
            // 初期値が変数/オペレータ、関数の場合
          } else {
            // 初期値がオペレータ、関数の場合
            let typeof_initial_value;
            if(Array.isArray(initial_value)){
              typeof_initial_value = let_env.get(initial_value[0]).type;
            } else {
              typeof_initial_value = let_env.get(initial_value).type;
            }

            if(Array.isArray(type)){
              const variant_type = type.slice(1).map((p)=>Symbol.keyFor(p)).join(' | ');
              if(typeof_initial_value !== variant_type) throw new Error(`typeof initial_value is ${typeof_initial_value}, but typeof ${Symbol.keyFor(label)} is '${variant_type}'`);
            } else {
              if(typeof_initial_value !== Symbol.keyFor(type)) throw new Error(`typeof initial_value is ${typeof_initial_value}, but typeof ${Symbol.keyFor(label)} is '${Symbol.keyFor(type)}'`);
            }
          }

          const value_str = EVAL(initial_value, let_env);
          const value_obj = {
            value: value_str,
            type: null,
            params_type: [],
          };

          // ヴァリアントかどうかで型の入れ方を変える
          if(Array.isArray(type) && Symbol.keyFor(type[0]) === '|'){
            value_obj.type = type.slice(1).map((p)=>Symbol.keyFor(p)).join(' | ');
          } else {
            value_obj.type = Symbol.keyFor(type);
          }
          let_env.set(label, value_obj);
          // bindingsのvalueをevalしたstrに置き換え
          bindings[i+2] = value_str;
        }
        const exp_str = EVAL(exp, let_env);
        return code_gen_let(bindings, exp_str);
      }
      case 'match': {
        const variant = Symbol.keyFor(a0);
        const [type1, exp1] = [a1[0], a1[1]];
        const [type2, exp2] = [a2[0], a2[1]];
        const match_env1 = new Env(env);
        const match_env2 = new Env(env);
        // ほんとはtypeに合わせた型でenv.setする必要がある
        // type1のv.valueとしてセット
        match_env1.set(Symbol.for(`${variant}.value`), {
          value: 0,
          type: 'field',
          params_type: [],
        });
        // type2のv.valueとしてセット
        match_env2.set(Symbol.for(`${variant}.value`), {
          value: 0,
          type: 'void',
          params_type: [],
        });
 
        // expのvをv.valueに置換
        const replace_variant = (exp) => {
          if(Array.isArray(exp)){
            return exp.map((e) => {
              if(Array.isArray(e)) return replace_variant(e);
              else if(e === Symbol.for(variant)) return Symbol.for(`${variant}.value`);
              else return e;
            });
          } else {
            return exp;
          }
        };
        const exp1_replaced = replace_variant(exp1);
        const exp2_replaced = replace_variant(exp2);
        const code = `if ${variant}.type == 0 then ${EVAL(exp1_replaced, match_env1)} else ${EVAL(exp2_replaced, match_env2)} fi`;
        return code;
      }
      default: {
        // const [fn, ...args] = eval_ast(ast, env);
        // 上記以外のときは最初のsymbolが基本演算子か、defineした関数
        const [fn, ...args] = ast.map((a) => EVAL(a, env));
        const [label, ...args_ast] = ast;

        //これ1変数しかとらないとき落ちますね...
        const fn_params_type = env.get(label).params_type;
        if(args_ast.length !== fn_params_type.length) throw new Error(`'${Symbol.keyFor(sym)}' takes ${fn_params_type.length} params, but given ${args_ast.length}`);
        for(let i=0; i<fn_params_type.length; i++){
          const arg = args_ast[i];
          const param_type = fn_params_type[i];
          if(typeof arg === 'number'){
            if(param_type !== 'field') throw new Error(`typeof '${Symbol.keyFor(label)}' param is '${param_type}', but typeof arg is 'field'`);
          } else if(typeof arg === 'boolean') {
            if(param_type !== 'bool') throw new Error(`typeof '${Symbol.keyFor(label)}' param is '${param_type}', but typeof arg is 'bool'`);
          } else if(Array.isArray(arg)){
            // 最初のsymbolを関数だと考えればそれが返す型を決めている
            const arg_type = env.get(arg[0]).type;
            if(param_type !== arg_type) throw new Error(`typeof '${Symbol.keyFor(label)}' param is '${param_type}', but typeof arg is '${arg_type}'`);
          } else {
            const arg_type = env.get(arg).type;
            if(param_type !== arg_type) throw new Error(`typeof '${Symbol.keyFor(label)}' param is '${param_type}', but typeof arg is '${arg_type}'`);
          }
        }
        const fncall_or_initial_operator_str = fn(...args);
        return fncall_or_initial_operator_str;
      }
    }
  }
};

// const eval_ast = (ast, env) => {
//   if(typeof ast === 'symbol') return env.get(ast);
//   else if(Array.isArray(ast)){
//     return ast.map((item) => EVAL(item, env));
//   } else {
//     return ast;
//   }
// };


const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// [FIX ME]infinite recursion is BAD???
const recursiveRl= () => {
  rl.question('user> ', (input)=>{
    if(input==null) return rl.close();
    else {
      try {
        console.log(rep(input));
      } catch (error) {
        console.warn(error);
      }
      return recursiveRl();
    }
  });
};

recursiveRl();
