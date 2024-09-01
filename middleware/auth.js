const { convertToken } = require("../helpers/jwt");
const { User , Product } = require("../models/index");

const authenticatebyToken = async (req, res, next) => {
  try {
    const { authorization } = req.headers;

    if (!authorization) {
      throw { name: "UNAUTHORIZED" };
    }

    const token = authorization.split(" ")[1];

    if (!token) {
      throw { name: "UNAUTHENTICATED" };
    }

    const payload = convertToken(token);

    const foundUser = await User.findByPk(payload.id);

    if (!foundUser) {
      throw { name: "UNAUTHENTICATED" };
    }

    req.addOnData = {
      id: foundUser.id,
      role: foundUser.role,
    };
    next();
  } catch (error) {
    next(error);
  }
};

const authorizationByRole = async (req, res, next) => {
  try {
    if (req.addOnData.role !== 'Admin') {
      const {id} = req.params
      let product = await Product.findByPk(id)
      
      let user = await User.findByPk(req.addOnData.id)
      
      if(!id || product.authorId !== user.id){
      throw { name: "UNAUTHORIZED" };
      }

      if (!product) {
        throw { name: "NotFound", id };
      }
    }
  
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = { authenticatebyToken, authorizationByRole };
