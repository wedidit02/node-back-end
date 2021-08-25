const express = require('express');
const router = express.Router();
const { findAllProducts } = require('../databases/querys');


router.get("", async (req, res) => {
    await findAllProducts((allProducts) => {
        console.log(allProducts)
        res.render("index", { userId: null, products: allProducts });
    });
})

module.exports = router;
