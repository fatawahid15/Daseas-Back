const express = require("express");
const { readProductForPublic, getProductByIdForPublic, getCategory } = require("../controllers/publicController");
const router = express.Router();

router.get("/products", readProductForPublic);
router.get('/categories' , getCategory)
router.get("/products/:id", getProductByIdForPublic);

module.exports = router;
