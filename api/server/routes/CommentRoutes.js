const Router = require("express");
const CommentController = require("../controllers/CommentController");

const router = Router();

router.get("bookId/comments", CommentController.getAllComments);
router.post("bookId/comments", CommentController.addComment);
router.get("bookId/comments/:id", CommentController.getAComment);
router.put("bookId/comments/:id", CommentController.updatedComment);
router.delete("bookId/comments/:id", CommentController.deleteComment);

module.exports = router;
