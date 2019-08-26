Candidate = require('./models/candidate'),
cloudinary = require('cloudinary').v2;

cloudinary.config({
	cloud_name: 'net-danismanlik',
	api_key: '613536172924398',
	api_secret: '8jCN5-aaU03Yc_6G3HveZDpN6Y8'
});
const fileNameParserUploader = function (req){
    var fileList = req.files.map((file) => file.originalname);
    for (let i=0 ; i<req.files.length; i++){

                     //Take the .jpg off the file name, and split
                    //them using the space in between the words
                    const candidate       = fileList[i].slice(0,-4).split(" ");
                

                        console.log('candidate :', candidate);

                        //Assign each part to the data they represent
                        const firstName            = candidate[0],
                              lastName             = candidate[1],
                              score                = candidate[2],
                              position             = candidate[3],
                              uni                  = candidate[4],
                              folderName           = candidate[5],
                              notes                = candidate[6],
                              email                = "",
                              gender               = "",
                              keyWords             = "",
                              degree               = "",
                              interviewer          = "",
                              dataEnterer          = "",
                              salary               = "",
                              dateOfInterviewFirm  = "",
                              dateOfInterviewUs    = "",
                              targetFirm           = "",
                              likertScore          = "",
                              numberOfinterviews   = "";


                    // Upload the file to Cloudinary
                    
                        
                        }
}
cloudinary.uploader.upload(req.files[i].path, 
                            {public_id:firstName + " "	+ lastName + " " +score + " " +
                            position+" " +uni, timeout:120000},
                            function(error, result) { 
                            if (error){
                            console.log(error);
                            console.log(req.files[i].path);
                            }
                            else{
                        
                        console.log(result);

                    //Take the user input and store them to pass it to the database
                        let cvURL = result.url; 
                        
                    //create and add a candidate to the DB
                        
                        Candidate.create({
                            firstName            : firstName,
                            lastName             : lastName,
                            position             : position,
                            score                : score,
                            uni                  : uni,
                            cvURL                : cvURL,
                            folderName           : folderName,
                            email                : email,
                            gender               : gender,
                            keyWords             : keyWords,
                            degree               : degree,
                            interviewer          : interviewer,
                            dataEnterer          : dataEnterer,                     
                            salary               : salary,
                            dateOfInterviewFirm  : dateOfInterviewFirm,
                            dateOfInterviewUs    : dateOfInterviewUs,
                            targetFirm           : targetFirm,
                            notes                : notes,
                            numberOfinterviews   : numberOfinterviews,
                            likertScore          : likertScore
                            


                        }, function(err, candidate){
                            if(err){
                                console.log(err);
                            }
                            else{
                                console.log(candidate);
                            }
                        });
                        
                    }
                    
                        });
module.exports=fileNameParserUploader;