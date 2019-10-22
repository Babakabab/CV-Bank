mcQuaigParser = require('./mcQuaigParser')
const candidatesInfoParser = function (files){
    //Store all file names in an array
    var fileList = files.map((file) => file.originalname);
    const candidatesArray = [];
    //loop through each item in the array and 
    
    fileList.map((file)=>{

                     //Take the .jpg off the file name, and split
                    //them using the space in between the words
                    const candidate       = file.slice(0,-4).split(" ");
   
                        //Assign each part to the data they represent
                        const oCandidate = {
                              firstName          : candidate[0].toLowerCase(),
                              lastName           : candidate[1].toLowerCase(),
                              score              : mcQuaigParser(candidate[2]),
                              wantedPosition     : candidate[3].toLowerCase(),
                              uni                : candidate[4].toLowerCase(),
                              folderName         : candidate[5].toLowerCase(),
                              notes              : candidate[6]?candidate[6].toLowerCase():'',
                              aCvURLs            : [],
                              pendingEditApproval: false,
                              lastModified       : new Date()
                        };
                    
                    candidatesArray
            .push(oCandidate);
                        });
    
    console.log(candidatesArray);
    return candidatesArray;
}
module.exports = candidatesInfoParser;