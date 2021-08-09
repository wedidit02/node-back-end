const localStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');

const {validateUser, findUserByIde} = require('../src/databases/querys');


function initPassport(passport) {

    const authenticateUser = async (email, password, done) => {

        const verifyUser = await validateUser(email, email);
        
        const user = verifyUser[0];
    
        if (user == null) {
            return done(null, false, {
                message: 'no user found on this email or user name'
            })
        }

        try {
            if (await bcrypt.compare(password, user.password)) {
                return done(null, user)
            } else {
                return done(null, false, { message: 'password incrrect' });
            }
        } catch (e) {
            return done(e)
        }
    }

    passport.use('local-login', new localStrategy({

        usernameField: 'email'

    }, authenticateUser));

    passport.serializeUser((user, done) => {
      return  done(null, user._id)
    });

    passport.deserializeUser(async (_id, done) => {
        
        try {

            const userId = await findUserByIde(_id);
            return done(null, userId);

        } catch (err) {
            done(err)
        }
    });
}

function checkAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
      return next()
    }
  
    res.redirect('/')
  }
  
  function checkNotAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
  
      return res.redirect('/user')
    }
    next()
  }
  

module.exports = {initPassport, checkAuthenticated, checkNotAuthenticated};





