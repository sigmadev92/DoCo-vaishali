// backend/middleware/errorHandler.js
const errorHandler = (err, req, res, next) => {
  console.log(`error middleware : error handler`);
  console.log(err.stack);
  res.send({
    status: false,
    message: "Something went wrong!",
    error: err.message,
  });
};

export default errorHandler;
