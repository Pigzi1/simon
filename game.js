var buttonColors = ["red", "blue", "green", "yellow"];
var rndColor;
var gamePattern = [];
var userClickPattern = [];
var level = 0;

$(document).on('keypress', function(e){
    if (level === 0) {
        nextSequence();
    }
});

function playSound(color) {
    var audio = new Audio("./sounds/" + color + ".mp3");
    audio.play();
}

function animatePress(currentColor) {
    $("#" + currentColor).addClass("pressed");
    setTimeout(function() {
        $("#" + currentColor).removeClass("pressed");
    }, 100)
}

function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] === userClickPattern[currentLevel]) {
        console.log("success");
        if (gamePattern.length === userClickPattern.length){
            setTimeout(nextSequence, 1000)
            userClickPattern = [];
        }
    }
    else {
        console.log("wrong");
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        }, 200)
        $("#level-title").text("Game Over, Press Any Key to Restart");
        var audio = new Audio("./sounds/wrong.mp3");
        audio.play();
        startOver();
    }
}

function startOver() {
    level = 0;
    gamePattern = [];
    userClickPattern = [];
}

function nextSequence() {
    level++;        
    $("#level-title").text("LEVEL " + level);
    var rndNum = Math.floor(4*Math.random());
    rndColor = buttonColors[rndNum];
    gamePattern.push(rndColor);
    $("#" + rndColor).fadeOut(100).fadeIn(100);
    playSound(rndColor);
}

$(".btn").click(function(event) {
    if (level !== 0) {
        var userChosen = event.target.id;
        userClickPattern.push(userChosen);
        playSound(userChosen);
        animatePress(userChosen);
        checkAnswer(userClickPattern.length - 1);
    }
});

