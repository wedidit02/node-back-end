const express = require("express");
const router = express.Router();
const { findAllProducts } = require("../databases/querys");
const { checkNotAuthenticated } = require("../auth/passport-config");

router.get("", checkNotAuthenticated, async (req, res) => {
  await findAllProducts((allProducts) => {
    res.render("index", { userId: null, products: allProducts, title: "Home" });
  });
});

router.get("/cart", checkNotAuthenticated, (req, res) => {
    res.render("cart",{ userId: null, products: [], title: "Cart" })
});

module.exports = router;
