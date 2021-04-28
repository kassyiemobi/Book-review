const Router = require("express");
const UserController = require("../controllers/UserController");
const AuthController = require('../controllers/authController')

const router = Router();

router.post("/signup", AuthController.signup);
router.post("/signin", AuthController.signin);
router.post("/forgotpassword", AuthController.signin);
router.post("/resetpassword", AuthController.signin);


// router.get("/", UserController.getAllUsers);
// router.post("/", UserController.addUser);
// router.get("/:id", UserController.getAUser);
// router.put("/:id", UserController.updatedUser);
// router.delete("/:id", UserController.deleteUser);

module.exports = router;
