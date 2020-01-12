class Env {
  constructor(outer={}, binds=[], exprs=[]){
    this.outer = outer;
    this.data = {};

    for(let i=0; i<binds.length; i++){
      this.set(binds[i], exprs[i]);
    }
  }

  set(key, val){
    return this.data[key] = val;
  }

  find(key){
    // console.log('find', this, key);
    if(key in this.data) return this;
    else if(this.outer) return this.outer.find(key);
    else return null;
  }

  get(key){
    const env = this.find(key);
    // console.log('get', key, env);
    if(env) return env.data[key];
    else throw new Error(`${Symbol.keyFor(key)} not found`);
  }
}

module.exports = {
  Env,
};

