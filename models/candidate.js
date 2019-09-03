// //============
// //Schema Setup
// //============
const mongoose = require("mongoose");

//Candidate Schema Setup
var candidateSchema = new mongoose.Schema({
	firstName           : String,
	lastName            : String,
	email               : String,
	gender              : String,
	position            : String,
	score               : Object,
	uni                 : String,
	degree              : String,
	keyWords            : String,
	folderName          : String,
	interviewer         : String,
	dataEnterer         : String,
	dateOfInterviewUs   : String,
	dateOfInterviewFirm : String,
	notes               : String,
	salary              : Number,
	likertScale	        : Number,    
	numberOfInterviews  : Number,
	targetFirmList      : Array ,
	cvURLs              : Array

});
candidateSchema.index({firstName:1,lastName:1,uni:1,score:1},{unique:true});
var Candidate = mongoose.model("Candidate", candidateSchema);

module.exports =Candidate;