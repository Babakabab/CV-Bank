mcQuaigParser = require('./mcQuaigParser')
const candidatesInfoParser = function (files){
    //Store all file names in an array
    var fileList = files.map((file) => file.originalname);
    const candidateList = [];
    //loop through each item in the array and 
    
    fileList.map((file)=>{

                     //Take the .jpg off the file name, and split
                    //them using the space in between the words
                    const candidate       = file.slice(0,-4).split(" ");
   
                        //Assign each part to the data they represent
                        const oCandidate = {
                              firstName          : candidate[0],
                              lastName           : candidate[1],
                              score              : mcQuaigParser(candidate[2]),
                              wantedPosition     : candidate[3],
                              uni                : candidate[4],
                              folderName         : candidate[5],
                              notes              : candidate[6],
                              email              : "",
                              gender             : "",
                              keyWords           : "",
                              degree             : "",
                              interviewer        : "",
                              dataEnterer        : "",
                              salary             : "",
                              dateOfInterviewFirm: "",
                              aInterviewsInfo    : [],
                              targetFirm         : "",
                              likertScore        : "",
                              numberOfinterviews : "",
                              aCvURLs             : []
                        };
                    
                    candidateList.push(oCandidate);
                        });
    
    console.log(candidateList);
    return candidateList;
}
module.exports = candidatesInfoParser;