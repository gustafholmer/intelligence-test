window.resultBox = (function (typeOfGameInput, pScore, maxScore)  {
    "use strict";

    /*
    *
    *
    * Creates a text box with the test result. When box is clicked, the nest test is started.
    * This module is used at the end of every test module.
    *
    *
    */

    var text2 = document.createTextNode("Result of " + typeOfGameInput + " test");
    var text = document.createTextNode("Your score: " + pScore);
    var text3 = document.createTextNode("Max score possible on the test: " + maxScore);
    var text4 = document.createTextNode("Click to continue...");
    var content = document.createElement("div");
    var par = document.createElement("p");
    var par2 = document.createElement("p");
    var par3 = document.createElement("p");
    var header = document.createElement("h3");

    content.id = "resultBox";
    content.classList.add("content");
    document.body.appendChild(content);
    par.appendChild(text);
    par2.appendChild(text3);
    par3.appendChild(text4);
    header.appendChild(text2);
    content.appendChild(header);
    content.appendChild(par);
    content.appendChild(par2);
    content.appendChild(par3);
    content.addEventListener("click", function() {
        document.body.removeChild(content);
        window.Test.addScore(pScore);
        window.Test.initTestSession();
    });
});
