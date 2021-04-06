const Router = require("express");
const DiscussController = require("../controllers/DiscussController");

const router = Router();

router.get("/", DiscussController.getAllDiscusss);
router.post("/", DiscussController.addDiscuss);
router.get("/:id", DiscussController.getADiscuss);
router.put("/:id", DiscussController.updatedDiscuss);
router.delete("/:id", DiscussController.deleteDiscuss);

module.exports =  router;
