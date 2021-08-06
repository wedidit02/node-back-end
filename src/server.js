const express = require("express");
//init the app
const app = express();
const bodyParser = require("body-parser");
const methodOverride = require('method-override');

require("dotenv").config();

//IMPORTING ROUTER MUDOLE
const userRouter = require("./routes/user");
const indexRouter = require('./routes/index');
// const indexRouter = require("./routes/index");


const port = process.env.PORT || 5500;

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
//static folder
app.use(express.static("public"));
app.use(express.urlencoded({extended: false}));
//USING BODYPAERSER
app.use(bodyParser.json());
app.use(methodOverride('_method'))


// app.use("/", indexRouter);
app.use("/user", userRouter);

//app.use("/", indexRouter);




//SERVER IS LISTENING
app.listen(port, () => {

  console.log(`server is runing on ${port}`)
});
