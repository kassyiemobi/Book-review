const Router = require("express");
const CommentController = require("../controllers/CommentController");
const AuthController = require("../controllers/AuthController");

const router = Router();

 
router.get("/", CommentController.getAllComments);
router.post("/", AuthController.protect, CommentController.addComment);
router.get("/:id", CommentController.getAComment);
router.put("/:id",AuthController.protect, CommentController.updateComment);
router.delete("/:id",AuthController.protect, AuthController.authorizeUser, CommentController.deleteComment);

module.exports = router;
