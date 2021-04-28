const database = require('../src/models/index');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');


exports.createBook = async (req, res, next) =>{
   const { title, author, description, discussion, ratings } = req.body;

   if (!title || !author || !description || !discussion || !ratings) {
     new AppError('Please provide complete details', 400)
   }

   //check if title already exists
   const Book = await database.Books.findOne({ where: { title } });
   if (Book)
   return new AppError(
       "title already exists,search and join the conversation",400
     );

   //create new book
   const createdBook = await database.Books.create(req.body);
   res.status(201).json({
     status: "success",
     data: {
       book: createdBook,
     },
   });




} 

exports.getAllBooks = catchAsync (async(req, res, next) =>{

  await database.Books.find()
});

exports.getABook = catchAsync (async(req, res, next) =>{
  await database.Books.findOne({
    where: { id: Number(id) },
  });
});

exports.updateBook = catchAsync (async (req, res, next) =>{
  const bookToUpdate = await database.Books.findOne({
    where: { id: Number(id) },
  });

  if (bookToUpdate) {
    await database.Books.update(updateBook, { where: { id: Number(id) } });

    return updateBook;
  }
});

exports.deleteBook =catchAsync (async( req, res, next) => {
      const bookToDelete = await database.Books.findOne({ where: { id: Number(id) } });

      if (bookToDelete) {
        const deletedBook = await database.Books.destroy({
          where: { id: Number(id) }
        });
        return deletedBook;
      }
      return null;
});