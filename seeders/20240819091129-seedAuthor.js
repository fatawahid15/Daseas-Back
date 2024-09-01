"use strict";

const {hash} = require('../helpers/bcrypt')
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    let data = require("../data/Users.json");
    let author = data.map((el) => {
      delete el.id;
      el.createdAt = el.updatedAt = new Date();
      el.password = hash(el.password)
      return el;
    });
    await queryInterface.bulkInsert("Users", author);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Users", null, {});
  },
};
