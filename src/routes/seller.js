const express = require("express");
const router = express.Router();
const imageUploader = require("../multer/multer");
const { postProduct, findUser, createNewUser, updateProfile } = require('../databases/querys');
const { checkAuthenticated, checkNotAuthenticated } = require('../auth/passport-config');

router.use(express.static("public"));
router.use(express.static("usersProfileImage"));

router.get("/", checkAuthenticated, (req, res) => {
  res.render('info', { userId: req.user });
});

router.route("/sell-now")
  .get(checkAuthenticated, (req, res) => {
    res.render("seller", { userId: req.user,  title:"Sell Now" });
  })

  .post(checkAuthenticated, imageUploader.array("product-image"), async (req, res) => {
    postProduct(req, (doc) => {
      res.redirect('sell-now');
    });
  })

module.exports = router;