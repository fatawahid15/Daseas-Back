const express = require("express");
const router = express.Router();
const productRouter = require("../routers/product");
const categoryRouter = require("../routers/category");
const publicRouter = require("../routers/public");
const { login, register } = require("../controllers/AuthController");
const {
  authenticatebyToken,
  authorizationByRole,
} = require("../middleware/auth");
const errorHandler = require("../middleware/errorHandler");

router.use("/pub", publicRouter);

router.post("/login", login);

router.use(authenticatebyToken);

router.post("/add-user", authorizationByRole, register);
router.use("/products", productRouter);
router.use("/categories", categoryRouter);

router.use(errorHandler);

module.exports = router;
