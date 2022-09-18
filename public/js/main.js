import {addBook} from "./addBook";
import {addAuthor} from "./addAuthor";

const addAuthorForm = document.querySelector(".form");
const addBookForm = document.querySelector(".form_book");

if (addAuthorForm) {
  addAuthorForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = document.querySelector("#name").value;
    console.log(name);
    addAuthor(name);
  });
}

if (addBookForm) {
  addBookForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const title = document.querySelector("#title").value;

    const author = document.querySelector("#author").value;
    const desc = document.querySelector("#desc").value;
    const pagesNumber = document.querySelector("#pagesNumber").value;
    const coverImg = document.querySelector("#coverImg").value;
    const publishDate = document.querySelector("#publishDate").value;
    console.log("1");
    addBook(title, author, desc, pagesNumber, coverImg, publishDate);
    console.log("2");
  });
}
