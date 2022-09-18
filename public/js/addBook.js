import axios from "axios";

const addAuthor = async (
  title,
  author,
  description,
  pagesNumber,
  coverImg,
  publishDate
) => {
  try {
    const res = await axios({
      method: "POST",
      url: "http://localhost:3000/api/v1/books",
      data: {
        title,
        author,
        description,
        pagesNumber,
        coverImg,
        publishDate,
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

export {addAuthor};
