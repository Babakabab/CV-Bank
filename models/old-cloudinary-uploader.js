const createEditSuggestions = require('./createEditSuggestions'),
	candidateUpdate = require('./candidateUpdate'),
	Candidate = require('./candidate'),
	ObjectId = require('mongodb').ObjectId,

	cloudinary = require('cloudinary').v2;


//This function saves candidate into the DB, and uploads the CV
function saveEditSuggestionUpCV(req, cb) {

	let aCvURLs = req.aCvURLs;
	//This is the quality percentage of the photo
	let quality = 15;

	//Upload the CV onto the cloud

	for (let i = 0; i < req.files.length; i++) {
		let public_id = req.body['first-name'].append(" "+ req.body['last-name'])
		.append(" " +req.body.position) 
		.append( " " + req.body.uni)
		.append("page-" + i);
		
		cloudinary.uploader.upload(req.files[i].path, {
			public_id , quality
		}, function (error, result) {
			if (error) {
				console.log(error);
			}
			else {
				aCvURLs.push(result.url);
				console.log(result);
				if (i == req.files.length - 1) {

					createEditSuggestions(req.body, req.id, aCvURLs, function (error, editSuggestion) {
						if (error) {
							cb(error,undefined);
						}
						else {
							cb(undefined,editSuggestion);
						}
					});


				}
			}
		});
	}
	if (req.files.length === 0) {
		createEditSuggestions(req.body, req.body.id, aCvURLs, function (error, editSuggestion) {
			if (error) {
				cb(error,undefined);
			}
			else {
				Candidate.findOneAndUpdate( ObjectId(req.body.id) ,{$set: { pendingEditApproval: true }} , function (error, updatedCandidate) {
					if (error) {
						cb(error,undefined);
					}
					else (cb(undefined,updatedCandidate));
				});
			}


		});





	}
}
module.exports = saveEditSuggestionUpCV;