const express = require("express");
const bodyParser = require("body-parser");
const config = require("dotenv");
const BookRoute = require("./server/routes/BookRoutes");
const DiscussRoute = require("./server/routes/DiscussRoute");
const CommentRoute = require("./server/routes/CommentRoutes");
const UserRoute = require("./server/routes/UserRoutes");
config.config();

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const port = process.env.PORT || 8000;

app.use("/api/v1/books", BookRoute);
app.use("/api/v1/discuss", DiscussRoute);
app.use("/api/v1/users", UserRoute);
app.use("/api/v1/comments", CommentRoute);

//root route
app.get("*", (req, res) =>
  res.status(200).send({
    message: "good morning Nigeria my people",
  })
);
app.listen(port, () => {
  console.log(`Server running on  port ${port}....... `);
});

module.exports = app;
