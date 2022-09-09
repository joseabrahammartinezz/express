const catchAsync = (fn) => {
    return (req,res,next) => {
        fn(req,res,next).cach((e) => {next(e)});
    }
}

module.exports = catchAsync