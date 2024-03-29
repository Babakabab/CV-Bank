// //============
// //Schema Setup
// //============
const mongoose = require("mongoose");

//Candidate Schema Setup
var candidateSchema = new mongoose.Schema({
	pendingEditApproval : Boolean,
	firstName           : String,
	lastName            : String,
	email               : String,
	gender              : String,
	currentPosition     : String,
	wantedPosition      : String,
	uni                 : String,
	degree              : String,
	folderName          : String,
	interviewer         : String,
	dataEnterer         : String,
	notes               : String,
	fieldOfStudy		: String,
	expectedSalary      : Number,
	lastSalary          : Number,
	likertScale	        : Number,    
	experience          : Number,
	phoneNumber			: Number,
	score               : Object,
	languages		    : Array ,
	techsUsed		    : Array ,
	aInterviewsInfo     : Array ,
	aCvURLs             : Array ,
	keyWords            : Array ,
	lastModified        : Date  ,
	dateOfInterviewUs   : Date

});
candidateSchema.index({firstName:1,lastName:1,uni:1,score:1},{unique:true});
var Candidate = mongoose.model("Candidate", candidateSchema);

module.exports =Candidate;