const express = require("express");
const bodyParser = require("body-parser");
require("dotenv").config();


const port = process.env.PORT || 5500;

//init the app
const app = express();

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
//static folder
app.use(express.static("public"));

//USING BODYPAERSER
app.use(bodyParser.json());

//IMPORTING ROUTER MUDOLE
const userRouter = require("./routes/user");
const indexRouter = require('./routes/index');
// const indexRouter = require("./routes/index");

// app.use("/", indexRouter);
app.use("/user", userRouter);
app.use("/:id", indexRouter);
app.use("/", indexRouter);




//SERVER IS LISTENING
app.listen(port, () => {

  console.log(`server is runing on ${port}`)
});
