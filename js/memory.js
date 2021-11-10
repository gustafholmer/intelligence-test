window.memory = (function (scoreInput)  {
    "use strict";

    var okToClick = false;
    var finalScore = scoreInput;
    var scoreForReset = scoreInput;
    var maxScore = 9;
    var sessionCounter = 0;
    var checkOrderList = [];
    var listCounter = 0;
    var counterForBk = 0;
    var tempInterval;
    var flagDivArray = ['<div class="franceFlag flag">\n' +
    '<div class="francePart1"></div><div class="francePart2"></div></div>',
    '<div class="swedenFlag flag">\n' +
        '<div class="swedenPart1"></div><div class="swedenPart2"></div></div>',
    '<div class="germanyFlag flag">\n' +
    '<div class="germanyPart1"></div><div class="germanyPart2"></div></div>',
    '<div class="norwayFlag flag">\n' +
        '<div class="norwayPart1"></div><div class="norwayPart2"></div>\n' +
        '<div class="norwayPart3"></div><div class="norwayPart4"></div></div>'];
    // the starting box with the text info
    var text2 = document.createTextNode("Memory");
    var text = document.createTextNode("You will for five seconds be shown nine flags." +
        " After the time is up the flags will be fliped. Now you need to click on the right" +
        " flag according to the list to the left side." +
        " You get one point for every correctly choosen flag." +
        " The test is over when all flags been clicked or" +
        " if you guess is incorrect. Click to start...");
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
        clearInterval(tempInterval);
        sessionCounter = 0;
        finalScore = scoreForReset;
        okToClick = false;
        checkOrderList = [];
        listCounter = 0;
        counterForBk = 0;
        initTest();
    }

    function initTest() {
        if (sessionCounter === 0) {
            flagSession();
            sessionTimer();
            sessionCounter++;
        } else {
            new window.resultBox("Memory", (finalScore-scoreForReset), maxScore);
        }
    }

    // adds the flag components to grey background box
    function addFlagToGreyBox(boxInput, htmlInput) {
        boxInput.innerHTML = htmlInput;
    }

    function flagSession() {
        var content = document.createElement("div");
        var marginTopVar = -30; // öka med 125px efter tre iterationer
        var marginLeftVar = 360;  // öka raden med 175px
        var flagArrayIndex = 0;

        document.body.appendChild(content);
        content.id = "currentTest";
        content.classList.add("questionBoxArea");

        for (var i = 0; i < 9; i++) {
            var flagBk = document.createElement("div");

            flagBk.classList.add("flagBackground");

            // styles the flag background's position
            if (i < 3) {
                flagBk.style.marginTop = marginTopVar + "px";
                flagBk.style.marginLeft = (marginLeftVar + (175 * i)) + "px";
            } else if (i >= 3 && i < 6) {
                flagBk.style.marginTop = (marginTopVar + 125) + "px";
                flagBk.style.marginLeft = (marginLeftVar + (175 * (i-3))) + "px";
            } else if (i >= 6) {
                flagBk.style.marginTop = (marginTopVar + 250) + "px";
                flagBk.style.marginLeft = (marginLeftVar + (175 * (i-6))) + "px";
            }

            if (flagArrayIndex < 4) {
                addFlagToGreyBox(flagBk, flagDivArray[flagArrayIndex]);
                flagArrayIndex++;
            } else {
                flagArrayIndex = 0;
                addFlagToGreyBox(flagBk, flagDivArray[flagArrayIndex]);
                flagArrayIndex++;
            }
            flagBk.addEventListener("click", function() {
                if (okToClick) {
                    var pressedAnswer = event.target;
                    var checkChildren = pressedAnswer.childNodes;
                    var tempWordToCheck = (checkChildren[0].classList[0]).replace("Flag", "");
                    var savedList = document.getElementsByClassName("timerBox");
                    var savedList2 = document.getElementsByClassName("flagBackground");

                    if (checkOrderList[0].toUpperCase() == tempWordToCheck.toUpperCase()) {
                        finalScore += 1;
                        counterForBk += 1;
                        checkOrderList.shift();
                        savedList[listCounter].style.backgroundColor = "#3eef3b";
                        listCounter++;
                        pressedAnswer.style.pointerEvents = "none";
                        pressedAnswer.style.zIndex = -2;
                        pressedAnswer.style.backgroundColor = "#3eef3b";

                        if (counterForBk < 9) {
                            savedList[listCounter].style.backgroundColor = "#C1B8B8";
                        } else if (counterForBk === 9) {
                            createEndingBox();
                        }
                    } else {
                        pressedAnswer.style.zIndex = -2;
                        pressedAnswer.style.backgroundColor = "#f23c3c";
                        pressedAnswer.style.pointerEvents = "none";

                        for (var i = 0; i < savedList2.length; i++ ) {
                            savedList2[i].style.pointerEvents = "none";
                        }
                        savedList[listCounter].style.backgroundColor = "#f23c3c";
                        createEndingBox();
                    }
                    console.log("Player score: " + finalScore);
                }
            });
            content.appendChild(flagBk);
        }
    }

    function createEndingBox() {
        var content = document.getElementById("currentTest");
        var temp2 = document.createElement("div");

        // creates a box if clicked, starts the test again with initTest().
        temp2.className = "questionBox";
        temp2.style.background = "#579be5";
        temp2.style.marginTop = "auto";
        temp2.style.marginLeft = "auto";
        temp2.style.left = 0;
        temp2.style.top = "350px";
        temp2.style.position = "relative";
        temp2.innerHTML = "Click here to continue...";
        temp2.addEventListener("click", function() {
            document.body.removeChild(content);
            initTest();
        });
        content.appendChild(temp2);
    }

    // begins the timer
    function sessionTimer() {
        var content = document.getElementById("currentTest");
        var timerBox = document.createElement("div");

        timerBox.classList.add("timerBox");
        timerBox.innerHTML = 5;
        content.appendChild(timerBox);
        tempInterval = setInterval(myTimer, 1000);
        function myTimer() {
            timerBox.innerHTML -= 1;
            if (timerBox.innerHTML == 0) {
                clearInterval(tempInterval);
                content.removeChild(timerBox);
                textListOfFlags();
                okToClick = true;
            }
        }
    }

    function textListOfFlags() {
        var content = document.getElementById("currentTest");
        var flagArrayIndex = 0;
        var savedFlags = document.getElementsByClassName("flagBackground");
        var savedFlags2 = document.getElementsByClassName("flag");
        var countryArray = ["France", "Norway", "Germany", "Sweden"];

        for (var i = 0; i < 9; i++) {
            var timerBox = document.createElement("div");

            savedFlags[i].style.cursor = "pointer"; // makes it possible to click on flag
            savedFlags2[i].style.zIndex = -1; // hides the flag
            timerBox.classList.add("timerBox");
            timerBox.style.backgroundColor = "#f0f0f0";
            timerBox.style.marginTop = -30 + (40 * i) + "px";
            timerBox.style.fontSize = "20px";
            timerBox.style.paddingTop = "0.2em";

            if (flagArrayIndex < 4) {
                timerBox.innerHTML = (i + 1) + ". " + countryArray[flagArrayIndex];
                checkOrderList.push(countryArray[flagArrayIndex]);
                flagArrayIndex++;
            } else {
                flagArrayIndex = 0;
                timerBox.innerHTML = (i + 1) + ". " + countryArray[flagArrayIndex];
                checkOrderList.push(countryArray[flagArrayIndex]);
                flagArrayIndex++;
            }

            if (i === 0) {
                timerBox.style.backgroundColor = "#C1B8B8";
            }
            content.appendChild(timerBox);
        }
    }

    return {
        reset: reset
    };
});
