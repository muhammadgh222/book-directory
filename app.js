const express = require("express");
const path = require("path");
const authorRoutes = require("./routes/authorRoutes");
const bookRoutes = require("./routes/bookRoutes");
const app = express();

app.use(express.json()); // to read json body
app.use(express.static(path.join(__dirname, "public")));

app.use("/api/v1/authors", authorRoutes);
app.use("/api/v1/books", bookRoutes);
app.get("/", (req, res) => {
  res.send({
    message: "Hello",
  });
});

module.exports = app;
