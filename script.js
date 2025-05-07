
var gamePattern = [];
var userPattern = [];

var level = 0;
var userClickCounter = 0;

var currentColor = "";

var bestScore = 0;

var isKeyboardActive = true;
var isMouseActive = false;

var buttonColors = ["red", "blue", "green", "yellow"];
var randomNumber = 0;

///////////////////////////////////////////////////////////////////////////////////////////////////

$(document).on("keydown", function(){

    if(isKeyboardActive === true) {
        nextSequence();
    }

});

/////////////////////////////////////////////////////////////////////////////////////////////////// 

function nextSequence() {

    level++;
    userClickCounter = 0;
    isKeyboardActive = false;
    isMouseActive = true;
    
    $("h1").text("Simon Game");
    $("h2").text("Level " + level);

    randomNumber = Math.floor(Math.random() * 4);
    currentColor = buttonColors[randomNumber];
    gamePattern.push(currentColor);

    addEffect(currentColor);
    playSound(currentColor);

    console.log("**************************");
    console.log(gamePattern[userClickCounter]);    

}

///////////////////////////////////////////////////////////////////////////////////////////////////

$(".box").on("click", function(){

    if(isMouseActive === true) { 
          
        var clickedColor = $(this).attr("id");

        if (clickedColor != gamePattern[userClickCounter]) {

            addEffect(clickedColor);
            playSound("wrong");
            gameOver();

        } else {
            userPattern.push(clickedColor);
            userClickCounter++;

            addEffect(clickedColor);
            playSound(clickedColor);

            if (userClickCounter === level) {
                isKeyboardActive = false;
                isMouseActive = false;
                setTimeout(function() {
                    nextSequence();
                }, 1000);
            } else {                
                setTimeout(function() {
                    console.log(gamePattern[userClickCounter]); 
                }, 500);
            }
        } 

    }
        
});

///////////////////////////////////////////////////////////////////////////////////////////////////    

function gameOver() {

    gamePattern = [];
    userPattern = [];
    if(level > bestScore) {
        bestScore = level;
        $(".bestScore").text("Your Best Score: " + bestScore);
    }    
    level = 0;
    $("h1").text(" *** Game Over *** ");
    $("h2").text(" Press any key to restart ");
    isKeyboardActive = true;
    isMouseActive = false;

}

///////////////////////////////////////////////////////////////////////////////////////////////////

function addEffect(currentColor) {

    currentColor = "#" + currentColor;     
    $(currentColor).addClass("glowing");
    setTimeout(function() {
        $(currentColor).removeClass("glowing");
    }, 500);

}

///////////////////////////////////////////////////////////////////////////////////////////////////

function playSound(currentColor) {

    var audioPath = "./sounds/" + currentColor + ".mp3";
    var audio = new Audio(audioPath);
    audio.play();

}

///////////////////////////////////////////////////////////////////////////////////////////////////