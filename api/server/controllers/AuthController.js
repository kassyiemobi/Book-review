const database = require("../src/models/index");
const jwt = require("jsonwebtoken");
const { promisify } = require("util");
const catchAsync = require("../utils/catchAsync");

const { regValidation, loginValidation } = require("../validators/validate");
const AppError = require("../utils/appError");

const signToken = (id) => {
  return jwt.sign({ id: id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

exports.signup = catchAsync(async (req, res, next) => {
  const validateInput = regValidation.validate(req.body);
  if (validateInput.error)
    return res.status(400).json({
      status: "failed",
      error: validateInput.error.message,
    });

  const newUser = await database.Users.create({
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    email: req.body.email,
    password: req.body.email,
  });
  const token = signToken(newUser.id);

  res.status(201).json({
    status: "success",
    token,
    data: {
      user: newUser,
    },
  });
});

exports.signin = catchAsync(async (req, res, next) => {
  const validateInput = loginValidation.validate(req.body);
  if (validateInput.error)
    return res.status(400).json({
      status: "failed",
      error: validateInput.error.message,
    });
  // check idf email or password exists
  const { email, password } = req.body;
  if (!email || !password) {
    return next(new AppError(" please provide email or password!", 400));
  }
  //check is email or password is correct
  const user = await database.Users.findOne({ where: { email, password } });
  if (!user) {
    return next(new AppError("incorrect email or password", 400));
  }
  //if everything is okay, generate a token
  const token = signToken(user.id);
  res.status(201).json({
    status: "success",
    token,
  });
});

exports.protect = catchAsync(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization;
  }

  if (!token) {
    return next(new AppError("you are not logged in", 401));
  }
  //verify token
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
 
  //CHECK IF USER STILL EXISTS
  const freshUser = User.findById(decoded.id);
  if (!freshUser) {
    return next(new AppError("user no longer exists", 401));
  };
  req.user = freshUser;


   next();
  
});

exports.resetPassword = catchAsync(async(req, res, next) => {
  const user = await database.Users.findOne({email : req.body.email })

  if(!user){
    return next(new AppError('user not found',404))
  }
})







































// class AuthController {
//   static async signUp(req, res, next) {
//     //Joi checks User Input
//     const validateInput = regValidation.validate(req.body);
//     if (validateInput.error) return res.status(400).json({
//       status: "failed",
//       error: validateInput.error.message,
//     });
//       try {

//         //check if user exists
//       let user = await database.Users.findOne({where:{ email:req.body.email }});
//         if (user)  return res.status(400).json({
//           status: "failed",
//           error: "user exists already",
//         });

//         //create new user

//         const newUser = await database.Users.create(req.body);
//         const token = jwt.sign({ id: newUser.id }, process.env.JWT_SECRET,{
//           expiresIn: process.env.JWT_EXPIRES_IN
//         });

//         //save new user
//         await newUser.save();
//           const result = {
//           userId: newUser.id,
//           email: newUser.email,
//           token: token,
//         };
//       return res.json({
//         status:"success",
//         data:result,
//       });
//       } catch (error) {
//         console.log(error)
//         return res.status(400).json({
//           status:"failed",
//         error: "something went wrong",
//         })
//       }

//   }
//    static async signIn (req, res,next) {
//      try {
//        const validateInput = loginValidation.validate(req.body);
//        if (validateInput.error)
//          return res.status(400).json({
//            status: "failed",
//            error: validateInput.error.message,
//          });

//        const { email, password } = req.body;

//        //if email and password exists
//        if (!email || !password)
//          return res.status(400).json({
//            status: "failed",
//            error: "please provide email and password!",
//          });

//        const user = await database.Users.findOne({where: {email, password}});

//        if (user)
//          return res.json({
//            status: "success",
//            message: "succesfully logged in",
//          });
//      } catch (error) {
//        console.log(error);
//        return res.status(400).json({
//          status: "failed",
//          error: "wrong username or password",
//        });
//      }

// }
//   static async protect( req, res, next) {
//     let token ;
//     if (req.headers.authorization && req.headers.authorization){
//        token = req.headers.authorization
//     }
//     console.log(token);

//     if(!token){
//       util.setError(401,"you are not logged in");
//       return util.send(res);
//     }
//     next();

//   }

// }
