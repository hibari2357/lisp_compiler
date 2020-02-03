const Log = (...val) => {
  console.log(...val);
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
    Log('Env.set', key, String(val));
    this.data[key] = val;
    if(typeof val === 'string'){
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

    if(env){
      if(typeof env.data[key] === 'function') return env.data[key];
      else return Symbol.keyFor(key);
    } else {
      throw new Error(`${Symbol.keyFor(key)} not found`);
    }
  }
}

module.exports = {
  Env,
};

