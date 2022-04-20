export default {
  title: "helloBook",
  component: Book
};

function Book() {
  console.log(this.name);
}