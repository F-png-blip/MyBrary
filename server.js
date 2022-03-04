
if(process.env.NODE_ENV !== 'production') {
    require("dotenv").config();
}

const express = require("express");
const app = express();
const expressLayouts = require("express-ejs-layouts");

const indexRouter = require("./routes/index.js");

app.set("view engine", "ejs");
app.set("views", __dirname + "/views");
app.set("layout", "layouts/layout");
app.use(expressLayouts);
app.use(express.static("public"));

// Initialising Data Base
const mongoose = require('mongoose');

mongoose.connect(process.env.DATABASE_URL)
const db = mongoose.connection;
db.on('error', function(error) {
    console.error(error);
});
db.once('open', function() {
    console.log("Connected to Mongoose");
});

app.use("/", indexRouter);

app.listen(process.env.PORT || 3000, function() {
    console.log("Server is running on PORT 3000")
});