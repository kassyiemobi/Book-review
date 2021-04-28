const express = require("express");
const bodyParser = require("body-parser");
const config = require("dotenv");
const BookRoute = require("./server/routes/BookRoutes");
const CommentRoute = require("./server/routes/CommentRoutes");
const UserRoute = require("./server/routes/UserRoutes");
const cors = require('cors')
const AppError = require('./server/utils/appError');
const globalErrorHandler = require('./server/controllers/errorController');
config.config();



const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  console.log(req.header)
   next()
 })

app.use(cors());

const port = process.env.PORT || 8000;

app.use("/api/v1/books", BookRoute);
app.use("/api/v1/users", UserRoute);
app.use("/api/v1/comments", CommentRoute);

//root route
app.get("*", (req, res) =>{
  res.status(200).send({
    message: "good morning Nigeria my people",
  })
});
app.all('*', (req, res, next) => {
  next (new AppError(`cannot find ${req.originalUrl} on this server!`, 400));
  

  next(err);
});


//error handling
app.use(globalErrorHandler)


app.listen(port, () => {
  console.log(`Server running on  port ${port}....... `);
});

module.exports = app;
