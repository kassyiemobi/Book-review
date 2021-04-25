const Util = require('../utils/utils.js');
const userService = require('../services/UserService');
const AuthService = require('../services/authService');
const database = require('../src/models/index')
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const util = new Util();


const { regValidation, loginValidation } = require("../validators/validate");



class AuthController {
  static async signUp(req, res, next) {
    //Joi checks User Input
    const validateInput = regValidation.validate(req.body);
    if (validateInput.error) return res.status(400).json({
      status: "failed",
      error: validateInput.error.message,
    });
      try {
        
        //check if user exists
      let user = await database.Users.findOne({where:{ email:req.body.email }});
        if (user)  return res.status(400).json({
          status: "failed",
          error: "user exists already",
        });

        //create new user

        const newUser = await database.Users.create(req.body);
        const token = jwt.sign({ id: newUser.id }, process.env.JWT_SECRET,{
          expiresIn: process.env.JWT_EXPIRES_IN
        });

        //save new user
        await newUser.save();
          const result = {
          userId: newUser.id,
          email: newUser.email,
          token: token,
        };
      return res.json({
        status:"success",
        data:result,
      });
      } catch (error) {
        console.log(error)
        return res.status(400).json({
          status:"failed",
        error: "something went wrong",
        })
      }


  }
   static async signIn (req, res,next) {
     try {
       const validateInput = loginValidation.validate(req.body);
       if (validateInput.error)
         return res.status(400).json({
           status: "failed",
           error: validateInput.error.message,
         });

       const { email, password } = req.body;

       //if email and password exists
       if (!email || !password)
         return res.status(400).json({
           status: "failed",
           error: "please provide email and password!",
         });

       const user = await database.Users.findOne({where: {email, password}});
      

       if (user)
         return res.json({
           status: "success",
           message: "succesfully logged in",
         });
     } catch (error) {
       console.log(error);
       return res.status(400).json({
         status: "failed",
         error: "wrong username or password",
       });
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
