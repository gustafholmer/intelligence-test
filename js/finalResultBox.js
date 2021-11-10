window.finalResultBox = (function (pScore)  {
    "use strict";

    /*
    *
    *
    * Creates a text box with the final test result.
    * This module is used at the end of Test.js to show final score.
    *
    *
    */
    var maxScore = 27;
    var text2 = document.createTextNode("You have completed all the tests!");
    var text = document.createTextNode("Your final score is: " + pScore);
    var text3 = document.createTextNode("The maximum score is: "+ maxScore);
    var text4 = document.createTextNode("According to our intelligence formula" +
        " your score is: " + intFormula() + " of 46.45");
    var text5 = document.createTextNode("Thank you for participating!");
    var content = document.createElement("div");
    var par = document.createElement("p");
    var par2 = document.createElement("p");
    var par3 = document.createElement("p");
    var par4 = document.createElement("p");
    var header = document.createElement("h3");

    content.classList.add("content");
    content.style.pointerEvents = "none";
    document.body.appendChild(content);
    par.appendChild(text);
    par2.appendChild(text3);
    par3.appendChild(text4);
    par4.appendChild(text5);
    content.style.height = "200px";

    function intFormula() {
        var formulaVar = (1.35 * pScore) + 10;

        return formulaVar.toString();
    }

    header.appendChild(text2);
    content.appendChild(header);
    content.appendChild(par);
    content.appendChild(par2);
    content.appendChild(par3);
    content.appendChild(par4);
});
