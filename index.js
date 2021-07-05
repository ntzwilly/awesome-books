const list = document.getElementById("books");
const form = document.getElementById("book-entry");

const ADD_BOOK = "ADD_BOOK";
const REMOVE_BOOK = "REMOVE_BOOK";

function generateId() {
  return Math.floor((1 + Math.random()) * 0x10000)
    .toString(16)
    .substring(1);
}

function createStore() {
  let state = [];

  const update = (action) => {
    if (action.type === ADD_BOOK) {
      state = state.concat([action.book]);
    } else if (action.type === REMOVE_BOOK) {
      state = state.filter((book) => book.id !== action.book.id);
    }
  };

  return {
    update,
  };
}

const store = createStore();

function addBook(book) {
  console.log(book);
  store.update({
    type: ADD_BOOK,
    book,
  });
}

function removeBook(id) {
  store.update({
    type: REMOVE_BOOK,
    id,
  });
}

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const title = form.elements[0].value;
  const author = form.elements[1].value;
  const id = generateId();

  addBook({ title, author, id });
});
