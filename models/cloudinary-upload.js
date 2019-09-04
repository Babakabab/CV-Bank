const 	createCandidate = require('./createCandidate'),


	  	cloudinary = require('cloudinary').v2;	


//This function saves candidate into the DB, and uploads the CV
function saveCandUpCV(req) {
	let cvURLs=[];

	//Upload the CV onto the cloud
	for (let i = 0; i < req.files.length; i++) {
		req.files.map((file)=>{

		});
		
		cloudinary.uploader.upload(req.files[i].path, {
			public_id: req.body['first-name'] + " "
				+ req.body['last-name'] + " " +
				req.body.score + " " +
				req.body.position + " " + req.body.uni + "page-" + i, quality: 15
		}, function (error, result) {
			if (error) {
				console.log(error);
			}
			else {
				cvURLs.push(result.url);
				console.log(cvURLs);
				if (i == req.files.length - 1) {
					createCandidate(req.body, cvURLs, function (error, candidate) {
						if (error) {
							console.log(error);
						}
						else {
							console.log(candidate);
						}
					});
				}
			}
		});
	}
	
	
	


}
module.exports = saveCandUpCV;