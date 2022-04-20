const parser = require('@babel/parser');
const traverse = require("@babel/traverse").default;
const generate = require('@babel/generator').default;

const fs = require('fs');

const code = fs.readFileSync(`${__dirname}/Book.tsx`, {encoding: 'utf-8'});
const ast = parser.parse(code, {sourceType: 'module', plugins: ['jsx', 'typescript']});

traverse(ast, {
  enter(path) {
    if (path.parentPath && path.parentPath.type === 'ExportDefaultDeclaration') {
      const titleNode = path.node.properties.find(item => item.key.type === 'Identifier' & item.key.name === 'title');
      const componentNode = path.node.properties.find(item => item.key.type === 'Identifier' & item.key.name === 'component');
      titleNode.value.value = titleNode.value.value + componentNode.value.name;
    }
  },
});


fs.writeFileSync(`${__dirname}/Book-modifier.tsx`, generate(ast).code, {encoding: 'utf-8'});

