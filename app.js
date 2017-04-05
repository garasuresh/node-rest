var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

var movieRouter = require('./routes/movies');

var db = mongoose.connect("mongodb://localhost/moviesDB");

var app = express();
app.use(bodyParser.json());

app.listen(3000, function(){
    console.log("Server started running on post 3000");
});



app.use('/movies', movieRouter);