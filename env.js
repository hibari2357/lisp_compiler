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
    if(typeof val.value === 'function'){
      this.data[key] = val;
    } else {
      val.value = Symbol.keyFor(key);
      this.data[key] = val;
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
      return env.data[key];
      // if(typeof env.data[key] === 'function') return env.data[key];
      // else return Symbol.keyFor(key);
    } else {
      throw new Error(`${Symbol.keyFor(key)} is not declared`);
    }
  }
}

module.exports = {
  Env,
};

