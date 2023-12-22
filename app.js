let sentences = [
    "If it hadn't been for Cotton Eye Joe",
    "I'd been married long time ago",
    "Where did you come from",
    "Where did you go",
    "Where did you come from",
    "Cotton Eye Joe"
]

let sentenceIndex = 0;
let letterIndex = 0;
let currentSentence = sentences[sentenceIndex]
let currentLetter = currentSentence[letterIndex]
let wrongLetters = 0;

let wordCount = sentences.join(" ").split(" ").length;
let startTime;
let endTime;
let wpm;


function logEverything(key, keyCode) {
    let pressedRightKey = key === currentLetter
    console.log({
        key,
        keyCode,
        pressedRightKey,
        sentenceIndex,
        letterIndex,
        currentSentence,
        currentLetter,
        wrongLetters,
    })

}

$(document.body).ready(function () {
    {
        $("#keyboard-upper-container").hide()
    }

})

$(document.body).keyup(function (e) {
    if (e.key === "Shift") {
        $("#keyboard-upper-container").hide()
        $("#keyboard-lower-container").show()
    }

})

$(document.body).keydown(function (e) {
    if (e.key === "Shift") {
        $("#keyboard-upper-container").show()
        $("#keyboard-lower-container").hide()
    }

})

$(document.body).keypress(function (e) {


    $('#' + e.keyCode).addClass('highlight')

})

$(document.body).keyup(function (e) {

    $('.highlight').removeClass('highlight')

})


let $sentence = $('#sentence')
$sentence.text(currentSentence)

let $targetLetter = $('#target-letter')
$targetLetter.text(currentLetter)

let $YB = $('#yellow-block')
let $YBcurrentPosition = 20


$(document).keypress(function (e) {
    let key = e.key
    let keyCode = e.keyCode
    let pressedRightKey = key === currentLetter
    logEverything(key, keyCode)
    let $feedback = $('#feedback')
    
    if (letterIndex == 1 && sentenceIndex == 0 || wrongLetters == 1 && sentenceIndex == 0){
        startTime = Date.now()
    }

    if (pressedRightKey) {
        letterIndex++;
        currentLetter = currentSentence[letterIndex]
        $YB.css('left', $YBcurrentPosition + 17.5)
        $YBcurrentPosition = $YBcurrentPosition + 17.5
        $feedback.html('&#10003;')
        $feedback.css('color', "green")
        
    }
    if (sentenceIndex === 5 && letterIndex === 14) {
        endTime = Date.now()
        let minutes = (endTime - startTime);
        minutes /= 60000
        wpm = Math.round((wordCount / minutes) - (2 * wrongLetters))
        let audio = new Audio('notSuspicious.mp3')
        audio.play()
        alert("You scored " + wpm + " Words per Minute!")
        $sentence.text("DANCE TIME")
        $targetLetter.text('lmfao')
        $feedback.html('Listen well before you click!')
        $("#restart").append('<button id="newGame">Click to Play Again!</button>');
        $("#newGame").on("click", function(){
            location.reload();
           })
        return;

    }
    if (currentLetter === undefined) {
        sentenceIndex++;
        letterIndex = 0;
        currentSentence = sentences[sentenceIndex]
        currentLetter = currentSentence[letterIndex]
        $sentence.text(currentSentence)
        $YB.css('left', 20)
        $YBcurrentPosition = 20

    } else if (!pressedRightKey) {
        wrongLetters++;
        $feedback.html('X')
        $feedback.css('color', "red")

    }

    if (letterIndex == 1 && sentenceIndex == 0 || wrongLetters == 1 && sentenceIndex == 0){
        startTime = Date.now()
    }

    $targetLetter.text(currentLetter)

})




