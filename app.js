const express               = require('express'),
	  app 	                = express(),
	  mongoose              = require('mongoose'),
	  bodyParser            = require('body-parser'),
	  passport              = require('passport'),
	  timeout               = require('connect-timeout'),
	  chalk                 = require('chalk'),
	  router                = require('./server'),
	  bcrypt                = require('bcryptjs'),
	//   ejsLint               = require('ejs-lint'),
	  mongodb               = require('mongodb');
    

app.use(bodyParser.urlencoded({ extended: true }));
app.use(require("express-session")({
	secret:"NetDanismanlik has no secrets",
	resave: false,
	saveUninitialized: false
}));
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.set('view engine', 'ejs');
app.use(passport.initialize());
app.use(passport.session());
//serve "public" directory
app.use(express.static(__dirname+ '/public'));
//set the timeout
app.use(timeout('500s'));
app.use(router);
//Connect to database
mongoose.connect("mongodb://127.0.0.1:27017/cvbank",{useNewUrlParser:true},function(err,db){

});


	
app.listen(3000, console.log(chalk.blue.inverse("AYYO Let's Go!")));