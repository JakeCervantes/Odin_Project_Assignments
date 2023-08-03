let myLibrary = [];

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

function addBookToLibrary(book) {
  myLibrary.push(book);
}


const addBtn= document.querySelector('.add-button');
let myForm= document.querySelector('.form-container');
addBtn.addEventListener('click', ()=>{
    toggleForm();
});

function toggleForm() {
  if (myForm.style.display === 'none' || myForm.style.display === '') {
    myForm.style.display = 'flex';
  } else {
    myForm.style.display = 'none';
  }
}




function renderLibrary() {
    const libraryContainer = document.querySelector('.row2');
    libraryContainer.innerHTML = ''; // Clear existing content
  
    myLibrary.forEach((book, index) => {
      let bookCard = document.createElement('div');
      bookCard.classList.add('book-card');
      bookCard.dataset.index = index;

      bookCard.innerHTML = `
      <div>Title: ${book.title}</div>
      <div>Author: ${book.author}</div>
      <div>Pages: ${book.pages}</div>
      <div>Read: ${book.read ? 'Yes' : 'No'}</div>
      <button class="delete-button">Delete</button>
    `;

      const deleteBtn= bookCard.querySelector('.delete-button');
      deleteBtn.addEventListener('click',()=> {
      deleteBook(index);
      renderLibrary();
      });

      libraryContainer.appendChild(bookCard);
    });
  }


  let form = document.getElementById('add-form');

form.addEventListener('submit', (event) => {
  event.preventDefault();

  const formData = new FormData(form);
  const title = formData.get('title');
  const author = formData.get('author');
  const pages = formData.get('pages');
  const read = formData.get('read') === 'on';

  const newBook = new Book(title, author, pages, read);
  addBookToLibrary(newBook);

  // Close the form and update the library display
  renderLibrary();

  //Handles clearing previous submissions form user
  const prevTitle =document.getElementById('title');
  const prevAuthor =document.getElementById('author');
  const prevPages =document.getElementById('pages');
  const prevRead =document.getElementById('read');
  prevAuthor.value= '';
  prevPages.value= '';
  prevTitle.value= '';
  prevRead.checked= false;


  toggleForm();

});

function deleteBook(index) {
  if (index >= 0 && index < myLibrary.length) {
    myLibrary.splice(index, 1); // Remove the book from the array
  }
}