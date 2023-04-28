const openFormBtn = document.getElementById("open-book-form-btn");
const formWrapper = document.getElementById("darken-wrapper");
const closeFormBtn = document.getElementById("close-form-btn");

// The Library array to store books
let myLibrary = [];

// Function to create new book objects
function Book(title, author, published, coverUrl, read, displayed) {
  this.title = title;
  this.author = author;
  this.published = published;
  this.coverUrl = coverUrl;
  this.read = read;
  this.displayed = displayed;
  myLibrary.push(this);
}

// Manually added placeholder books
new Book(
  "Harry Potter",
  "J. K. Rowling",
  1997,
  "https://m.media-amazon.com/images/I/71-++hbbERL.jpg",
  true,
  false
);
new Book(
  "The Hobbit",
  "J. R. R. Tolkien",
  "1937",
  "https://m.media-amazon.com/images/I/81-JdmZeA9L._AC_UF1000,1000_QL80_.jpg",
  false,
  false
);

// Function to display books in the DOM
function displayBooks() {
  for (let i = 0; i < myLibrary.length; i++) {
    if (myLibrary[i].displayed == true) {
      continue;
    } else {
      const bookDisplay = document.getElementById("display");
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
      // Insert placeholder cover if input is left empty
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
      newDeleteButton.textContent = "Delete";
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
      }
      newCheckbox.addEventListener("change", () => {
        toggleReadStatus(i);
      });
      toggleReadStatus(i);
      myLibrary[i].displayed = true;
      formWrapper.style.display = "none";
    }
  }
}
displayBooks();

// Add Book button
const addBookBtn = document.getElementById("addBookBtn");
const bookNameInput = document.getElementById("book-name-input");
const authorNameInput = document.getElementById("author-name-input");
const publishedInput = document.getElementById("published-input");
const readInput = document.getElementById("read-input");
const coverUrlInput = document.getElementById("coverUrl-input");

addBookBtn.addEventListener("click", (e) => {
  e.preventDefault();
  //   Preventing empty inputs
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

  //  Forming an object out of the inputs
  new Book(
    bookNameInput.value,
    authorNameInput.value,
    publishedInput.value,
    coverUrlInput.value,
    readInput.checked,
    false
  );
  displayBooks();
  resetInputFields();
});

// Function for delete button
function deleteBook(i) {
  myLibrary.splice(i, 1)
  document.getElementById(`book-${i}`).remove();
}

// Function to empty the input fields after adding a book
function resetInputFields() {
  bookNameInput.value = "";
  authorNameInput.value = "";
  publishedInput.value = "";
  coverUrlInput.value = "";
  readInput.checked = false;
}

// Add book form and close form button
openFormBtn.addEventListener("click", () => {
  formWrapper.style.display = "block";
});
closeFormBtn.addEventListener("click", (e) => {
  e.preventDefault();
  formWrapper.style.display = "none";
});

// Toggle read status
function toggleReadStatus(i) {
  if (myLibrary[i].read == true) {
    myLibrary[i].read = false;
    document.getElementById(`book-${i}`).style.opacity = "0.4";
  } else {
    myLibrary[i].read = true;
    document.getElementById(`book-${i}`).style.opacity = "1";
  }
  console.log(myLibrary[i].read);
}
