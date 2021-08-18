const express = require("express");
const router = express.Router();
const passport = require('passport');
//const path = require('path');


const { findUser, createNewUser, updateProfile } = require('../databases/querys');
const { checkAuthenticated, checkNotAuthenticated } = require('../auth/passport-config');

//const { route } = require(".");

router.use(express.static("public"));
router.use(express.static("usersProfileImage"));

router.get("/sell-now", checkAuthenticated, (req, res) =>{
    res.render('seller',{ userId: req.user } )
  })