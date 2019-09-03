Candidate = require("./candidate");
cb        = require("../utils/cb");
const candidateDeleter = (candidateId)=>{
    Candidate.deleteOne({_id:candidateId},cb(err,result));
}

module.exports = candidateDeleter;