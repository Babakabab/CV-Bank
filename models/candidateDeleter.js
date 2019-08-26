Candidate = require("../models/candidate");
const candidateDeleter = (candidateId)=>{
    Candidate.deleteOne({_id:candidateId},(err,result)=>{
        if (err){
            console.log(err);
        }
    });
}

module.exports = candidateDeleter;