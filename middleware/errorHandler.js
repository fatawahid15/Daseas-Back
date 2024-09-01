// middlewares/errorHandler.js

function errorHandler(err, req, res, next) {
  let status = 500;
  let message = "Internal Server Error";

  if (err.name == "UNAUTHENTICATED") {
    status = 401;
    message = "Invalid username/password";
  }

  if (err.name == "JsonWebTokenError") {
    status = 401;
    message = "Invalid username/password";
  }

  if (err.name == "UNAUTHORIZED") {
    status = 403;
    message = `You don't have the permission`;
  }

  if (err.name == "NotFound") {
    status = 404;
    message = `Data is not Found!`;
  }

  if (err.name == "SequelizeUniqueConstraintError") {
    status = 400;
    message = err.errors[0].message;
  }

  if (err.name == "SequelizeValidationError") {
    status = 400;
    message = err.errors[0].message;
  }

  if (err.name == "SequelizeDatabaseError") {
    status = 400;
    message = "Invalid Input";
  }

  if (err.name == "SequelizeForeignKeyConstraintError") {
    status = 400;
    message = "Invalid Input";
  }

  if (err.name == "TokenExpiredError") {
    status = 401;
    message = "Token already expired please login again";
  }

  res.status(status).json({ message });
  console.log(err);
}

module.exports = errorHandler;
