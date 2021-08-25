const express = require("express");
//init the app
const app = express();
const bodyParser = require("body-parser");
const methodOverride = require('method-override');
const mongoose = require('mongoose');
const session = require('express-session');
const passport = require('passport');
const MongoStore = require('connect-mongo');
const flash = require('express-flash');
const expressLayout = require('express-ejs-layouts');
require("dotenv").config();
const { initPassport, checkNotAuthenticated } = require('./auth/passport-config');

initPassport(passport);

const port = process.env.PORT || 5500;

app.use(express.static("public"));
app.use(express.static("usersProfileImage"));
//static folder
app.use(express.urlencoded({ extended: false }));
//USING BODYPAERSER
app.use(bodyParser.json());
app.use(methodOverride('_method'))


app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(expressLayout);
app.set('layout', './layouts/layout');
app.set('layout extractScripts', true);
app.set('layout extractStyles', true);
app.use(flash());
app.use(methodOverride('_method'));
app.use(express.static("public"));

mongoose.connect(process.env.MONGO, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false
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
  store: new MongoStore({
    mongoUrl: mongoose.connection._connectionString,
    ttl: 10*60
  }),

  //cookie:({ maxAge: 2 * 60})
}))

app.use(passport.initialize());
app.use(passport.session());

//IMPORTING ROUTER MUDOLE
const userRouter = require("./routes/user");
const guestRouter = require("./routes/guest");
const sellerRouter = require("./routes/seller");


app.use("/user/seller", sellerRouter);
app.use("/user", userRouter);
app.use("/", checkNotAuthenticated, guestRouter);


//SERVER IS LISTENING
app.listen(port, () => {
  console.log(`server is runing on ${port}`)
});



