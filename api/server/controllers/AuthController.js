const Util = require('../utils/utils.js');
const userService = require('../services/UserService');
const AuthService = require('../services/authService');
const util = new Util();


const { regValidation, loginValidation } = require("../validators/validate");



class AuthController {
  static async signUp(req, res) {
    //Joi checks User Input
    const validateInput = regValidation.validate(req.body);
    if (validateInput.error) {
      util.setError(400, validateInput.error.message);
      return util.send(res);
    }
    const util = await AuthService.signUp(req.body);
    return util.send(res);
  }

   static async signIn (req, res) {
    
       const validateInput = loginValidation.validate(req.body);
      if(validateInput.error){
        util.setError(400, validateInput.error.message);
      return util.send(res)
      }
       const util = await AuthService.signIn(req.body);
       return util.send(res)

}

}
module.exports = AuthController;
