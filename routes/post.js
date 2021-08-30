const express = require("express");
const router = express.Router();

const { findProductByIde } = require('../databases/querys');
router.use(express.static("public"));

router.get("/:id", (req, res) => {
    const id = req.params.id;
    const userInfo = req.user;
    console.log(userInfo);
    findProductByIde(id, (result) => {
        //console.log(result)
        if (userInfo === undefined) {
            res.render("product", { userId: null, product:result, title: "Product" })
        }else{
            res.render("product", { userId: userInfo, product:result, title: "Product" })
        }
    })
})

module.exports = router;