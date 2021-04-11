const Util = require('../utils/utils.js');
const userService = require('../services/UserService');
const AuthService = require('../services/authService');
const util = new Util();


const { regValidation, loginValidation } = require('../validators/validate');

class AuthController {

  static async signUp(req, res) {
    // Joi checks User Input
    // const validateInput = regValidation.validate(req.body);
    // if (validateInput.error) {
    //   throw (validateInput.error.message, 401);
    // }
    console.log("iiiiiiiiiiiiiiiiiiiiii")


    const result = await AuthService.signup(req.body);
    res.status(201).send(response("User created", result));
  }



};
module.exports = AuthController;