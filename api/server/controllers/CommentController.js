const database = require('../src/models/index');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError')


exports.addComment = catchAsync (async(req, res, next)=> {
    const comment = await database.comments.create(req.body)
    res.status(201).json({
        status: 'success',
        data:{
             comment
        },
    })
}) ;
exports.getAComment = catchAsync(async(req, res, next) =>{
    const comment = await database.comments.findByPk({
      where: { id: Number(id) },
    });
    if (!comment) {
      return next(new AppError("not found", 401));
    }
    res.status(200).json({
      status: "success",
      data: {
        comment,
      },
    });
});

exports.getAllComments = catchAsync(async (req, res, next) => {
  const comments = await database.comments.findAll();

  res.status(200).json({
    status: "success",
    results: comments.length,
    data: {
      comments,
    },

  });
});
