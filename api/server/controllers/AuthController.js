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
    const util = await AuthService.signup(req.body);
    return util.send(res);
  }

   static async signIn (req, res) {
     try {
        const validateInput = loginValidation.validate(req.body);
        if (validateInput.error) {
          util.setError(400, validateInput.error.message);
          return util.send(res);
        }
        const util = await AuthService.signIn(req.body);
        return util.send(res);
       
     } catch (error) {
       util.setError(400, " wrong username or password");
       console.log("🚀 ~ file: authController.js ~ line 35 ~ AuthController ~ signIn ~ error", error)
       return util.send(res);
      
     }
    
      

}
  static async protect( req, res, next) {
    let token ;
    if (req.headers.authorization && req.headers.authorization){
       token = req.headers.authorization
    }
    console.log(token);

    if(!token){
      util.setError(401,"you are not logged in");
      return util.send(res);
    }
    next();
     
  }

}
module.exports = AuthController;
