const { User, Product, Category } = require("../models/index");

class CategoryController {
  static async addCategories(req, res , next) {
    try {
      const { name } = req.body;

      let category = await Category.create({
        name,
      });

      res.status(201).json({
        message: "Success creating new Category",
        data: category,
      });
    } catch (error) {
      next(error)
    }
  }

  static async getAllCategories(req, res , next) {
    try {
      let categories = await Category.findAll();

      res.status(200).json({
        message: "Success get all Category",
        data: categories,
      });
    } catch (error) {
      next(error)
    }
  }

  static async editCategories(req, res , next) {
    try {
      const { id } = req.params;
      const { name } = req.body;
      let category = await Category.findByPk(id);

      if (!category) {
        throw { name: "NotFound", id };
      }

      await Category.update(
        { name },
        {
          where: { id },
        }
      );

      let updatedCategory = await Category.findByPk(id);
      res.status(200).json({
        message: `Success edit Category with id of ${id}`,
        data: updatedCategory
      });
    } catch (error) {
      next(error)

     
    }
  }
  static async deleteCategory(req, res , next) {
    try {
      const { id } = req.params;

      let category = await Category.findByPk(id);

      if (!category) {
        throw { name: "NotFound", id };
      }

      await Category.destroy({
        where: { id },
      });

      res.status(200).json({
        message: "success delete",
        data: category,
      });
    } catch (error) {
     next(error)
    }
  }
}

module.exports = CategoryController;
