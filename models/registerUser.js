User = require('./user');
passport = require('passport');
const registerUser = function(req,res){
	console.log(req.body);
	User.register(new User({username: req.body.username,userType:req.body['user-type']}), req.body.password, function(err,user){
		if(err){
			console.log(err);
			return res.render('register');
		}
		else{
			passport.authenticate("local")(req,res,function(){
				res.redirect("/login");
			})
		}
	});
	
}
module.exports = registerUser;