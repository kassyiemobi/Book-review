const {Router} = require('express')
const BookController = require( "../controllers/BookController");

const router = Router();

router.get("/", BookController.getAllBooks);
router.post("/", BookController.addBook);
router.get("/:id", BookController.getABook);
router.put("/:id", BookController.updatedBook);
router.delete("/:id", BookController.deleteBook);

module.exports= router
;
