const Log = (...val) => {
  console.log(...val);
};

class Env {
  constructor(outer={}, binds=[], exprs=[]){
    this.outer = outer;
    this.data = {};

    for(let i=0; i<binds.length; i+=2){
      this.set(binds[i+1], {
        value: exprs[i],
        type: Symbol.keyFor(binds[i]),
        params_type: [],
      });
    }
  }

  set(key, val){
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

