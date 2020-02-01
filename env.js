const Log = (str, label) => {
  process.stdout.write(label + ': ');
  console.log(str);
};
class Env {
  constructor(outer={}, binds=[], exprs=[]){
    this.outer = outer;
    this.data = {};

    for(let i=0; i<binds.length; i++){
      this.set(binds[i], exprs[i]);
    }
  }

  set(key, val){
    Log(String(val), 'Env.set');
    this.data[key] = val;
    if(typeof val === 'function'){
      // Log(val(1, 2), '関数をdefしたときにsetはどれくらい情報をもってる？');
      return 'def add(field a, field b) -> (field):';
    } else {
      return 'letのときに書く';
    }
  }

  find(key){
    // console.log('find', this, key);
    if(key in this.data) return this;
    else if(this.outer) return this.outer.find(key);
    else return null;
  }

  get(key){
    const env = this.find(key);
    const initial_key = [
      '+', '-', '*', '/', 'prn', 'list', 'list?',
      'empty?', 'count', '=', '<', '<=', '>', '>=',
    ];

    if(env){
      if(initial_key.includes(Symbol.keyFor(key))) return env.data[key];
      else return Symbol.keyFor(key);
    } else {
      throw new Error(`${Symbol.keyFor(key)} not found`);
    }
  }
}

module.exports = {
  Env,
};

