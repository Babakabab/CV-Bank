const createCandidate = require('./createCandidate'),
	candidateUpdate = require('./candidateUpdate');

cloudinary = require('cloudinary').v2;


//This function saves candidate into the DB, and uploads the CV
function saveCandUpCV(req, method,cb) {
	let aCvURLs = [];

	//Upload the CV onto the cloud

	for (let i = 0; i < req.files.length; i++) {
		cloudinary.uploader.upload(req.files[i].path, {
			public_id: req.body['first-name'] + " "
				+ req.body['last-name'] + " " +
				req.body.position + " " + req.body.uni + "page-" + i, quality: 15
		}, function (error, result) {
			if (error) {
				console.log(error);
			}
			else {
				aCvURLs.push(result.url);
				console.log("cloudinary results",result);
				if (i == req.files.length - 1) {
					if (method == "create") {
						createCandidate(req.body, aCvURLs, function (error, candidate) {
							if (error) {
								cb(error,null);
							}
							else {
								cb(null,candidate);
							}
						});
					}
					else if (method = "update") {
						candidateUpdate(req.body, req.body.id, aCvURLs, function (error, candidate) {
							if (error) {
								cb(err,null);
							}
							else {
								cb(null,candidate);
							}
						});

					}
					else if (method = "approve") {
						req.body.pendingEditApproval = false;
						candidateUpdate(req.body, req.body.id, aCvURLs, function (error, candidate) {
							if (error) {
								cb(error,null);
							}
							else {
								cb(null,candidate);
							}
						});

					}

					
				}
			}
		});
	}
	if (req.files.length === 0) {
		candidateUpdate(req.body, req.body.id, [], function (error, candidate) {
			if (error) {
				cb(err,null);
			}
			else {
				cb(null,candidate);
			}


		});





	}
}
module.exports = saveCandUpCV;