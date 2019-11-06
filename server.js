const passport              = require('passport'),
	ObjectId				= require('mongodb').ObjectId,
	LocalStrategy           = require("passport-local"),
	registerUser            = require('./models/registerUser'),
	User                    = require("./models/user"),
	saveCandUpCV            = require('./models/cloudinary-upload.js'),
	saveEditSuggestionUpCV  = require("./models/cloudinary-upload-for-edit"),
	fileNameParserUploader  = require('./models/fileNameParserUploader'),
	search                  = require('./models/searchType'),
	candidateDeleter        = require('./models/candidateDeleter'),
	Candidate               = require('./models/candidate'),
	EditSuggestion          = require('./models/editSuggestions'),
	deleteEditSuggestion    = require('./models/deleteEditSuggestions'),
	upload                  = require('./configs/multer-config'),
	bodyParser              = require('body-parser'),
	express                 = require('express'),
	dateToStringParser      = require('./models/dateToStringParser'),
	isLoggedIn              = require('./models/isLoggedIn'),
	app                     = express();

const router = express.Router();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
passport.use(new LocalStrategy(User.authenticate()));

//================
//ROUTES
//================

//Home Page

router.get('/',isLoggedIn, function (req, res) {
	res.render("main-page",{userType:req.user.userType});
});

//Routing for candidate search
router.get('/search-candidates',isLoggedIn, function (req, res) {
	//Render the search page
	res.render("search-candidates");
});
router.post("/search-candidates",isLoggedIn, function (req, res) {
	//console.log(search(req));

	search(req, function (candidates) {
		res.render('candidate-list', { candidates: candidates,currentUser:req.user });

	});

});


//Routing for making a new candidate
router.get('/candidate/new',isLoggedIn, function (req, res) {
	res.render("index");
});

//This post method adds a candidate into our database
router.post('/candidate/new', upload.array('cv', 8), function (req, res) {
	//Upload the CV to the cloud, wait for the program to finish, create a candidate and save in the database
	saveCandUpCV(req,"create");

	//Rerender the page to enter another candidate
	res.render('index');
});

//Uploading Routes
router.get('/upload', isLoggedIn,(req, res) => {
	res.render('upload-test');

});
router.post('/upload',isLoggedIn, upload.array('cv', 400), function (req, res) {
	//Loop through all the file names, split the names up, 
	//assign them to the right variables, and finally upload them and save
	//them in the database.
	fileNameParserUploader(req);
	res.render('upload-test');
});

//REGISTER ROUTES
router.get("/register", function (req, res) {
	res.render('register');
});
router.post("/register",registerUser);

	

//LOGIN ROUTES
router.get("/login", function (req, res) {
	 res.render("login");
	 });
	
router.post("/login" , passport.authenticate("local", {
	successRedirect: '/',
	failureRedirect: "/login"
}), function (req, res) {
	
console.log(req.body);
});
router.post("/candidate/:id/delete", (req, res) => {
	console.log(req.params);
	candidateDeleter(req.params.id);
	res.render('main-page');

});
//Candidate edit route

router.get("/candidate/:id/edit",isLoggedIn, (req, res) => {
	Candidate.findOne({ _id: req.params.id })
		.then((candidate) => {
			const sDateOfInterviewUs = dateToStringParser(candidate.dateOfInterviewUs),
				  aParsedInterviewDates = [];
			candidate.aInterviewsInfo.map((interviewInfo)=>{aParsedInterviewDates.push(dateToStringParser(interviewInfo.interviewDate)); });

			
			res.render('edit-candidate', { candidate: candidate,isEditSuggestion:false,aParsedInterviewDates : aParsedInterviewDates, sDateOfInterviewUs: sDateOfInterviewUs, currentUser:req.user.userType });
		})
		.catch((err) => { console.log(err) });
	

});
router.put("/candidate/:id/approve",isLoggedIn,upload.array('cv',8),(req,res)=>{
	saveCandUpCV(req,"update",(err,info)=>{
		if(err){console.log(err)}
		else{console.log(info)}
	});

});

router.put("/candidate/:id/edit",isLoggedIn,upload.array('cv', 8),(req,res)=>{
	saveCandUpCV(req,"update",(err,info)=>{
		if(err){console.log(err)}
		else{console.log(info)}
	});
});

router.get("/candidate/:id/edit-suggestion",isLoggedIn, (req, res) => {
	console.log(req.params.id);
	EditSuggestion.findOne({ _id: ObjectId(req.params.id) }).exec()
		.then((editSuggestion) => {
			const sDateOfInterviewUs = dateToStringParser(editSuggestion.dateOfInterviewUs),
				  aParsedInterviewDates = [];
			editSuggestion.aInterviewsInfo.map((interviewInfo)=>{
				aParsedInterviewDates.push(dateToStringParser(interviewInfo.interviewDate));
			 });

			
			res.render('edit-candidate', { 
				candidate: editSuggestion,
				isEditSuggestion:true,
				aParsedInterviewDates,
				sDateOfInterviewUs,
				currentUser:req.user.userType 
				});
		})
		.catch((err) => { console.log(err) });
	
			
			 

	

});
router.post("/candidate/:id/suggestedit",isLoggedIn,upload.array('cv',8),(req,res)=>{
	saveEditSuggestionUpCV(req,(error,result)=>{
		if (error){
			console.log(error);
		}
		else{
			console.log("The candidate that was edited, ",result)
		}
	});
	res.send();
	
});
router.get("/candidate/:id",isLoggedIn,(req,res)=>{
	//Create a function that makes a DB inquiry then returns the candidate as an object
	Candidate.findOne({'_id':ObjectId(req.params.id)},(err,candidate)=>{
		if(err){
			console.log(err);
		}
		res.send(candidate);
	});
});

router.get("/editsuggestion/:id",isLoggedIn,(req,res)=>{
	EditSuggestion.findOne({'_id':ObjectId(req.params.id)},(err,editSuggestion)=>{
		if(err){
			console.log(err);
		}
		
		res.send(editSuggestion);
	});
});
router.get("/logout",(req,res)=>{
	req.logout();
	res.redirect("/login");

});
router.get('/pending-approval',isLoggedIn,(req,res)=>{
	Candidate.find({pendingEditApproval:true},function(err,candidates){
		if(err){
			console.log(err);
		}
		else{
		res.render('pending-approval',{currentUser:req.user,candidates:candidates});
	}
	});
})
//Edit Suggestion Delter
router.delete('/editsuggestion/:id/delete',function(req,res){
	deleteEditSuggestion(req.params.id);
	res.send();
});
//Route for any wrong URL s
router.get("*", function (req, res) {
	res.send("You came to the wrong neighborhood buddy!");
});


module.exports = router;