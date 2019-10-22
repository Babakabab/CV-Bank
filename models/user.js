const mongoose = require("mongoose"),
	  bcrypt   =require('bcryptjs'),
	  passportLocalMongoose = require('passport-local-mongoose');
//User Schema Setup
var userSchema = new mongoose.Schema({
	username: String,
	password: String,
	userType: String
});
userSchema.plugin(passportLocalMongoose);
module.exports = mongoose.model('User',userSchema);