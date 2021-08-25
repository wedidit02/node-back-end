const express = require("express");
const router = express.Router();
const passport = require('passport');
const imageUploader = require('../multer/multer');


const { findUser, createNewUser, updateProfile } = require('../databases/querys');
const { checkAuthenticated, checkNotAuthenticated } = require('../auth/passport-config');

//const { route } = require(".");

router.use(express.static("public"));
router.use(express.static("usersProfileImage"));

router.get('', checkAuthenticated, (req, res) => {
  res.render("index", { userId: req.user });
});

//RENDING USER PROFILE PAGE
router.route("/profile")
  .get(checkAuthenticated, (req, res) => {
    res.render("userprofile", { userId: req.user });
  })
  .post(checkAuthenticated, imageUploader.single("profileimage"), async (req, res) => {
    //console.log(req.files, req.user, req.body)
    updateProfile(req, () => {
      res.redirect("profile");
    });
  });

//RENDING LOG IN PAGE
router.route("/login")
  .get(checkNotAuthenticated, (req, res) => {
    res.render("login");
  })
  //LOGING IN
  .post(checkNotAuthenticated, passport.authenticate('local-login', {
    successRedirect: '/user',
    failureRedirect: '/user/login',
    failureFlash: true
  }));


//RENDING REGISTER PAGE
router.get("/signup", checkNotAuthenticated, (req, res) => {
  res.render("register")
});





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