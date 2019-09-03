Candidate = require('./candidate');
//This function will check the type of query that was done
//Then makes a query to the database and  
function searchType(req, cb) {
    var candidateList;
    console.log(req.body);
    const queryType = req.body['search-option'];
    if (queryType == 'name') {

        //
        let name = req.body['search-query'];

        Candidate.find({ firstName: { $regex: new RegExp(name, "i") } }, function (err, candidates) {
            if (err) {
                console.log(err);
            }
            else {
                //console.log(candidates);
                candidateList = candidates;
                cb(candidates);
            }

        });
    }

    else if (queryType == 'surname') {
        console.log(req.body['search-query']);

        //retrieve the user input
        var surname = req.body['search-query'];


        //var value = req.
        Candidate.find({ lastName: { $regex: new RegExp(surname, "i") } }, function (err, candidates) {
            if (err) {
                console.log(err);
            }
            else {
                console.log(candidates);
                cb(candidates);
            }

        });
        
    }


    else if (queryType == 'salary') {
        //console.log(req.body['min-salary']);

        //retrieve the user input
        var minSalary = req.body['min-salary'];
        if (!minSalary){
            var minSalary = 0;
            }
        var maxSalary = req.body['max-salary'];

        //var value = req.
        Candidate.find({ salary: { $gt: minSalary, $lt: maxSalary } }, function (err, candidates) {
            if (err) {
                console.log(err);
            }
            else {
                console.log(candidates);
                cb(candidates);
            }
        });
    }
    else if (queryType == 'position') {

        //retrieve the user input
        var position = req.body['search-query'];


        Candidate.find({ position: { $regex: new RegExp(position, "i") } }, function (err, candidates) {
            if (err) {
                console.log(err);
            }
            else {
                console.log(candidates);
                cb(candidates);
            }

        });
    }
    else if (queryType == 'folder-name') {

        let folderName = req.body['search-query'];

        Candidate.find({ folderName: { $regex: new RegExp(folderName, "i") } }, function (err, candidates) {
            if (err) {
                console.log(err);
            }
            else {
                console.log(candidates);
                cb(candidates);
            }

        });
    }
    else if (queryType == 'gender') {

        let gender = req.body['search-query'];

        Candidate.find({ gender: gender }, function (err, candidates) {
            if (err) {
                console.log(err);
            }
            else {
                console.log(candidates);
                cb(candidates);
            }

        });
    }
    else if (queryType == 'degree') {

        let degree = req.body['search-query'];

        Candidate.find({ degree: { $regex: new RegExp(degree, "i") } }, function (err, candidates) {
            if (err) {
                console.log(err);
            }
            else {
                console.log(candidates);
                cb(candidates);
            }

        });
    }
    else if (queryType == 'interviewer') {

        let interviewer = req.body['interviewer'];

        Candidate.find({ interviewer: { $regex: new RegExp(interviewer, "i") } }, function (err, candidates) {
            if (err) {
                console.log(err);
            }
            else {
                console.log(candidates);
                cb(candidates);
            }

        });
    }
    else if (queryType == 'data-enterer') {

        let dataEnterer = req.body['search-query'];

        Candidate.find({ dataEnterer: { $regex: new RegExp(dataEnterer, "i") } }, function (err, candidates) {
            if (err) {
                console.log(err);
            }
            else {
                console.log(candidates);
                cb(candidates);
            }

        });
    }
}
module.exports = searchType;