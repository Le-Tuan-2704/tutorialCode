

var character = document.getElementById("character");
var block = document.getElementById("block");
var bird = document.getElementById("bird");

var user = JSON.parse(localStorage.getItem("username"));
document.getElementById("namegamer").innerHTML = user.namegamer;

var numberpoint = document.getElementById("numberpoint");
var point = 0;
numberpoint.innerHTML = point;

var onclickspace = document.getElementById("body");
onclickspace.addEventListener("keyup", function (event) {
    if (event.keyCode === 32) {
        event.preventDefault();
        jump();
    }
});

var checkpoint = 0;
function jump() {
    if (character.classList != "animate") {
        character.classList.add("animate");
    }

    setTimeout(function () {
        character.classList.remove("animate");
    }, 400);
}

function endgame() {
    block.style.animation = "none";
    block.style.display = "none";
    alert(" u lost.");
    block.style.animation = "block 2s infinite linear";
    block.style.display = "block";
    point = 0;
    numberpoint.innerHTML = point;
    checkpoint = 0;
}

var checkDead = setInterval(function () {
    var characterTop = parseInt(window.getComputedStyle(character).getPropertyValue("top"));
    var blockLeft = parseInt(window.getComputedStyle(block).getPropertyValue("left"));
    var birdLeft = parseInt(window.getComputedStyle(bird).getPropertyValue("left"));
    if (blockLeft < 30 && blockLeft > -10 && characterTop > 80) {
        endgame();
    }

    if (birdLeft < 30 && birdLeft > -10 && characterTop < 80 && characterTop > 20) {
        endgame();
    }


    if (birdLeft + 50 > blockLeft && birdLeft - 50 < blockLeft) {
        bird.style.animation = "none";
    } else {
        bird.style.animation = "fly 3s infinite linear";
    }

    if (point >= 5) {
        bird.style.display = "block";
    }

    if (point >= 10 && point < 20) {
        block.style.animation = "block 1.5s infinite linear";
    }

    if (point >= 20) {
        block.style.animation = "block 1s infinite linear";
    }

    if (blockLeft < 30 && blockLeft > -10 && characterTop < 80) {
        checkpoint++;
    }
    if (checkpoint && characterTop == 110) {
        point++;
        numberpoint.innerHTML = point;
        checkpoint = 0;
    }
}, 1);
