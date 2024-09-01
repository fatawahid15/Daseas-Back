const { User, Product, Category } = require("../models/index");
const imagekit = require("../helpers/imagekit");

class ProductController {
  static async getAllProducts(req, res) {
    try {
      let product = await Product.findAll({
        include: {
          model: User,
          attributes: {
            exclude: ["password"],
          },
        },
        order: ['id']
      });

      res.status(200).json(product);
      console.log(product);
    } catch (error) {
      next(error);
    }
  }

  static async addProducts(req, res, next) {
    try {
      const { name, description, price, stock, imgUrl, categoryId } = req.body;

      const product = await Product.create({
        name,
        description,
        price,
        stock,
        imgUrl,
        categoryId,
        authorId: req.addOnData.id,
      });

      res.status(201).json({
        message: "Success creating new Product!",
        product,
      });
    } catch (error) {
      next(error);
    }
  }

  static async getProductById(req, res, next) {
    try {
      const { id } = req.params;
      let product = await Product.findOne({
        where: { id },
      });

      if (!product) {
        throw { name: "NotFound", id };
      }
      res.status(200).json(product);
    } catch (error) {
      next(error);
    }
  }

  static async editProduct(req, res, next) {
    try {
      const { id } = req.params;
      const { name, description, price, stock, imgUrl, categoryId } = req.body;
      const product = await Product.findOne({
        where: { id },
      });

      if (!product) {
        throw { name: "NotFound", id };
      }

      await Product.update(
        { name, description, price, stock, imgUrl, categoryId },
        {
          where: {
            id,
          },
        }
      );

      let updatedProduct = await Product.findOne({
        where: { id },
      });

      res.status(200).json(updatedProduct);
    } catch (error) {
      next(error);
    }
  }

  static async deleteProduct(req, res, next) {
    try {
      const { id } = req.params;

      let product = await Product.findByPk(id);

      if (!product) {
        throw { name: "NotFound", id };
      }

      await Product.destroy({
        where: { id },
      });

      res.status(200).json({
        message: "success delete",
        data: product,
      });
    } catch (error) {
      next(error);
    }
  }

  static async imgUploadHandler(req, res, next) {
    try {
      const {id} = req.params
      const imageInBase64 = req.file.buffer.toString('base64')
      const result = await imagekit.upload({
        file: imageInBase64,
        fileName: req.file.originalname,
        tags: ['Product']
      })

      const product = await Product.findOne({
        where: { id },
      });

      if (!product) {
        throw { name: "NotFound", id };
      }

      await Product.update(
        {imgUrl: result.url},
        {
          where: {id}
        }
      )

      res.status(200).json({
        message: `Image ${result.name} success to update`
      })
    } catch (error) {
      next(error);
    }
  }
}

module.exports = ProductController;
