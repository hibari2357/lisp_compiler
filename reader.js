const Log = (...val) => {
  console.log(...val);
};


class Reader {
  constructor(tokens){
    this.tokens = tokens;
    this.position = 0;
  }

  next() {
    return this.tokens[this.position++];
  }

  peek() {
    return this.tokens[this.position];
  }
}

const read_str = (str) => {
  const tokens = tokenize(str);
  Log('tokens', tokens);
  return read_form(new Reader(tokens));
};

const tokenize = (str) => {
  const tokens = [];
  const pattern = /[\s,]*(~@|[\[\]{}()'`~^@]|"(?:\\.|[^\\"])*"?|;.*|[^\s\[\]{}('"`,;)]*)/g;
  let result;
  while((result = pattern.exec(str)[1])!==''){
    tokens.push(result);
  }
  // console.log('tokenize:', tokens);
  return tokens;
};

const read_form = (reader) => {
  const token = reader.peek();
  // console.log('read_form', token);
  if(token === '(') return read_list(reader);
  else return read_atom(reader);
};


const read_list = (reader) => {
  const ast = [];
  let token = reader.next();
  if (token !== '(') throw new Error('expected "(" ');

  while((token = reader.peek())!==')'){
    // console.log('read_list', token);
    if(!token) throw new Error('expected ")", got EOF');
    ast.push(read_form(reader));
  }
  reader.next();
  // console.log(ast);
  return ast;
};

const read_atom = (reader) => {
  const token = reader.next();
  // console.log('read_atom:', token);
  if (token.match(/^-?[0-9]+$/)) {
    return parseInt(token, 10);
  }
  else if(token === 'nil') return null;
  else if(token === 'true' || token === 'false') return (token === 'true');
  else {
    return Symbol.for(token);
  }
};

module.exports = {
  read_str,
};

