Candidate  = require('./candidate');
function createCandidate(oCandidate,cvURLs,cb){
    const aCvURLs                 = [cvURLs], 
		  firstName               = oCandidate['first-name'],
		  lastName                = oCandidate['last-name'],
		  score                   = oCandidate.score,
		  degree                  = oCandidate.degree,
		  salary                  = oCandidate.salary,
		  position                = oCandidate.position,
		  uni                     = oCandidate.uni,
		  keyWords                = oCandidate['key-words'],
		  folderName              = oCandidate['folder-name'],
          email                   = oCandidate.email,
          gender                  = oCandidate.gender,
		  interviewer             = oCandidate.interviewer,
		  dataEnterer             = oCandidate['data-enterer'],
		  numberOfInterviews     = oCandidate['number-of-interviews'],
		  dateOfInterviewUs      = oCandidate['date-of-interview-us'],
		  dateOfInterviewFirm    = oCandidate['date-of-interview-firm'],
          likertScale            = oCandidate['likert-scale'],
          targetFirmList         = oCandidate['all-firms-list'].toLowerCase().split(","),
          notes                  = oCandidate.notes;
          
    Candidate.create({
        firstName          :  firstName.toLowerCase(),
        lastName           :  lastName.toLowerCase(),
        email              :  email.toLowerCase(),
        gender             :  gender.toLowerCase(),
        position           :  position.toLowerCase(),
        score              :  score.toLowerCase(),
        salary             :  salary.toLowerCase(),
        degree             :  degree.toLowerCase(),
        uni                :  uni.toLowerCase(),
        keyWords           :  keyWords.toLowerCase(),
        cvURLs             :  aCvURLs,
        folderName         :  folderName.toLowerCase(),
        interviewer        :  interviewer.toLowerCase(),
        dataEnterer        :  dataEnterer.toLowerCase(),
        dateInterviewUs    :  dateOfInterviewUs.toLowerCase(),
        dateOfInterviewFirm:  dateOfInterviewFirm.toLowerCase(),
        targetFirmList     :  targetFirmList,
        notes              :  notes.toLowerCase(),
        numberOfInterviews :  numberOfInterviews.toLowerCase(),
        likertScale        :  likertScale.toLowerCase()
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