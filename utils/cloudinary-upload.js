const createCandidate     = require('./createCandidate'),
	  cloudinary          = require('cloudinary').v2;

//Configure the cloudinary uploader
cloudinary.config({
	cloud_name: 'net-danismanlik',
	api_key: '613536172924398',
	api_secret: '8jCN5-aaU03Yc_6G3HveZDpN6Y8'
});
//This function saves candidate into the DB, and uploads the CV
function saveCandUpCV(req) {
	var cvURLs=[];
	
	//Upload the CV onto the cloud
	for (let i=0;i<req.files.length;i++){
	cloudinary.uploader.upload(req.files[i].path, {
		public_id: req.body['first-name'] + " "
			+ req.body['last-name'] + " " +
			req.body.score + " " +
			req.body.position + " " + req.body.uni+"page-"+i, quality: 15
	}, function (error, result) {
		if (error) {
			console.log(error);
		}
		
		cvURLs.push(result.url);
		console.log(cvURLs);
		if (i==req.files.length-1){
			createCandidate(req, cvURLs, function (error, candidate) {
				if (error) {
					console.log(error);
				}
				else {
					console.log(candidate);
				}
			});
		}
	});
}
		// Take the user input and store them to pass it to the database
		
	
}
module.exports = saveCandUpCV;