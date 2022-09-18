import axios from "axios";

const addAuthor = async (name) => {
  try {
    const res = await axios({
      method: "POST",
      url: "http://localhost:3000/api/v1/authors",
      data: {
        name,
      },
    });
    console.log(res.data.status);
    if (res.data.status === "success") {
      alert("Author added successfully");
    }
  } catch (error) {
    console.log(error);
    alert(error.response.data.nessage);
  }
};

export { addAuthor };
