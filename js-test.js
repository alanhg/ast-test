const esprima = require('esprima');
let program = 'location.href="https://1991421.cn"';

let data = esprima.tokenize(program);
data.forEach((item) => {
  if ((typeof item.type) !== 'string') {
    return;
  }
  const mark = item.value.charAt(0);
  let res = item.value;
  res = res.replace(/1991421\.cn/, `${mark}+${'window.basicHost'}+${mark}`)
  if (res !== item.value) {
    program = program.replace(item.value, res);
  }
})
console.log(program);

/**
 * [
 { type: 'Keyword', value: 'const' },
 { type: 'Identifier', value: 'answer' },
 { type: 'Punctuator', value: '=' },
 { type: 'Numeric', value: '42' }
 ]
 */
