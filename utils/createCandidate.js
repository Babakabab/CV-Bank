Candidate  = require('../models/candidate');
function createCandidate(req,cvURLs,cb){
    const cvURL                  = cvURLs 
		  firstName              = req.body['first-name'],
		  lastName               = req.body['last-name'],
		  score                  = req.body.score,
		  degree                 = req.body.degree,
		  salary                 = req.body.salary,
		  position               = req.body.position,
		  uni                    = req.body.uni,
		  keyWords               = req.body['key-words'],
		  folderName             = req.body['folder-name'],
          email                  = req.body.email,
          gender                 = req.body.gender,
		  interviewer            = req.body.interviewer,
		  dataEnterer            = req.body['data-enterer'],
		  numberOfInterviews     = req.body['number-of-interviews'],
		  dateOfInterviewUs      = req.body['date-of-interview-us'],
		  dateOfInterviewFirm    = req.body['date-of-interview-firm'],
          likertScale            = req.body['likert-scale'],
          targetFirmList         = req.body['all-firms-list'].toLowerCase().split(","),
          notes                  = req.body.notes;
          
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
        cvURL              :  cvURL,
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