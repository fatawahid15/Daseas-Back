const express = require("express");
const {
  addCategories,
  getAllCategories,
  editCategories,
  deleteCategory,
} = require("../controllers/categoryController");
const router = express.Router();

router.get("/", getAllCategories);
router.post("/", addCategories);
router.put("/:id", editCategories);
router.delete("/:id", deleteCategory);

module.exports = router;
