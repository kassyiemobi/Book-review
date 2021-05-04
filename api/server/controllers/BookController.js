const database = require("../src/models/index");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");

exports.createBook = catchAsync  (async (req, res, next) => {
  const { title, author, description, discussion, ratings } = req.body;
  console.log(
    "llllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllll"
  );

  if (!title || !author || !description || !discussion || !ratings) {
    new AppError("Please provide complete details", 400);
  }
  console.log("-------------------------------------------------------");

  //check if title already exists
  const BookExist = await database.Books.findOne({ where: { title } });
  if (!BookExist) {
    return new AppError(
      "title already exists,search and join the conversation",
      400
    );
  }
  //create new book
  const Book = await database.Books.create(req.body);
  res.status(201).json({
    status: "success",
    data: {
      book: Book,
    },
  });
});

exports.getAllBooks = catchAsync(async (req, res, next) => {
  const books = await database.Books.findAll();

  res.status(200).json({
    status: "success",
    results: books.length,
    data: {
      books,
    },
  });
});

exports.getABook = catchAsync(async (req, res, next) => {
  const book = await database.Books.findByPk({
    where: { id: Number(id) },
  });
  if (!book) {
    return next(new AppError("book not found", 401));
  }
  res.status(200).json({
    status: "success",
    data: {
      book,
    },
  });
});

exports.updateBook = catchAsync(async (req, res, next) => {
  const bookToUpdate = await database.Books.findOne({
    where: { id: Number(id) },
  });

  if (bookToUpdate) {
    await database.Books.update(updateBook, { where: { id: Number(id) } });

    return updateBook;
  }
});

exports.deleteBook = catchAsync(async (req, res, next) => {
  const bookToDelete = await database.Books.findOne({
    where: { id: Number(id) },
  });

  if (bookToDelete) {
    const deletedBook = await database.Books.destroy({
      where: { id: Number(id) },
    });
    return deletedBook;
  }
  return null;
});
