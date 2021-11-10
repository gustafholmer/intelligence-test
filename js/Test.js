window.Test = (function ()  {
    "use strict";
    // questions for test 1.
    var questionsObject = {"questionArray1": ["Land of happiness",
        "What does the word Eldorado mean?",
        "Sword", "Land of happiness", "Interest"],
    "questionArray2": ["Traditional story", "What does the word Legend mean?",
        "Traditional story", "Coin", "Joke"],
    "questionArray3": ["Secret plans", "What does the word Conspire mean?",
        "Secret plans", "A bird type", "Food dish"],
    "questionArray4": ["A type of boat", "What does the word Galley mean?",
        "A type of airplane", "Wood", "A type of boat"],
    "questionArray5": ["A form of literature", "What does the word Poem mean?",
        "A form of literature", "A type of mood", "A country"]
    };
    var initTestSessionCounter = 0;
    var resetTestVar;
    var savedScoreFromTests = 0; // saves the final score
    var text2 = document.createTextNode("Welcome!");
    var text = document.createTextNode("You will be taking tests to measure your intelligence. " +
    " After every subtest you will get a result." +
    " And after all the tests have been done, you will get a result. Click to begin test...");
    // This is for starting textbox
    var content = document.createElement("div");
    var par = document.createElement("p");
    var header = document.createElement("h3");

    content.classList.add("content");
    par.appendChild(text);
    header.appendChild(text2);
    content.appendChild(header);
    content.appendChild(par);
    document.body.appendChild(content);
    content.addEventListener("click", function() {
        document.body.removeChild(content);
        initTestSession();
    });

    // drives the programme
    function initTestSession() {
        if (initTestSessionCounter === 0) {
            resetTestVar = new window.questions(questionsObject); // takes questions object as input
            initTestSessionCounter++;
        } else if (initTestSessionCounter === 1) {
            resetTestVar = new window.fizzBuzz(savedScoreFromTests);
            initTestSessionCounter++;
        } else if (initTestSessionCounter === 2) {
            resetTestVar = new window.memory(savedScoreFromTests);
            initTestSessionCounter++;
        } else if (initTestSessionCounter === 3) {
            new window.finalResultBox(savedScoreFromTests); // shows final score
        }
    }

    // function for reseting the test. Is connected to ever sub test's reset function
    function reset() {
        if (initTestSessionCounter >= 1 && document.getElementById("currentTest") != null) {
            document.body.removeChild(document.getElementById("currentTest"));
            resetTestVar.reset();
        // makes it possible to reset test at sub tests result box
        } else if (initTestSessionCounter >= 1 && document.getElementById("resultBox") != null) {
            document.body.removeChild(document.getElementById("resultBox"));
            resetTestVar.reset();
        } else {
            console.log("You are not in a test");
        }
    }

    // is connected to ResultBox.js as this function is called from there
    function addScore(scoreInput) {
        savedScoreFromTests += scoreInput;
    }

    return {
        initTestSession: initTestSession,
        reset: reset,
        savedScoreFromTests: savedScoreFromTests,
        addScore: addScore
    };
})();
