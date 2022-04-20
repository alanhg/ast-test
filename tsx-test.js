const parser = require('@babel/parser');
const fs = require('fs');

const code = fs.readFileSync(`${__dirname}/Book.tsx`, {encoding: 'utf-8'});
const ast = parser.parse(code, {sourceType: 'module'});

console.log(ast);
