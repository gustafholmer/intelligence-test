window.questions = (function (questionsInput)  {
    "use strict";

    var questions = questionsInput;
    var sessionCounter = 0;
    var finalScore = 0;
    var maxScore = 15;
    // the starting box
    var text2 = document.createTextNode("Questions");
    var text = document.createTextNode("We will now test your word knowledge. Click to start...");
    var content = document.createElement("div");
    var par = document.createElement("p");
    var header = document.createElement("h3");

    content.classList.add("content");
    document.body.appendChild(content);
    par.appendChild(text);
    header.appendChild(text2);
    content.appendChild(header);
    content.appendChild(par);
    content.addEventListener("click", function() {
        document.body.removeChild(content);
        initTest();
    });

    // Restarts the subtest but makes it not start with infobox about the test
    function reset() {
        sessionCounter = 0;
        finalScore = 0;
        initTest();
    }

    // Goes through the array with questions. sessionCounter keeps track of which question to ask.
    function initTest() {
        if (sessionCounter === 0) {
            questionsSession(questions["questionArray1"]);
        } else if (sessionCounter === 1 ) {
            questionsSession(questions["questionArray2"]);
        } else if (sessionCounter === 2) {
            questionsSession(questions["questionArray3"]);
        } else if (sessionCounter == 3) {
            questionsSession(questions["questionArray4"]);
        } else if (sessionCounter === 4) {
            questionsSession(questions["questionArray5"]);
        } else {
            new window.resultBox("Questions", finalScore, maxScore);
        }
    }

    // This functions is executed 5 times, once for every question.
    function questionsSession(questionInput) {
        var questions = questionInput;
        var rightAnswer = questions[0];
        var content = document.createElement("div");

        document.body.appendChild(content);
        content.classList.add("questionBoxArea");
        content.id = "currentTest";

        // the first item in the array is the right answer. Therefore, the array skips it.
        for (var i = 1; i < questions.length; i++) {
            var temp = document.createElement("div");

            temp.className = "questionBox";
            temp.innerHTML = questions[i];

            if (i === 1) { // the top box with the question in
                temp.style.background = "#BDEF1A";
                temp.style.cursor = "default";
            } else {
                temp.addEventListener("click", function() { // add click event to the choice boxes
                    var divs = document.querySelectorAll('div'), i;
                    var pressedAnswer = event.target.innerHTML;
                    var temp2 = document.createElement("div");

                    if (pressedAnswer === rightAnswer) {
                        sessionCounter++;
                        finalScore += 3;
                        temp.style.cursor = null;
                    } else {
                        sessionCounter++;
                        temp.style.cursor = null;
                    }

                    console.log("Player score: " + finalScore);

                    for (i = 0; i < divs.length; ++i) {
                        if (divs[i].classList.contains("questionBox")) {
                            divs[i].style.pointerEvents = "none";
                        }

                        if (divs[i].innerHTML === rightAnswer) {
                            divs[i].style.background = "green";
                        } else if (divs[i].innerHTML === pressedAnswer) {
                            divs[i].style.background = "red";
                        }
                    }

                    // creates a box if clicked, starts the test again with initTest().
                    temp2.className = "questionBox";
                    temp2.style.background = "#579be5";
                    temp2.innerHTML = "Click here to continue...";
                    temp2.addEventListener("click", function() {
                        document.body.removeChild(content);
                        initTest();
                    });
                    content.appendChild(temp2);
                });
            }
            content.appendChild(temp);
        }
    }

    return {
        reset: reset
    };
});
