// The Library array to store books
let myLibrary = [];

// Function to create new book objects
function Book(title, author, published, read, displayed) {
  this.title = title;
  this.author = author;
  this.published = published;
  this.read = read;
  this.displayed = displayed;
  myLibrary.push(this);
}

// Manually added placeholder books
new Book("Harry Potter", "J. K. Rowling", 1997, true, false);
new Book("The Hobbit", "J. R. R. Tolkien", "1937", false, false);

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
      const newDeleteButton = newBookTile.appendChild(document.createElement("button"));
      newDeleteButton.setAttribute("type", "submit");
      newDeleteButton.classList.add("delete-btn");
      newDeleteButton.innerHTML = '<i class="fa-solid fa-xmark"></i>';
      newDeleteButton.dataset.arrayPosition = `${i}`;
      newDeleteButton.addEventListener("click", () => {
        deleteBook(newDeleteButton.dataset.arrayPosition)
      })
      const newTitle = newBookTile.appendChild(document.createElement("h3"));
      newTitle.classList.add("title");
      newTitle.textContent = myLibrary[i].title;
      const newAuthor = newBookTile.appendChild(document.createElement("p"));
      newAuthor.classList.add("author");
      newAuthor.textContent = `by ${myLibrary[i].author}`;
      const newPublished = newBookTile.appendChild(document.createElement("p"));
      newPublished.classList.add("published");
      newPublished.textContent = myLibrary[i].published;
      const newWrapper = newBookTile.appendChild(document.createElement("div"));
      newWrapper.classList.add("read-wrapper");
      const newRead = newWrapper.appendChild(document.createElement("p"));
      newRead.classList.add("read");
      newRead.textContent = "Mark as read";
      const newCheckbox = newWrapper.appendChild(document.createElement("input"));
      newCheckbox.classList.add("read-box");
      newCheckbox.setAttribute("type", "checkbox");
      newCheckbox.setAttribute("name", "read-box");
      if (myLibrary[i].read == true) {
        newCheckbox.checked = true;
      }
      myLibrary[i].displayed = true;
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
    readInput.checked,
    false
  );
  displayBooks();
});

// Function for delete button 
function deleteBook(arrayPosition) {
myLibrary.splice(arrayPosition, 1);
document.getElementById(`book-${arrayPosition}`).remove()
}