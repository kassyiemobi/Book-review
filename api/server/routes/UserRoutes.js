const Router = require("express");
//const UserController = require("../controllers/Usercontroller");
const AuthController = require('../controllers/AuthController')

const router = Router();

router.post("/signup", AuthController.signup);
router.post("/signin", AuthController.signin);
router.patch("/forgotpassword", AuthController.forgotPassword);
router.patch("/resetpassword", AuthController.signin);


// router.get("/", UserController.getAllUsers);
// router.post("/", UserController.addUser);
// router.get("/:id", UserController.getAUser);
// router.put("/:id", UserController.updatedUser);
// router.delete("/:id", UserController.deleteUser);

module.exports = router;
