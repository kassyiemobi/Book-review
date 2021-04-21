const authController = require('../controllers/AuthController');
const database =  require ("../src/models/index.js");
const jwt = require ('jsonwebtoken');
const bcrypt = require('bcrypt');
const Util = require('./../utils/utils');
const util = new Util();
const catchAsync = require('./../utils/catchAsync')





class AuthService {

  static async signup(data) {
  console.log(database.User)
      try {
        
        //check if user exists
      let user = await database.Users.findOne({where:{ email: data.email }});
        if (user) return util.setError(400, "User already exists");

        //create new user

        const newUser = await database.Users.create(data);
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
        return util.setSuccess(201, "User created", result);
      } catch (error) {
        console.log(error)
        return util.setError(400, "Something went wrong");
      }

  }
 
  static async signIn(data){
    try{
      const { email, password } = data;
      
      const user = await database.Users.findOne({where:{email, password }})
      console.log(user);
      return util.setSuccess(200, 'signIn successful')


      




    }catch(error ){
    console.log("🚀 ~ file: authService.js ~ line 60 ~ AuthService ~ signIn ~ error", error)
      
      return util.setError(400, 'something went wrong');

    }
  }

};



 module.exports =AuthService;

