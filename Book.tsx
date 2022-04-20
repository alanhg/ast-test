export default {
  title: 'hello',
  component: Book,
};

function Book() {
  console.log(this.name);
}
