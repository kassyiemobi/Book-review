const database = require("../src/models/index");
const jwt = require("jsonwebtoken");
const { promisify } = require("util");
const catchAsync = require("../utils/catchAsync");
const sendEmail = require('../utils/email')
const crypto = require('crypto')
const Sequelize = require("sequelize");
const Op = Sequelize.Op;

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

  let newUser = await database.User.create({
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    email: req.body.email,
    password: req.body.password,
    role: req.body.role
  });

  newUser = newUser.toJSON()
  delete newUser.password;
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
  // check if email or password exists
  const { email, password } = req.body;
  if (!email || !password) {
    return next(new AppError(" please provide email or password!", 400));
  }
  //check is email or password is correct
  const user = await database.User.findOne({ where: { email } });
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
 exports.authorizeUser  = (...roles) =>{
   return (req, res, next) =>{
     if(!roles.includes(req.user.role)){
        return next(new AppError("you need permission", 403));
     }
next();
   };
 };


//  exports.forgotPassword = catchAsync (async (req, res, next) => {
//    //get user based on posted Email
//    const user = await database.User.findOne({ where : {email: req.body.email } });
//    if (!user) {
//      return next(new AppError("there is no user with that email address", 404));
//    }
//    //generate reset token
//    const token = jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "2h" });

//    //send to user email
//    const resetURL = `${req.protocol}://${req.get('host')}/api/v1/users/resetpassword/${token}`
//    const message =`forgot your password? please click on this link ${resetURL} .
//    if this message was not initiated by you, please ignore this message`;
//    try{
//    await sendEmail({
//      email: user.email,
//      subject: 'password reset token',
//      message: message
//    });
//    res.status(200).json({
//      status:'success',
//      message:'token sent to email'
//    });
//   }catch(err){
//     user.passwordResetToken = undefined;
//     user.passwordResetExpires = undefined;

//     return next(new AppError('error sending email, try again later', 500))

//   }
//  });

 exports.forgotPassword= catchAsync( async(req, res, next) => {
  //ensure that you have a user with this email
  const email = await database.User.findOne({where: { email: req.body.email }});
  if (!email) {
  /**
   * we don't want to tell attackers that an
   * email doesn't exist, because that will let
   * them use this form to find ones that do
   * exist.
   **/
    return res.json({status: 'ok'});
  }
  /**
   * Expire any tokens that were previously
   * set for this user. That prevents old tokens
   * from being used.
   **/
  await database.ResetToken.update({
      used: 1
    },
    {
      where: {
        email: req.body.email
      }
  });
 
  //Create a random reset token
  var fpSalt = crypto.randomBytes(64).toString('base64');
 
  //token expires after one hour
  const expireDate = new Date();
  expireDate.setDate(expireDate.getDate() + 1/24);
 

  //insert token data into DB
 const token =  await database.ResetToken.create({
    email: req.body.email,
    expiration: expireDate,
    token: fpSalt,
    used: 0
  });
 
  //create email
  const message = {
    from: process.env.EMAIL_USERNAME,
    to: req.body.email,
    subject: "password Reset token",
    text:
      "To reset your password, please click the link below.\n\nhttps://" +
      process.env.DOMAIN +
      "/user/reset-password?token=" +
      encodeURIComponent(token) +
      "&email=" +
      req.body.email,
  };
 
  //send email
  await sendEmail(message, function (err, info) {
     if(err) { console.log(err)}
     else { console.log(info); }
  });
 
  return res.json({status: 'ok'});
});

exports.resetPassword = catchAsync(async(req, res, next) => {
  /**
   * This code clears all expired tokens. You
   * should move this to a cronjob if you have a
   * big site. We just include this in here as a
   * demonstration.
   **/
  await ResetToken.destroy({
    where: {
      expiration: { [Op.lt]: Sequelize.fn("CURDATE") },
    },
  });

  //find the token
  const record = await ResetToken.findOne({
    where: {
      email: req.query.email,
      expiration: { [Op.gt]: Sequelize.fn("CURDATE") },
      token: req.query.token,
      used: 0,
    },
  });

  if (!record) {
    return next(new AppError( "Token has expired. Please try password reset again.",500))
    };
 });
 exports.resetpassword = catchAsync(async(req, res, next) => {
   if (req.body.password1 !== req.body.password2) {
    return next(new AppError("Passwords do not match. Please try again.",500));
  }
 
  /**
  * Ensure password is valid (isValidPassword
  * function checks if password is >= 8 chars, alphanumeric,
  * has special chars, etc)
  **/
  if (!isValidPassword(req.body.password1)) {
    return res.json({status: 'error', message: 'Password does not meet minimum requirements. Please try again.'});
  }
 
  var record = await ResetToken.findOne({
    where: {
      email: req.body.email,
      expiration: { [Op.gt]: Sequelize.fn('CURDATE')},
      token: req.body.token,
      used: 0
    }
  });
 
  if (record == null) {
    return res.json({status: 'error', message: 'Token not found. Please try the reset password process again.'});
  }
 
  const  update= await ResetToken.update({
      used: 1
    },
    {
      where: {
        email: req.body.email
      }
  });
 
  const newSalt = crypto.randomBytes(64).toString('hex');
  const newPassword = crypto.pbkdf2Sync(req.body.password1, newSalt, 10000, 64, 'sha512').toString('base64');
 
  await User.update({
    password: newPassword,
    salt: newSalt
  },
  {
    where: {
      email: req.body.email
    }
  });
 
  return res.json({status: 'ok', message: 'Password reset. Please login with your new password.'});
});

  








































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
