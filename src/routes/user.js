const express = require("express");
const router = express.Router();
const passport = require('passport');
const flash = require('express-flash');
const bodyParser = require("body-parser");
const methodOverride = require('method-override');

const { findUser, createNewUser } = require('../databases/querys');
const { checkAuthenticated, checkNotAuthenticated } = require('../../auth/passport-config');

//const { route } = require(".");

router.use(express.static("public"))
router.use(express.urlencoded({ extended: false }));
//router.use(bodyParser.urlencoded({ extended: true }));
router.use(flash());
router.use(methodOverride('_method'));


router.get('', checkAuthenticated, (req, res) => {
  res.render("index", { userId: req.user });
});

//RENDING USER PROFILE PAGE
router.get('/profile', checkAuthenticated, (req, res) => {
  res.render("userprofile", { userId: req.user });
});

//RENDING LOG IN PAGE
router.get("/login", checkNotAuthenticated, (req, res) => {
  res.render("login")
});

//RENDING REGISTER PAGE
router.get("/signup", checkNotAuthenticated, (req, res) => {
  res.render("register")
});

//LOGING IN
router.post("/login", checkNotAuthenticated, passport.authenticate('local-login', {
  successRedirect: '/user',
  failureRedirect: '/user/login',
  failureFlash: true
}));

router.get('/logout', checkAuthenticated, (req, res) => {
  req.logOut()
  res.redirect('/');
})

//REGISTER FOR AN ACCOUNT
router.post("/signup", checkNotAuthenticated, async (req, res) => {

  const verifyUserExist = await findUser(req.body);
  
  if (verifyUserExist !== null) {
    res.render('register', { inform: 'you alredy have an account try to log in' })
    return;
  }
  try {

    await createNewUser(req.body);
    res.redirect('login');

  } catch (err) {
    console.log(err)
  }
});



//EXPORTING Router MODULE
module.exports = router;