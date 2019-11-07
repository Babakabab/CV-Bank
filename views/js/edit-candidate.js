 window.addEventListener("load", myInit, true);
        async function myInit() {
            highlighter();
            let id = window.location.href.split("/")[4];

            //get the candidate info to show when the user toggles between the suggested edit and the candidate info
            fetch(`/candidate/${id}`)
                .then((response) => { return response.json() })
                .catch(err => console.log(err))
                .then((candidate) => {
                    window.candidate = candidate;
                    if (window.candidate.sDateOfInterviewUs) {
                        window.candidate.sDateOfInterviewUs = dateToStringParser(candidate.dateOfInterviewUs);
                        console.log(window.candidate.sDateOfInterviewUs);
                    }

                    if (window.candidate.aParsedInterviewDates) {

                        window.candidate.aParsedInterviewDates = window.candidate.aInterviewsInfo.map(
                            (interviewInfo) => { dateToStringParser(interviewInfo.interviewDate) });
                        console.log(window.candidate.aParsedInterviewDates);
                    }


                });
            fetch(`/editsuggestion/${id}`)
                .then((response) => { return response.json(); })
                .catch(err => console.log(err))
                .then((editSuggestion) => {
                    window.editSuggestion = editSuggestion;
                    window.editSuggestion.sDateOfInterviewUs = dateToStringParser(editSuggestion.dateOfInterviewUs);
                    if (window.editSuggestion.aParsedInterviewDates) {

                        window.editSuggestion.aParsedInterviewDates = window.editSuggestion.aInterviewsInfo.map(
                            (interviewInfo) => {
                                dateToStringParser(interviewInfo.interviewDate)
                            });
                    }

                    console.log(window.editSuggestion);
                });

            // console.log("candidate",window.candidate);
            //Get the edit suggestion made by the JR consultant
            // fetch(`editsuggestion/${id}`)
            // .then((response)=>{return response.json()})
            // .then((editSuggestion)=>window.editSuggestion= editSuggestion)
            // .catch((error)=>{console.log(error)});


        };
        function highlighter() {
            const inputElements = document.getElementsByTagName("input");
            for (index in inputElements) {
                if (inputElements[index].value) {

                    inputElements[index].setAttribute("onchange", "removeHighlighter(this)");
                    inputElements[index].style = "color:#9e1f1f;     background: #dfe4ea;";
                }
            }
        }
        function removeHighlighter(e) {
            e.style.color = "black";
        }


        function readURL(input) {
            if (input.files && input.files[0]) {
                var reader = new FileReader();

                reader.onload = function (e) {
                    $('#uploaded-img').attr('src', e.target.result)
                        .css({ "width": "80%", "height": "auto", "display": "block" });

                }

                reader.readAsDataURL(input.files[0]);
            }
        }

        $("#uploader").change(function () {
            readURL(this);
        });
        const firmList = [];
        function addFirm(e) {

            e.preventDefault();
            const name = document.getElementById("firmList").value;
            firmList.push(name);
            if (name) {
                $("#listed-firms").append(`<span id="${name}" class="single-firm">${name}
					<span onclick="deleteFirm(this)" style="margin-left:10px; cursor:pointer;">x</span></span>`);
            }
            $("#firm-list").val("");
            // console.log("firmlist", firmList);

        }
        function deleteFirm(element) {
            const id = $(element).parent().attr('id');
            const index = firmList.indexOf(id);
            if (index > -1) {
                firmList.splice(index, 1);

            }

            // console.log('firmlist', firmList);
            $(element).parent().remove();


        }
        function deleteInterview(element) {
            console.log(element);
            $(element).parent().parent().remove();

        }
        function addFirmInfoInputs(element) {
            element.preventDefault();

            interviewCount = parseInt(document.getElementById("interviewCount").value);
            interviewInputAreasCount = document.getElementById("interviewInfo").childElementCount;
            console.log(interviewCount);
            if (interviewCount > 6) {
                alert('The total number of interviews can not be over 6');
            }
            else {
                if (interviewCount && !interviewInputAreasCount) {
                    for (let i = 0; i < interviewCount; i++) {


                        $("#interviewInfo").append(`<div class="form-info "><div class="form-entity left-box">
													<label for="firmName${i}">
																	Firm Name:
													<input type="text" name="firmName${i}" placeholder="Firm Name" class="form-control">
												</label>

											</div>
											<div class="form-entity right-box">
												<label for="interviewDateFirm${i}">Date of Interview:
													<input type="date" name="intervieDateFirm${i}" class="form-control">
												</label>
												
                                                <img src='/xicon.jpeg' style="height:25px; width:25px; cursor:pointer;" onclick="deleteInterview
                                    (this)">
											</div></div>`);
                    }
                }

                else if (interviewInputAreasCount < interviewCount) {
                    for (let i = 0; i < interviewCount - interviewInputAreasCount; i++) {


                        $("#interviewInfo").append(`<div class="form-info "><div class="form-entity left-box">
													<label for="firmName${i}">
																	Firm Name:
													<input type="text" name="firmName${i}" placeholder="Firm Name" class="form-control">
												</label>

											</div>
											<div class="form-entity right-box">
												<label for="interviewDateFirm${i}">Date of Interview:
													<input type="date" name="interviewDateFirm${i}" class="form-control">
												</label>
												<!--<span style="font-size:em; color:red">DELETE</span>-->
                                                <img src='/xicon.jpeg' style="height:25px; width:25px; cursor:pointer;" onclick="deleteInterview
                                    (this)" >
											</div></div>`);
                    }
                }
            }
        }
        function phoneNumberValidator(phoneNumber) {
            //We only want to validate it if the field has been filled
            if (phoneNumber) {
                let re = /^\d{11}$/;
                return re.test(phoneNumber);
            }
            //if the user hasn't filled in the field, leave him alone lol
            else {

                return true;
            }
        }
        function emailValidator(email) {
            //We only want to validate it if the field has been filled

            if (email) {
                let re = /\S+@\S+\.\S+/;
                return re.test(email);
            }
            //if the user hasn't filled in the field, leave him alone lol
            else {
                return true;
            }
        }
        const mcQuaigParser = (score) => {
            if (score === "NA" || score == "" || score == undefined) {
                const parsedScore = { wrong: 0, empty: 0, correct: 0 };
                return parsedScore;

            }
            else {
                const aScores = score.split("-");
                const parsedScore = { wrong: aScores[0], empty: aScores[1], correct: aScores[2] };
                return parsedScore;
            }
        }
        function saveCandidate(e) {
            emailValidator(document.getElementById('email').value);
            e.preventDefault();
            let form = document.getElementById('candidate-data'),
                formData = new FormData(form),
                id = window.location.href.split("/")[4];
            //add ID to the formdata to be able to query the candidate that we want to edit
            formData.append('id', id);
            formData.append('lastModified', new Date());
            let isValidated = false;
            if (document.getElementById('firstName').value && document.getElementById('lastName').value && document.getElementById('gender').value) {
                isValidated = true;
            }
            // if (isValidated && emailValidator(document.getElementById('email').value) && phoneNumberValidator(document.getElementById('phone-number').value)) {

            // for (let pair of formData.entries()) {
            //     console.log(pair[0] + "-" + pair[1]);
            // }
            fetch(`/candidate/${id}/edit`, {
                method: 'PUT',
                header: { "Content-Type": "multipart/form-data" },
                body: formData

            })
                .then(location.reload())
                .catch(err => console.log(err));

            // }
            // else if (!isValidated) {
            //     alert('please enter all fields necessary');
            // }
            // else if (!emailValidator(document.getElementById('email').value)) {
            //     alert('Please enter a valid E-mail address');
            // }
            // else if (!phoneNumberValidator(document.getElementById('phone-number').value)) {
            //     alert('Please enter a valid phone number');
            // }




        }
        const dateToStringParser = function (date) {
            date = new Date(date);
            let month = date.getMonth() > 9 ? (date.getMonth() + 1).toString() : "0" + (date.getMonth() + 1),
                day = date.getDate() > 9 ? date.getDate().toString() : "0" + date.getDate()
            year = date.getFullYear();
            return year + "-" + month + "-" + day;



        }

        function backToOriginal(element) {
            //console.log(element);
            let inputElement = element.parentNode.parentNode.children[0]
            let inputElementName = inputElement.name;

            inputElement.value = window.candidate[inputElementName];
            if (window.editSuggestion[inputElementName] != window.candidate[inputElementName]) {
                inputElement.style.color = "black";

            }


            //console.log(infoName);
        }
        function backToOriginalScore(element) {
            const infoName = element.parentNode.parentNode.children[0].name,
                // read each field of the score and add them together to shape the final score
                score = window.candidate['score'].wrong
                    + " " + window.candidate['score'].empty
                    + " " + window.candidate['score'].correct;

            element.parentNode.parentNode.children[0].value = score;


        }
        function backToOriginalDateOfInterviewUs(element) {
            const target = element.parentNode.parentNode.children[0],
                inputName = element.parentNode.parentNode.children[0].name,
                date = window.candidate['sDateOfInterviewUs'];
            console.log("in the function,", date);
            target.value = date;

        }
        function showEditedVersionDateOfInterviewUs(element) {
            const target = element.parentNode.parentNode.children[0],
                inputName = element.parentNode.parentNode.children[0].name,

                date = window.editSuggestion['sDateOfInterviewUs'];

            target.value = date;
        }
        function backToOriginalDateOfInterviewFirm(element) {
            const target = element.parentNode.parentNode.children[0],
                inputName = element.parentNode.parentNode.children[0].name,
                date = window.candidate['sDateOfInterviewUs'];

            target.value = date;

        }
        function showEditedVersionDateOfInterviewFirm(element) {
            const target = element.parentNode.parentNode.children[0],
                inputName = element.parentNode.parentNode.children[0].name,
                date = window.candidate['sDateOfInterviewUs'];
            target.value = date;
        }
        function showEditedVersion(element) {

            const inputElement = element.parentNode.parentNode.children[0];
            //find the name of the text input so we know which one of the candidate info to call

            const inputElementName = inputElement.name;
            //set the value of the text input to the candidate info
            inputElement.value = window.editSuggestion[inputElementName];
            if (window.editSuggestion[inputElementName] != window.candidate[inputElementName]) {
                inputElement.style.color = "#9e1f1f";

            }
        }
        //Since McQuaig score is an object, we need a different function to set it's value
        function showEditedVersionScore(element) {
            const infoName = element.parentNode.parentNode.children[0].name,
                // read each field of the score and add them together to shape the final score
                score = editSuggestion['score'].wrong
                    + " " + editSuggestion['score'].empty
                    + " " + editSuggestion['score'].correct;
            element.parentNode.parentNode.children[0].value = score;


        }
        //for the arrays, we need a different type of function to join the entries and make a string
        function showEditedVersionArray(element) {

        }
        function suggestEdit(e) {
            emailValidator(document.getElementById('email').value);
            e.preventDefault();
            let form = document.getElementById('candidate-data'),
                formData = new FormData(form),
                id = window.location.href.split("/")[4],
                aCvURLs = [];
            formData.append('id', id);
            formData.append('lastModified', new Date());
            for (let cvLink of document.getElementById("cvURLs").children) {
                aCvURLs.push(cvLink.href);
            }
            console.log(aCvURLs);
            formData.append('aCvURLs', aCvURLs);
            let isValidated = false;
            if (document.getElementById('firstName').value && document.getElementById('lastName').value && document.getElementById('gender').value) {
                isValidated = true;
            }
            if (emailValidator(document.getElementById('email').value)) {


                //&& phoneNumberValidator(document.getElementById('phone-number').value
                fetch(`/candidate/${id}/suggestedit`,
                    {
                        method: 'POST',
                        header: { "Content-Type": "multipart/form-data" },
                        body: formData

                    })

                    .then(function (response) {
                        console.log(response);
                        alert("Your edit suggestion has been sent and is now pending approval!");
                        window.location = "/";
                    })
                // .then((response)=>{return response.json()})
                // .then((candidate)=>{let oCandidate=JSON.stringify(candidate)})
                // .catch(err => console.log(err));

            }
            // else if (!isValidated) {
            //     alert('please enter all fields necessary');
            // }
            else if (!emailValidator(document.getElementById('email').value)) {
                alert('Please enter a valid E-mail address');
            }
            // else if (!phoneNumberValidator(document.getElementById('phone-number').value)) {
            //     alert('Please enter a valid phone number');
            // }




        }
        function saveChanges(e) {
            emailValidator(document.getElementById('email').value);
            e.preventDefault();
            let form = document.getElementById('candidate-data'),
                formData = new FormData(form),
                id = window.location.href.split("/")[4],
                aCvURLs = [];
            //Add the candidate id to the formData
            formData.append('id', id);
            formData.append('lastModified', new Date());
            for (let cvLink of document.getElementById("cvURLs").children) {
                aCvURLs.push(cvLink.href);
                //console.log(cvURL);
            }
            console.log(aCvURLs);
            formData.append('aCvURLs', aCvURLs);
            let isValidated = false;
            if (document.getElementById('firstName').value
                && document.getElementById('lastName').value
                && document.getElementById('gender').value) {
                isValidated = true;
            }
            if (emailValidator(document.getElementById('email').value)) {


                //console.log(document.getElementById("cvURLs").children);
                //&& phoneNumberValidator(document.getElementById('phone-number').value
                for (let pair of formData.entries()) {
                    console.log(pair[0] + "-" + pair[1]);
                }


                fetch(`/editsuggestion/${id}/delete`,
                    {
                        method: 'DELETE'

                    })
                    .then((res) => {
                        return fetch(`/candidate/${id}/approve`,
                            {
                                method: 'PUT',
                                header: { "Content-Type": "multipart/form-data" },
                                body: formData

                            })
                    })
                    .then(function (response) {
                        console.log(response);
                        alert("Your changes have been made to the candidate!");
                        window.location = "/";

                    })
                    .catch((err) => { console.log(err) });



                // .then((response)=>{return response.json()})
                // .then((candidate)=>{let oCandidate=JSON.stringify(candidate)})
                // .catch(err => console.log(err));

            }
            // else if (!isValidated) {
            //     alert('please enter all fields necessary');
            // }
            else if (!emailValidator(document.getElementById('email').value)) {
                alert('Please enter a valid E-mail address');
            }
            // else if (!phoneNumberValidator(document.getElementById('phone-number').value)) {
            //     alert('Please enter a valid phone number');
            // }


        }