const {Router} = require('express');
const AuthController = require('../controllers/AuthController');
const BookController = require( "../controllers/BookController");
const cloudinary = require("../utils/cloudinary");
const upload = require("../utils/multer");

const router = Router();

router.get("/", BookController.getAllBooks);
router.post("/", AuthController.protect, BookController.createBook);
router.get("/:id", BookController.getABook);
router.patch("/:id", AuthController.protect, BookController.updateBook);
router.delete("/:id", AuthController.protect, AuthController.authorizeUser,BookController.deleteBook);

module.exports= router;
