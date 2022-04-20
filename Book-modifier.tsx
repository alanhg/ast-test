const hello = 'llo';
export default {
  /**
   * 字符串，模版字符串，函数
   */
  title: `heBook`,
  component: Book
};

function Book() {
  console.log(this.name);
}