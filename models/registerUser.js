User = require('./user');
const registerUser = function(req,res){
	User.register(new User({username: req.body.username}), req.body.password, function(err,user){
		if(err){
			console.log(err);
			return res.render('register');
		}
		else{
			passport.authenticate("local")(req,res,function(){
				res.redirect("/secret");
			})
		}
	});
	
}
module.exports = registerUser;