const openFormBtn = document.getElementById("open-book-form-btn");
const formWrapper = document.getElementById("darken-wrapper");
const bookDisplay = document.getElementById("display");

// The Library array to store books
let myLibrary = [];

// Function to create new book objects
function Book(title, author, published, coverUrl, read, displayed) {
  this.title = title;
  this.author = author;
  this.published = published;
  this.coverUrl = coverUrl;
  this.read = read;
  myLibrary.push(this);
}

// Manually added placeholder books
new Book(
  "Harry Potter",
  "J. K. Rowling",
  1997,
  "https://m.media-amazon.com/images/I/71-++hbbERL.jpg",
  false
);
new Book(
  "The Hobbit",
  "J. R. R. Tolkien",
  "1937",
  "https://m.media-amazon.com/images/I/81-JdmZeA9L._AC_UF1000,1000_QL80_.jpg",
  false
);

// Function to display books in the DOM
function displayBooks() {
  bookDisplay.innerHTML = "";
  for (let i = 0; i < myLibrary.length; i++) {
    const newBookTile = bookDisplay.appendChild(document.createElement("div"));
    newBookTile.setAttribute("id", `book-${i}`);
    newBookTile.classList.add("book-tile");

    const newTitle = newBookTile.appendChild(document.createElement("h3"));
    newTitle.classList.add("title");
    newTitle.textContent = myLibrary[i].title;

    const newAuthor = newBookTile.appendChild(document.createElement("p"));
    newAuthor.classList.add("author");
    newAuthor.textContent = `by ${myLibrary[i].author}`;

    const newPublished = newBookTile.appendChild(document.createElement("p"));
    newPublished.classList.add("published");
    newPublished.textContent = myLibrary[i].published;

    const newCover = newBookTile.appendChild(document.createElement("img"));
    newCover.classList.add("cover");
    if (`${myLibrary[i].coverUrl}`.trim() === "") {
      newCover.setAttribute("src", "./images/placeholder.jpg");
    } else {
      newCover.setAttribute("src", `${myLibrary[i].coverUrl}`);
    }

    const newWrapper = newBookTile.appendChild(document.createElement("div"));
    newWrapper.classList.add("read-wrapper");

    const newDeleteButton = newWrapper.appendChild(document.createElement("button"));
    newDeleteButton.setAttribute("type", "submit");
    newDeleteButton.classList.add("delete-btn");
    newDeleteButton.textContent = "delete";
    newDeleteButton.dataset.arrayPosition = `${i}`;
    newDeleteButton.addEventListener("click", () => {
      deleteBook(i);
    });

    const newRead = newWrapper.appendChild(document.createElement("p"));
    newRead.classList.add("read");
    newRead.textContent = "Read";

    const newCheckbox = newWrapper.appendChild(document.createElement("input"));
    newCheckbox.classList.add("read-box");
    newCheckbox.setAttribute("type", "checkbox");
    newCheckbox.setAttribute("name", "read-box");
    if (myLibrary[i].read == true) {
      newCheckbox.checked = true;
      document.getElementById(`book-${i}`).style.opacity = "0.4";
    }
    newCheckbox.addEventListener("change", () => {
      toggleReadStatus(i);
    });
    formWrapper.style.display = "none";
  }
}
displayBooks();

// Opening and closing the add book form
const addBookSection = document.getElementById("add-book-section");
const addBookBtn = document.getElementById("addBookBtn");
const bookNameInput = document.getElementById("book-name-input");
const authorNameInput = document.getElementById("author-name-input");
const publishedInput = document.getElementById("published-input");
const readInput = document.getElementById("read-input");
const coverUrlInput = document.getElementById("coverUrl-input");

addBookBtn.addEventListener("click", (e) => {
  e.preventDefault();
  if (bookNameInput.value.trim() === "") {
    alert("Please enter the books name");
    return;
  }
  if (authorNameInput.value.trim() === "") {
    alert("Please enter the authors name");
    return;
  }
  if (publishedInput.value.trim() === "") {
    alert("Please enter the published year");
    return;
  }
  new Book(bookNameInput.value, authorNameInput.value, publishedInput.value, coverUrlInput.value);
  displayBooks();
  resetInputFields();
});

openFormBtn.addEventListener("click", () => {
  formWrapper.style.display = "block";
});

formWrapper.addEventListener("click", (e) => {
  e.preventDefault();
  if (e.target == formWrapper) {
    formWrapper.style.display = "none";
  }
});

// Function for delete button
function deleteBook(i) {
  myLibrary.splice(i, 1);
  document.getElementById(`book-${i}`).remove();
  displayBooks();
}

// Function to empty the input fields after adding a book
function resetInputFields() {
  bookNameInput.value = "";
  authorNameInput.value = "";
  publishedInput.value = "";
  coverUrlInput.value = "";
}

// Toggle read status
function toggleReadStatus(i) {
  if (myLibrary[i].read == true) {
    myLibrary[i].read = false;
    document.getElementById(`book-${i}`).style.opacity = "1";
  } else {
    myLibrary[i].read = true;
    document.getElementById(`book-${i}`).style.opacity = "0.4";
  }
  console.log(myLibrary[i].read);
}
