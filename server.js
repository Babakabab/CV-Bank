const passport              = require('passport'),
	LocalStrategy           = require("passport-local"),
	registerUser            = require('./models/registerUser'),
	User                    = require("./models/user"),
	saveCandUpCV            = require('./models/cloudinary-upload.js'),
	fileNameParserUploader  = require('./models/fileNameParserUploader'),
	search                  = require('./models/searchType'),
	candidateDeleter        = require('./models/candidateDeleter'),
	Candidate               = require('./models/candidate'),
	upload                  = require('./configs/multer-config'),
	bodyParser              = require('body-parser'),
	express                 = require('express'),
	dateToStringParser      = require('./models/dateToStringParser'),
	app                     = express();

const router = express.Router();
app.use(bodyParser.urlencoded({ extended: false }));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
passport.use(new LocalStrategy(User.authenticate()));

//================
//ROUTES
//================

//Home Page

var candidateList;
router.get('/', function (req, res) {
	res.render("main-page");
});

//Routing for candidate search
router.get('/search-candidates', function (req, res) {
	//Render the search page
	res.render("search-candidates");
});
router.post("/search-candidates", function (req, res) {
	//console.log(search(req));

	search(req, function (candidates) {
		res.render('candidate-list', { candidates: candidates });

	});

});

//Routing for making a new candidate
router.get('/candidate/new', function (req, res) {
	res.render("index");
});

//This post method adds a candidate into our database
router.post('/candidate/new', upload.array('cv', 8), function (req, res) {
	//Upload the CV to the cloud, wait for the program to finish, create a candidate and save in the database
	console.log(req.body);
	saveCandUpCV(req);

	//Rerender the page to enter another candidate
	res.render('index');
});

//Uploading Routes
router.get('/upload', (req, res) => {
	res.render('upload-test');

});
router.post('/upload', upload.array('cv', 400), function (req, res) {
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
router.post("/register", registerUser);

//THE PAGES THAT USER WILL SEE AFTER LOGGING IN
router.get("/secret", function (req, res) { res.render("main-page"); });

//LOGIN ROUTES
router.get("/login", function (req, res) { res.render("login"); });
router.post("/login", passport.authenticate("local", {
	successRedirect: "/secret",
	failureRedirect: "/login"
}), function (req, res) {

});
router.post("/candidate/:id/delete", (req, res) => {
	console.log(req.params);
	candidateDeleter(req.params.id);
	res.render('main-page');

});
//Candidate edit route
router.get("/candidate/:id/edit", (req, res) => {
	Candidate.findOne({ _id: req.params.id })
		.then((candidate) => {
			
			

			const sDateOfInterviewUs = dateToStringParser(candidate.dateOfInterviewUs),
				  aParsedInterviewDates = [];
			candidate.aInterviewsInfo.map((interviewInfo)=>{aParsedInterviewDates.push(dateToStringParser(interviewInfo.interviewDate)); });

			
			res.render('edit-candidate', { candidate: candidate,aParsedInterviewDates : aParsedInterviewDates, sDateOfInterviewUs: sDateOfInterviewUs });
			//console.log(candidate)
		})
		.catch((err) => { console.log(err) });

});
//Route for any wrong URL s
router.get("*", function (req, res) {
	res.send("YOURE a STAR");
});

module.exports = router;