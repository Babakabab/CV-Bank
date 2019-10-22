const   Candidate            = require('./candidate'),
        cloudinary           = require('cloudinary').v2,
        candidatesInfoParser = require('./candidate-info-parser');

cloudinary.config({
    cloud_name: 'net-danismanlik',
    api_key: '613536172924398',
    api_secret: '8jCN5-aaU03Yc_6G3HveZDpN6Y8'
});


const cvFolderUploader = function(oReq){
    //Parse all file names, and save them as an array of candidate objects
    const candidateList = candidatesInfoParser(oReq.files);
    for (let i=0;i<candidateList.length;i++){
        // Upload the file to Cloudinary
        cloudinary.uploader.upload(oReq.files[i].path,
            {
                public_id: candidateList[i].firstName + " " + candidateList[i].lastName + " " + candidateList[i].score + " " +
                    candidateList[i].position + " " + candidateList[i].uni, timeout: 120000
            },
            function (error, result) {
                if (error) {
                    console.log(error);
                }
                else {

                    console.log(result);

                    //Take the user input and store them to pass it to the database
                    let cvURL = result.url;
                    console.log("candidateList",candidateList[0]);
                    //Add the uploaded cv to the cvURLs array
                    candidateList[i].aCvURLs.push(cvURL);
                    console.log(candidateList[i]);
                    //create and add a candidate to the DB
                    Candidate.create(candidateList[i], function (err, candidate) {
                        if (err) {
                            console.log(err);
                        }
                        else {
                            console.log(candidate);
                        }
                    });

                }

            });
    }
                            
                            

    console.log(candidateList);
    return candidateList;
    }
module.exports = cvFolderUploader;