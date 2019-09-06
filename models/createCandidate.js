Candidate  = require('./candidate');
function createCandidate(oCandidate,aCvURLs,cb){
    const 
		  firstName               = oCandidate['first-name'].toLowerCase(),
          lastName                = oCandidate['last-name'].toLowerCase(),
          email                   = oCandidate.email.toLowerCase(),
          gender                  = oCandidate.gender.toLowerCase(),
          degree                  = oCandidate.degree.toLowerCase(),
          uni                     = oCandidate.uni.toLowerCase(),
          score                   = oCandidate.score,
		  likertScale             = oCandidate['likert-scale'],
          currentPosition         = oCandidate['current-position'].toLowerCase(),
          wantedPosition          = oCandidate['wanted-position'].toLowerCase(),     
          lastSalary              = oCandidate['last-salary'],
          expectedSalary          = oCandidate['expected-salary'],
          interviewer             = oCandidate.interviewer.toLowerCase(),
		  dataEnterer             = oCandidate['data-enterer'].toLowerCase(),
          fieldOfStudy            = oCandidate['field-of-study'].toLowerCase(),
          techUsed                = oCandidate['tech-used'].toLowerCase().split(","),
          aInterviewsInfo         = []
          dateOfInterviewUs       = oCandidate['date-of-interview-us'],
          folderName              = oCandidate['folder-name'].toLowerCase(),
          languages               = oCandidate.languages.toLowerCase().split(","),
          experience              = oCandidate.experience,
		  keyWords                = oCandidate['key-words'].toLowerCase(),
		  notes                   = oCandidate.notes.toLowerCase(),
          aCvURLs                 = aCvURLs; 

      for (let i=0;i<oCandidate['number-of-interviews'];i++){
        if (oCandidate[`firm-name${i}`]){
        console.log(oCandidate[`firm-name${i}`]);
        aInterviewsInfo.push({'firmName': oCandidate[`firm-name${i}`],'interviewDate':oCandidate[`interview-date-firm${i}`]});
    }
}
console.log(aInterviewsInfo);
          
    Candidate.create({
         firstName        ,
         lastName         ,
         email            ,
         gender           ,
         degree           ,
         uni              ,
         score            ,
         likertScale      ,
         currentPosition  ,
         wantedPosition   ,
         lastSalary       ,
         expectedSalary   ,
         interviewer      ,
         dataEnterer      ,
         fieldOfStudy     ,
         techUsed         ,
         aInterviewsInfo  ,
         dateOfInterviewUs,
         folderName       ,
         languages        ,
         experience       ,
         keyWords         ,
         notes            ,
         aCvURLs           
}, function(err, candidate){
    if(err){
        cb(err,undefined);
    }
    else{
        cb(undefined,candidate);
    }
});
}
module.exports=createCandidate;
