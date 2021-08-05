const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const pool = require('../databases/database');
const bcrypt = require('bcrypt');

router.use(express.static("public"))
router.use(bodyParser.urlencoded({
  extended: true
}));

//RENDING USER PROFILE PAGE
router.get('/profile', (req, res) => {
  res.render("userprofile");
});

//RENDING LOG IN PAGE
router.get("/login", (req, res) => {
  res.render("login")
});

//RENDING REGISTER PAGE
router.get("/signup", (req, res) => {
  res.render("register")
});

//LOGING IN
router.post("/login", async (req, res) => {
  try {
    const {
      email,
      password
    } = req.body;
    const method = req.route.methods

    const verifyQuery = 'SELECT id, password FROM users WHERE email=? OR user_name=?'
    const rows = await pool.query(verifyQuery, [email, email]);

    if (rows !== 0) {

      const validatePassword = await bcrypt.compare(password, rows[0].password);

      if (validatePassword) {
        //res.render('userprofile', { user: rows });
        res.redirect(`/${rows[0].id}`);
      } else {
        res.render('login', { inform: 'Password incorrect..' });
      }

    } else {
      res.render('login', { inform: 'check your Email or User Name or you don´t have account' });
    }

  } catch (err) {
    console.log(err);

    res.render('login', { inform: 'check your Email or User Name or you don´t have account' });
  }
});


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







//EXPORTING Router MODULE
module.exports = router;