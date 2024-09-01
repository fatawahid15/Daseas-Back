"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Product.belongsTo(models.Category, {
        foreignKey: "categoryId",
      });
      Product.belongsTo(models.User, {
        foreignKey: "authorId",
      });
    }
  }
  Product.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: { msg: "Product name cannot be empty!" },
          notNull: { msg: "Product name cannot be empty!" },
        },
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: { msg: "Description cannot be empty!" },
          notNull: { msg: "Description cannot be empty!" },
        },
      },
      price: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: { msg: "Price cannot be empty!" },
          notNull: { msg: "Price cannot be empty!" },
          min: {
            args: 100_000,
            msg: "Price must been at least Rp.100.000,00!",
          },
        },
      },
      stock: DataTypes.INTEGER,
      imgUrl: DataTypes.STRING,
      categoryId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: { msg: "CategoryId cannot be empty!" },
          notNull: { msg: "CategoryId cannot be empty!" },
        },
      },
      authorId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: { msg: "CategoryId cannot be empty!" },
          notNull: { msg: "CategoryId cannot be empty!" },
        },
      },
    },
    {
      sequelize,
      modelName: "Product",
    }
  );
  return Product;
};
