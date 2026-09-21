const myLibrary = [];

function Book(title, author, pages, read) {
  this.id = crypto.randomUUID();
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

Book.prototype.toggleRead = function () {
  this.read = !this.read;
};

// DOM Elements
const libraryGrid = document.getElementById("library-grid");
const formModal = document.getElementById("form-modal");
const openModalBtn = document.getElementById("open-modal-btn");
const closeModalBtn = document.getElementById("close-modal-btn");
const bookForm = document.getElementById("book-form");

// Modal Controls
openModalBtn.addEventListener(
  "click",
  () => (formModal.style.display = "block"),
);

closeModalBtn.addEventListener(
  "click",
  () => (formModal.style.display = "none"),
);

window.addEventListener("click", (e) => {
  if (e.target === formModal) {
    formModal.style.display = "none";
  }
});

// Form Submission
bookForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const title = document.getElementById("title").value;
  const author = document.getElementById("author").value;
  const pages = document.getElementById("pages").value;
  const isRead = document.getElementById("read-status-input").checked;

  // Pass the checkbox value to the Book constructor
  const newBook = new Book(title, author, pages, isRead);
  myLibrary.push(newBook);

  renderLibrary();
  bookForm.reset();
  formModal.style.display = "none";
});

// Render Library
function renderLibrary() {
  libraryGrid.innerHTML = "";

  myLibrary.forEach((book) => {
    const bookCard = document.createElement("div");
    bookCard.classList.add("book-card");
    bookCard.setAttribute("data-id", book.id);

    if (book.read) {
      bookCard.classList.add("read-card");
    }

    bookCard.innerHTML = `
        <h3>${book.title}</h3>
        <p><strong>Author:</strong> ${book.author}</p>
        <p><strong>Pages:</strong> ${book.pages}</p>
        <small class="uid>ID: ${book.id}</small>

        <div class="card-actions">
            <!-- Card-Level Checkbox Display -->
            <label class="display-checkbox-label">
                <input type="checkbox"
                    ${book.read ? "checked" : ""}
                    onchange="toggleReadStatus('${book.id}')">
                Read Status
            </label>

            <!-- Remove Button -->
            <button class="remove-btn" onclick="removeBook('${book.id}')">Remove</button>
        </div>
        `;

    libraryGrid.appendChild(bookCard);
  });
}

// Core Action Functions
window.toggleReadStatus = function (id) {
  const book = myLibrary.find((book) => book.id === id);
  if (book) {
    book.toggleRead();
    renderLibrary();
  }
};

window.removeBook = function (id) {
  const bookIndex = myLibrary.findIndex((book) => book.id === id);
  if (bookIndex !== -1) {
    myLibrary.splice(bookIndex, 1);
    renderLibrary();
  }
};
