const { User } = require("../models/index");
const { compare } = require("../helpers/bcrypt");
const { signToken } = require("../helpers/jwt");

class AuthController {
  static async register(req, res, next) {
    try {
      const { username, email, password, phoneNumber, address } = req.body;
      await User.create({
        username,
        email,
        password,
        phoneNumber,
        address,
      });

      const user = await User.findOne({
        attributes: { exclude: ["password"] },
        where: { email },
      });

      res.status(201).json({
        message: "Success creating new User",
        data: user,
      });
    } catch (error) {
      next(error);
    }
  }

  static async login(req, res, next) {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        throw { name: "UNAUTHENTICATED" };
      }

      const user = await User.findOne({
        where: {
          email,
        },
      });

      if (!user) {
        throw { name: "UNAUTHENTICATED" };
      }

      if (!compare(password, user.password)) {
        throw { name: "UNAUTHENTICATED" };
      }

      const payload = {
        id: user.id,
        email: user.email,
        role: user.role,
      };

      const access_token = signToken(payload);

      res.status(200).json({
        access_token,
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = AuthController;
