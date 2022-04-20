const parser = require('@babel/parser');
const traverse = require("@babel/traverse").default;
const generate = require('@babel/generator').default;

const fs = require('fs');

const code = fs.readFileSync(`${__dirname}/Book.tsx`, {encoding: 'utf-8'});
const ast = parser.parse(code, {sourceType: 'module', plugins: ['jsx', 'typescript']});

const modifyValue = (value, componentNode) => value + componentNode.value.name;

/**
 * 关于node-value-type
 * @see https://github.com/babel/babel/blob/main/packages/babel-parser/ast/spec.md#stringliteral
 */
traverse(ast, {
  enter(path) {
    if (path.parentPath && path.parentPath.type === 'ExportDefaultDeclaration') {
      const [titleNode, componentNode] = path.node.properties.reduce((res, item) => {
        if (item.key.type === 'Identifier' && item.key.name === 'title') {
          res[0] = item;
        } else if (item.key.type === 'Identifier' && item.key.name === 'component') {
          res[1] = item;
        }
        return res;
      }, []);
      if (titleNode.value.type === 'StringLiteral') {
        titleNode.value.value = modifyValue(titleNode.value.value, componentNode);
      } else if (titleNode.value.type === 'TemplateLiteral') {
        let value = titleNode.value.quasis[titleNode.value.quasis.length - 1].value;
        value.raw = modifyValue(value.raw, componentNode);
        value.cooked = modifyValue(value.cooked, componentNode);
      }
    }
  },
});


fs.writeFileSync(`${__dirname}/Book-modifier.tsx`, generate(ast).code, {encoding: 'utf-8'});

