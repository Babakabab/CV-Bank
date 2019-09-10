const Candidate     =  require('./candidate'),
      mcQuaigParser =  require('./mcQuaigParser');
function createCandidate(oCandidate,aCvURLs,cb){
    const 
		  firstName               = oCandidate['first-name'].toLowerCase(),
          lastName                = oCandidate['last-name'].toLowerCase(),
          email                   = oCandidate.email.toLowerCase(),
          gender                  = oCandidate.gender.toLowerCase(),
          degree                  = oCandidate.degree.toLowerCase(),
          uni                     = oCandidate.uni.toLowerCase(),
          score                   = mcQuaigParser(oCandidate["mcQuaig-score"]),
		  likertScale             = oCandidate['likert-scale'],
          currentPosition         = oCandidate['current-position'].toLowerCase(),
          wantedPosition          = oCandidate['wanted-position'].toLowerCase(),     
          lastSalary              = oCandidate['last-salary'],
          expectedSalary          = oCandidate['expected-salary'],
          interviewer             = oCandidate.interviewer.toLowerCase(),
		  dataEnterer             = oCandidate['data-enterer'].toLowerCase(),
          fieldOfStudy            = oCandidate['field-of-study'].toLowerCase(),
          //We first turn the string into all lower case. We then split the string by the commas, and finally we get rid of whitespaces at the end and beinning of entries
          techUsed                = oCandidate['tech-used'].toLowerCase().split(",").map((techUsed)=> {return techUsed.trim();}),
          aInterviewsInfo         = []
          dateOfInterviewUs       = oCandidate['date-of-interview-us'],
          phoneNumber             = oCandidate['phone-number'],
          languages               = oCandidate.languages.toLowerCase().split(",").map((language)=>{return language.trim();}),
          experience              = oCandidate.experience,
          folderName              = oCandidate['folder-name'].toLowerCase(),
		  keyWords                = oCandidate['key-words'].toLowerCase().split(",").map((keyWord)=>{return keyWord.trim();})
		  notes                   = oCandidate.notes.toLowerCase(),
          aCvURLs                 = aCvURLs; 
    console.log(oCandidate.dateOfInterviewUs);
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
         phoneNumber      ,
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
