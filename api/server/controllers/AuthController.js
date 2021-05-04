const database = require("../src/models/index");
const jwt = require("jsonwebtoken");
const { promisify } = require("util");
const catchAsync = require("../utils/catchAsync");
const sendEmail = require("../utils/email");
const crypto = require("crypto");
const bcrypt = require("bcrypt");
const forgotPasswordMessage = require("../utils/email");

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
  const hashedPassword = await bcrypt.hash(req.body.password, 10);

  let newUser = await database.User.create({
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    email: req.body.email,
    password: hashedPassword,
    //await bcrypt.hash(password, 10),
    role: req.body.role,
  });

  newUser = newUser.toJSON();
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
  var passwordIsValid = await bcrypt.compare(req.body.password, user.password);
  //const token = signToken(user.id);
  const token = jwt.sign(JSON.stringify(user), process.env.JWT_SECRET);

  if (!passwordIsValid) {
    // res.json({access : access})
    return next(new AppError("incorrect email or password", 401));
  }
  //if everything is okay, generate a token
  // const token = signToken(user.id);
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
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    return next(new AppError("you are not logged in", 401));
  }
  //verify token
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

  //CHECK IF USER STILL EXISTS
  const freshUser = await database.User.findByPk(decoded.id);
 
  if (!freshUser) {
    return next(new AppError("user no longer exists", 401));
  }
  // req.user = freshUser;

  next();
  
});

exports.authorizeUser = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(new AppError("you need permission", 403));
    }
    next();
  };
};

exports.forgotPassword = catchAsync(async (req, res, next) => {
  //get user based on posted Email
  const { email } = req.body;
  const user = await database.User.findOne({
    where: { email: req.body.email },
  });
  if (!user) {
    return next(new AppError("there is no user with that email address", 404));
  }
  //    //generate reset token
  const { id, first_name } = user;
  const resetToken = jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "2h",
  });
  const message = forgotPasswordMessage(first_name, resetToken);

  await sendEmail(email, message);
  return res.status(200).json({ message: "check your email" });
});
