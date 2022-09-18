const express = require("express");
const path = require("path");
const expressLayouts = require("express-ejs-layouts");
const authorRoutes = require("./routes/authorRoutes");
const bookRoutes = require("./routes/bookRoutes");
const viewsRoutes = require("./routes/viewsRoutes");
const app = express();

app.use(express.json()); // to read json body
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.set("layout", "layouts/layout");
app.use(expressLayouts);
app.use(express.static(path.join(__dirname, "public")));

app.use("/", viewsRoutes);
app.use("/api/v1/authors", authorRoutes);
app.use("/api/v1/books", bookRoutes);
app.get("/", (req, res) => {
  res.send({
    message: "Hello",
  });
});

module.exports = app;
