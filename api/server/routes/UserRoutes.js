const Router = require("express");
const UserController = require("../controllers/UserController");
const AuthController = require('../controllers/AuthController')

const router = Router();


router.get("/", UserController.getAllUsers);
router.post("/", UserController.addUser);
router.post("/signup", AuthController.signUp);
router.post("/signIn", AuthController.signIn);
router.get("/:id", UserController.getAUser);
router.put("/:id", UserController.updatedUser);
router.delete("/:id", UserController.deleteUser);

module.exports = router;
