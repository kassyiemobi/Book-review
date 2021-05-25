const {Router} = require('express');
const AuthController = require('../controllers/AuthController');
const BookController = require( "../controllers/BookController");
const CommentController = require("../controllers/CommentController")
const cloudinary = require("../utils/cloudinary");
const upload = require("../utils/multer");

const router = Router();

router.get("/", BookController.getAllBooks);
router.post("/", AuthController.protect, BookController.createBook);
router.get("/:bookId", BookController.getABook);
router.patch("/:bookId", AuthController.protect, BookController.updateBook);
router.delete("/:bookId", AuthController.protect, AuthController.authorizeUser,BookController.deleteBook);

router.post("/:bookId/comments", AuthController.protect, CommentController.addComment);
router.get("/:bookId/comments", CommentController.getAllComments);
router.get("/:bookId/comments/:id", CommentController.getAComment);
router.put("/:bookId/comments/:id", AuthController.protect, CommentController.updateComment);
router.delete(
  "/:id",
  AuthController.protect,
  AuthController.authorizeUser,
  CommentController.deleteComment
);

module.exports= router;
