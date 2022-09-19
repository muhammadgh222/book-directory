import { addBook } from "./addBook";
import { addAuthor } from "./addAuthor";

const addAuthorForm = document.querySelector(".form");
const addBookForm = document.querySelector(".form_book");

if (addAuthorForm) {
  addAuthorForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = document.querySelector("#name").value;
    addAuthor(name);
  });
}

if (addBookForm) {
  addBookForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const form = new FormData();

    form.append("title", document.querySelector("#title").value);
    form.append("author", document.querySelector("#author").value);
    form.append("desc", document.querySelector("#desc").value);

    form.append("pagesNumber", document.querySelector("#pagesNumber").value);
    form.append("coverImg", document.querySelector("#coverImg").files[0]);
    form.append("publishDate", document.querySelector("#publishDate").value);
    addBook(form);

    /*const title = document.querySelector("#title").value;

    const author = document.querySelector("#author").value;
    const desc = document.querySelector("#desc").value;
    const pagesNumber = document.querySelector("#pagesNumber").value * 1;
    const coverImg = document.querySelector("#coverImg").value;
    const publishDate = document.querySelector("#publishDate").value;*/
  });
}
