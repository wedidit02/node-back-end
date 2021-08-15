const express = require("express");
const router = express.Router();
const passport = require('passport');


const { findUser, createNewUser, updateProfile } = require('../databases/querys');
const { checkAuthenticated, checkNotAuthenticated } = require('../auth/passport-config');

//const { route } = require(".");

router.use(express.static("public"));
router.use(express.static("usersProfileImage"));



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

router.get("/sell-now", checkAuthenticated, (req, res) =>{
  res.render('seller',{ userId: req.user } )
})

router.post("/sell-now", checkAuthenticated, (req, res) =>{
  console.log(req.body)
  res.render('seller',{ userId: req.user } )
})

//LOGING IN
router.post("/login", checkNotAuthenticated, passport.authenticate('local-login', {
  successRedirect: '/user',
  failureRedirect: '/user/login',
  failureFlash: true
}));


router.post('/profile', checkAuthenticated, async (req, res) => {
  //console.log(req.files, req.user, req.body)

  updateProfile(req, (profileUpdate) => {
    
    res.redirect("profile");
  });

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