const Util = require('../utils/utils.js');
const userService = require('../services/UserService');
const AuthService = require('../services/authService');
const util = new Util();

const { regValidation, loginValidation } = require('../validators/validate');

class AuthController {
  static async signUp(req, res) {
    console.log('iiiiiiiiiiiiiiiiiiiiii');
    try {
      // Joi checks User Input
      const validateInput = regValidation.validate(req.body);
      if (validateInput.error) {
        // return util.setError (validateInput.error.message, 401);
        util.setError(400, validateInput.error.message);
        return util.send(res);
      }

      const result = await AuthService.signup(req.body);
      res.status(201).send(response('User created', result));
    } catch (error) {
      return util.setError(409, 'Something went wrong');
    }
  }
}
module.exports = AuthController;
