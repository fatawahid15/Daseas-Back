const express = require("express");
const router = express.Router();
const upload = require("../helpers/multer");
const middlewareUpload = upload.single("file");
const {
  getAllProducts,
  addProducts,
  getProductById,
  editProduct,
  deleteProduct,
  imgUploadHandler,
} = require("../controllers/productController");
const { authorizationByRole } = require("../middleware/auth");

router.get("/", getAllProducts);
router.get("/:id", getProductById);
router.post("/", addProducts);

router.put("/:id", authorizationByRole, editProduct);
router.delete("/:id", authorizationByRole, deleteProduct);
router.patch("/:id", authorizationByRole, middlewareUpload, imgUploadHandler);

module.exports = router;
