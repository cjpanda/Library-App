//Click Event on the Add Button to Show Form
document.getElementById("add").addEventListener("click", () => {
  document.getElementById("overlay").style.opacity = "1";
  document.getElementById("overlay").style.pointerEvents = "auto";
  document.getElementById("form-container").style.display = "flex";
});
//Click Event on the Remove  Form
document.getElementById("overlay").addEventListener("click", () => {
  document.getElementById("overlay").style.opacity = "0";
  document.getElementById("overlay").style.pointerEvents = "none";
  document.getElementById("form-container").style.display = "none";
});

// Define the Book constructor
function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;

  // Method to check if the book is valid
  this.isValid = function () {
    if (!title || !author || !pages || isNaN(pages) || pages <= 0) {
      return false;
    }
    if (typeof author !== "string") {
      return false;
    }
    return true;
  };

  // Method to display book information
  this.info = function () {
    const readStatus = this.read ? "read" : "not read yet";
    return `${title} by ${author}, ${pages} pages, ${readStatus}`;
  };
}

// Get Form values
document
  .getElementById("book-form")
  .addEventListener("submit", function (event) {
    event.preventDefault(); // Prevents Form Behaviour

    // Get the values from the input fields
    const title = document.getElementById("title").value;
    const author = document.getElementById("author").value;
    const pages = parseInt(document.getElementById("pages").value);
    const read = document.getElementById("checkbox").checked;

    // Create a new Book instance
    const newBook = new Book(title, author, pages, read);

    // Check if Book Exists
    if (isBookExists(newBook)) {
      alert("This book already exists in the library.");
      return; // Exit the function
    }

    // Check if the book is valid
    if (newBook.isValid()) {
      addBookToLibrary(newBook); // Add the book to the library
      alert("Book added successfully");
      console.log("Book added successfully:", newBook.info()); // Display success message
      clearForm(); // Clear the form fields
    } else {
      alert("Invalid book details. Please check and try again.");
      console.error("Invalid book details. Please check and try again."); // Display error message
    }
  });

const myLibrary = [];

// Function to add a new book to the library
function addBookToLibrary(book) {
  myLibrary.push(book);
  saveLibraryToStorage();
  updateBooksDisplay();
}

// Function to clear the form fields
function clearForm() {
  document.getElementById("title").value = "";
  document.getElementById("author").value = "";
  document.getElementById("pages").value = "";
  document.getElementById("checkbox").checked = false;
}

// Function to check if a book already exists in the library
function isBookExists(book) {
  for (let i = 0; i < myLibrary.length; i++) {
    if (
      myLibrary[i].title === book.title &&
      myLibrary[i].author === book.author
    ) {
      return true; // Book already exists
    }
  }
  return false; // Book does not exist
}

// Function to update the books display

function updateBooksDisplay() {
  const booksDisplay = document.getElementById("books-display");
  booksDisplay.innerHTML = ""; // Clear previous content

  // Loop through each book in the library
  myLibrary.forEach((book, index) => {
    // Create a div for the book container
    const bookDiv = document.createElement("div");
    bookDiv.classList.add("book-container");

    // Create and append the book information to the book container
    const bookNumber = document.createElement("h2");
    bookNumber.textContent = `Book Number ${index + 1}`;
    bookDiv.appendChild(bookNumber);

    const title = document.createElement("p");
    title.classList.add("book-info", "book-title");
    title.textContent = `Title: ${book.title}`;
    bookDiv.appendChild(title);

    const author = document.createElement("p");
    author.classList.add("book-info");
    author.textContent = `Author: ${book.author}`;
    bookDiv.appendChild(author);

    const pages = document.createElement("p");
    pages.classList.add("book-info");
    pages.textContent = `Pages: ${book.pages} pages `;
    bookDiv.appendChild(pages);

    const readStatus = document.createElement("p");
    readStatus.classList.add("book-info");
    readStatus.textContent = `Read: ${book.read ? "Read" : "Not Read"}`;
    if (book.read) {
      readStatus.classList.add("book-read");
    } else {
      readStatus.classList.add("book-not-read");
    }
    bookDiv.appendChild(readStatus);

    // Create delete button
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.classList.add("delete-button");
    deleteButton.addEventListener("click", () => {
      // Show confirmation dialog
      const confirmation = confirm(
        "Are you sure you want to delete this book?"
      );
      if (confirmation) {
        deleteBook(index); // Delete the book if user confirms
      }
    });
    bookDiv.appendChild(deleteButton);

    // Append the book container to the books display
    booksDisplay.appendChild(bookDiv);
  });
}

// Function to delete a book
function deleteBook(index) {
  myLibrary.splice(index, 1); // Remove book from library array
  saveLibraryToStorage(); // Save changes to local storage
  updateBooksDisplay(); // Update the books display
}

// Load library from localStorage on page load
document.addEventListener("DOMContentLoaded", function () {
  loadLibraryFromStorage();
});

// Function to load library from localStorage
function loadLibraryFromStorage() {
  const storedLibrary = JSON.parse(localStorage.getItem("library"));
  if (storedLibrary) {
    myLibrary.push(...storedLibrary);
    updateBooksDisplay();
  }
}

// Function to save library to localStorage
function saveLibraryToStorage() {
  localStorage.setItem("library", JSON.stringify(myLibrary));
}
