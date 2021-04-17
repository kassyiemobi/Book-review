
const database = require("../src/models/index.js");
const Util = require ("./../utils/utils")

const util = new Util();

class BookService {
  static async getAllBooks() {
    try {
      return await database.Book.findAll();
    } catch (error) {
      throw error;
    }
  }

  static async addBook(data) {
    try {
       const { title, author, description, discussion, ratings } = data;

       if (!title || !author || !description || !discussion || !ratings) {
        return util.setError(400, "Please provide complete details");
       }

      //check if title already exists
      const Book = await database.Books.findOne({where: {title} })
      if(Book) return util.setError(400,'title already exists,search and join the conversation');
     

      //create new book
      const createdBook = await database.Books.create(data);

      return util.setSuccess(201, 'Book Added!', createdBook);
    } catch (error) {
      return util.setError(400, error.message );
    }
  }

  static async updateBook(id, updateBook) {
    try {
      const bookToUpdate = await database.Book.findOne({
        where: { id: Number(id) },
      });

      if (bookToUpdate) {
        await database.Book.update(updateBook, { where: { id: Number(id) } });

        return updateBook;
      }
      return null;
    } catch (error) {
      throw error;
    }
  }

  static async getABook(id) {
    try {
      const theBook = await database.Book.findOne({
        where: { id: Number(id) },
      });

     return util.setSuccess(201, "Book Added!", theBook);
    } catch (error) {
      return util.setError(400, error.message);
    }
  }

  static async deleteBook(id) {
    try {
      const bookToDelete = await database.Book.findOne({
        where: { id: Number(id) },
      });

      if (bookToDelete) {
        const deletedBook = await database.Book.destroy({
          where: { id: Number(id) },
        });
        return deletedBook;
      }
      return null;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = BookService;
