const express = require("express");
const router = express.Router();
const passport = require('passport');
const flash = require('express-flash');
const session = require('express-session');
const bodyParser = require("body-parser");
const pool = require('../databases/database');
const bcrypt = require('bcrypt');
const methodOverride = require('method-override');

const passportConfig = require('../../auth/passport-config');
//const { route } = require(".");
passportConfig(passport);


router.use(express.static("public"))
//router.use(express.urlencoded({ extended: false }));
router.use(bodyParser.urlencoded({extended: true} ));
router.use(flash());
router.use(methodOverride('_method'));
router.use(session({
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: false
  //cookie:({ maxAge: 2 * 60})
}))

router.use(passport.initialize());
router.use(passport.session());

router.get('', checkAuthenticated, (req, res) => {
  console.log(req.user)
     res.render("index", {userId: req.user});
 
 });
 

//RENDING USER PROFILE PAGE
router.get('/profile', checkAuthenticated, (req, res) => {
  res.render("userprofile");
});

//RENDING LOG IN PAGE
router.get("/login", checkNotAuthenticated, (req, res) => {
  res.render("login")
});

//RENDING REGISTER PAGE
router.get("/signup", checkNotAuthenticated,(req, res) => {
  res.render("register")
});





//LOGING IN
router.post("/login",checkNotAuthenticated, passport.authenticate('local-login', {
  successRedirect: '/user',
  failureRedirect: '/user/login',
  failureFlash: true
}));
//console.log({successRedirect: '/user'})


router.get('/logout',checkAuthenticated, (req, res) =>{
  req.logOut()
  res.redirect('login');
})


//REGISTER FOR AN ACCOUNT
router.post("/signup", async (req, res) => {
  try {
    const {
      name,
      userName,
      email,
      password
    } = req.body;

    const encryptedPassword = await bcrypt.hash(password, 10);
    console.log(encryptedPassword);

    const postQuery = 'INSERT INTO users (name, user_name, email, password) VALUES(?, ?, ?, ?)'
    const rows = await pool.query(postQuery, [name, userName, email, encryptedPassword]);
    res.send(rows);

  } catch (err) {
    console.log(err)

    if (err.code == 'ER_DUP_ENTRY') {
      res.render('register', { inform: 'you alredy have an account try to log in' });
    }

  }


});


function checkAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next()
  }

  res.redirect('login')
}

function checkNotAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    console.log(req.user)

    return res.redirect('/user')
  }
  next()
}




//EXPORTING Router MODULE
module.exports = router;