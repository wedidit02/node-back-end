const express = require("express");
//init the app
const app = express();
const bodyParser = require("body-parser");
const methodOverride = require('method-override');
const mongoose = require('mongoose');
const session = require('express-session');
const passport = require('passport');
const MongoStore = require('connect-mongo');
require("dotenv").config();
const {initpassport, checkNotAuthenticated} = require('../auth/passport-config');

initpassport(passport);

const port = process.env.PORT || 5500;

mongoose.connect(process.env.MONGO, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
}, (err) => {
  if (err) {
    console.log(`can not connect to DB ${err}`);
  } else {
    console.log("connected to mongo..");
  }
})

app.use(session({
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: false,
  store: new MongoStore({ mongoUrl: mongoose.connection._connectionString
  })

  //cookie:({ maxAge: 2 * 60})
}))

app.use(passport.initialize());
app.use(passport.session());

//IMPORTING ROUTER MUDOLE
const userRouter = require("./routes/user");
const guestRouter = require('./routes/guest');
// const indexRouter = require("./routes/index");



app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
//static folder
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));
//USING BODYPAERSER
app.use(bodyParser.json());
app.use(methodOverride('_method'))


// app.use("/", indexRouter);
app.use("/user", userRouter);

app.use("/", checkNotAuthenticated, guestRouter);




//SERVER IS LISTENING
app.listen(port, () => {

  console.log(`server is runing on ${port}`)
});
