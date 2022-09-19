import axios from "axios";

const addBook = async (form) => {
  try {
    let auth;
    let author = form.get("author");
    console.log(author);

    auth = await axios({
      method: "GET",
      url: `http://localhost:3000/api/v1/authors?name=${author}`,
    });
    if (auth.data.authors.length === 0) {
      auth = await axios({
        method: "POST",
        url: "http://localhost:3000/api/v1/authors",
        data: {
          name: author,
        },
      });

      alert("Author has been added");
    }
    const authorId = auth.data.authors[0]._id;
    console.log(authorId);

    const res = await axios({
      method: "POST",
      url: "http://localhost:3000/api/v1/books",
      data: {
        authorId,
        form,
      },
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    console.log(author);
    if (res.data.status === "success") {
      alert("Book added successfully");
    }
  } catch (error) {
    console.log(error);
    alert(error.response.data.nessage);
  }
};

export { addBook };
