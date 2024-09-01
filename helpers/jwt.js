const jwt = require("jsonwebtoken");
const secretKey = process.env.SECRET_KEY || 'fatates';

const signToken = (payload) => {
  return jwt.sign(payload, secretKey, {
    expiresIn: "1h",
  });
};

const convertToken = (token) => {
  return jwt.verify(token, secretKey);
};

module.exports = { signToken, convertToken };
