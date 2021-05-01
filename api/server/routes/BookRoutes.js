const {Router} = require('express');
const AuthController = require('../controllers/authController');
const BookController = require( "../controllers/BookController");
const cloudinary = require("../utils/cloudinary");
const upload = require("../utils/multer");

const router = Router();

// router.get("/", BookController.getAllBooks);
 router.post("/", AuthController.protect, BookController.createBook);
// router.get("/:id", BookController.getABook);
// router.put("/:id", AuthController.protect, BookController.updatedBook);
// router.delete("/:id", BookController.deleteBook);

module.exports= router
;
