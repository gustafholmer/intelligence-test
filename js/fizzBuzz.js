window.fizzBuzz = (function (scoreInput)  {
    "use strict";

    var sessionCounter = 0;
    var finalScore = scoreInput;
    var scoreForReset = scoreInput;
    var maxScore = 3;
    var startNumber;
    var stopNumber;
    var savedData = [];
    var resetSession = false;
    var savedOrderForArray = [];
    // the starting box with the text info
    var text2 = document.createTextNode("FizzBuzz");
    var text = document.createTextNode("Choose the alternative which continues the series. " +
        "Click to start...");
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

    // is used to genereate random numbers
    function getRandomIntInclusive(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    // takes the start and stop values for a sequence of numbers. Creates a series of FizzBuzz.
    function fizzBuzzSorter(start, stop) {
        var resultArray = [];
        var dif = stop - start;

        for (var i = 0; i <= dif; i++) {
            if (((start + i) % 3 === 0) && ((start + i) % 5 === 0)) {
                resultArray.push("FizzBuzz");
            } else if ((start + i) % 3 === 0) {
                resultArray.push("Fizz");
            } else if ((start + i) % 5 === 0) {
                resultArray.push("Buzz");
            } else {
                resultArray.push((start + i));
            }
        }
        return resultArray;
    }

    // Restarts the subtest but makes it not start with infobox about the test
    function reset() {
        sessionCounter = 0;
        finalScore = scoreForReset;
        resetSession = true;
        initTest();
    }

    // saves the order so it can be used if reset.
    function saveDataIfReset(startInput, stopInput) {
        var arrayPair = [startInput, stopInput];

        savedData.push(arrayPair);
    }

    // Goes through the array with the sequences.
    function initTest() {
        if (sessionCounter === 0) {
            if (resetSession) { // uses the previous data
                fizzBuzzSession(fizzBuzzSorter(savedData[0][0], savedData[0][1]), 0);
            } else {
                startNumber = getRandomIntInclusive(1, 100);
                stopNumber = startNumber + 5;
                saveDataIfReset(startNumber, stopNumber);
                fizzBuzzSession(fizzBuzzSorter(startNumber, stopNumber), 0);
            }
        } else {
            new window.resultBox("FizzBuzz", (finalScore-scoreForReset), maxScore);
        }
    }

    // mixes the order of the array so it can be printed out as boxes in fizzBuzzSession
    function mixArray(wInput) {
        var possibleWords = ["FizzBuzz", "Buzz", "Fizz", stopNumber];
        var returnArray = [];

        possibleWords.sort(() => Math.random() - 0.5);

        for (var i = 0; i < possibleWords.length; i++) {
            if (possibleWords[i] === wInput) {
                returnArray.push(possibleWords);
            } else if (!returnArray.includes(possibleWords[i])) {
                returnArray.push(possibleWords[i]);
            }
        }
        for (var i2 = 0; i2 < returnArray.length; i2++) {
            if (returnArray[i2] != wInput) {
                returnArray.splice(i2, 1);
                break;
            }
        }
        return returnArray;
    }

    // draws upp the text boxes.
    function fizzBuzzSession(seqInput, whichSession) {
        var seq = seqInput;
        var rightAnswer = seq.splice(5, 1, "?");
        var content = document.createElement("div");
        var arrayWithOrder;

        // this part is for reset session
        if (resetSession) {
            arrayWithOrder = savedOrderForArray[whichSession];
        } else {
            arrayWithOrder = mixArray(rightAnswer);
            if (!savedOrderForArray.includes(arrayWithOrder)) {
                savedOrderForArray.push(arrayWithOrder);
            }
        }

        document.body.appendChild(content);
        content.classList.add("questionBoxArea");
        content.id = "currentTest";

        for (var i = 0; i < 4; i++) {
            var temp = document.createElement("div");

            temp.className = "questionBox";

            if (i === 0) { // the top box with the series in
                var text = document.createTextNode("What choice continues the series?");
                var text2 = document.createTextNode(seq.join(", "));
                var par = document.createElement("p");
                var par2 = document.createElement("p");

                temp.style.background = "#BDEF1A";
                temp.style.cursor = "default";
                temp.style.height = "60px";
                par.appendChild(text);
                par2.appendChild(text2);
                temp.appendChild(par);
                temp.appendChild(par2);
            } else {
                temp.innerHTML = arrayWithOrder[i-1];
                temp.addEventListener("click", function() { // adds click event to the choice boxes
                    var divs = document.querySelectorAll('div'), i;
                    var pressedAnswer = event.target.innerHTML;
                    var temp2 = document.createElement("div");

                    if (pressedAnswer === rightAnswer.toString()) {
                        sessionCounter++;
                        finalScore += 3;
                        temp.style.cursor = null;
                    } else {
                        sessionCounter++;
                        temp.style.cursor = null;
                    }

                    console.log("Player score: " + finalScore);

                    // marks the boxes green or red depending on answer
                    for (i = 0; i < divs.length; ++i) {
                        if (divs[i].classList.contains("questionBox")) {
                            divs[i].style.pointerEvents = "none";
                        }
                        if (divs[i].innerHTML === rightAnswer.toString()) {
                            divs[i].style.background = "green";
                        } else if (divs[i].innerHTML === pressedAnswer) {
                            divs[i].style.background = "red";
                        }
                    }

                    // creates a box if clicked, takes the user to next step
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
