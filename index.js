const list = document.getElementById("books");
const form = document.getElementById("book-entry");

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const title = form.elements[0].value;
  const author = form.elements[1].value;

  console.log(title, author);
});
