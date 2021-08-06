const localStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');

const pool = require('../src/databases/database');


function initpassport(passport) {

    const authenticateUser = async (email, password, done) => {

        const sqlQuery = 'SELECT * FROM users WHERE email=? OR user_name=?'
        const rows= await pool.query(sqlQuery, [email, email]);
        const user = rows[0];
    
        if (user == null) {
            //console.log(err)
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
      return  done(null, user.id)
    });

    passport.deserializeUser(async (id, done) => {
        try {

            const sqlQuery = 'SELECT * FROM users WHERE id=?'
            const userId = await pool.query(sqlQuery, [id])
            return done(null, userId[0].id)

        } catch (err) {
            done(err)
        }
    });
}

module.exports = initpassport;





