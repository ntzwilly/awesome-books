// State management

const ADD_BOOK = 'ADD_BOOK';
const REMOVE_BOOK = 'REMOVE_BOOK';

function generateId() {
  return Math.floor((1 + Math.random()) * 0x10000)
    .toString(16)
    .substring(1);
}

function createStore(books = []) {
  let state = books;
  const thingsToUpdate = [];

  const update = (action) => {
    if (action.type === ADD_BOOK) {
      state = state.concat([action.book]);
    } else if (action.type === REMOVE_BOOK) {
      state = state.filter((book) => book.id !== action.id);
    }
    thingsToUpdate.forEach((callback) => callback());
  };

  const getState = () => state;

  const onUpdate = (callback) => thingsToUpdate.push(callback);

  return {
    update,
    getState,
    onUpdate,
  };
}

const STORAGE_KEY = 'bookshelf';

class BookStore {
  constructor() {
    // Check for saved books
    const bookshelf = localStorage.getItem(STORAGE_KEY);
    const store = createStore(bookshelf ? JSON.parse(bookshelf) : []);
    // Persist books on page reload
    store.onUpdate(() => {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(store.getState()));
    });
    this.store = store;
  }

  get books() {
    return this.store.getState();
  }

  addBook(book) {
    this.store.update({
      type: ADD_BOOK,
      book,
    });
  }

  removeBook(id) {
    this.store.update({
      type: REMOVE_BOOK,
      id,
    });
  }

  onUpdate(callback) {
    this.store.onUpdate(callback);
  }
}

const bookStore = new BookStore();

// DOM Manipulation

const list = document.getElementById('books');
const form = document.getElementById('book-entry');

form.addEventListener('submit', (event) => {
  event.preventDefault();
  const title = form.elements[0].value;
  const author = form.elements[1].value;
  const id = generateId();

  bookStore.addBook({ title, author, id });
  form.elements[0].value = '';
  form.elements[1].value = '';
});

function addBookToDOM(book) {
  const node = document.createElement('li');
  const title = document.createElement('h2');
  title.innerText = book.title;

  const subtitle = document.createElement('p');
  subtitle.innerText = book.author;

  const button = document.createElement('button');
  button.innerText = 'Remove';
  button.addEventListener('click', () => bookStore.removeBook(book.id));

  node.appendChild(title);
  node.appendChild(subtitle);
  node.appendChild(button);

  list.appendChild(node);
}

window.addEventListener('load', () => {
  bookStore.onUpdate(() => {
    list.innerHTML = '';
    const { books } = bookStore;
    books.forEach(addBookToDOM);
  });
});