const Router = require("express");
const CommentController = require("../controllers/CommentController");

const router = Router();

router.get("/", CommentController.getAllComments);
router.post("/", CommentController.addComment);
router.get("/:id", CommentController.getAComment);
router.put("/:id", CommentController.updatedComment);
router.delete("/:id", CommentController.deleteComment);

module.exports = router;
