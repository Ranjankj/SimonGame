let colors = ["red", "blue", "green", "yellow"];
let gamePattern = [];
let choice = 1;

// replay button
$(".replay").on("click", function () {
  location.reload();
})

// to generate random index number
function nextSequence() {
  return Math.floor(Math.random() * 4);
}


// to select color from colors array
function colorSelected() {
  return colors[nextSequence()];
}


let stage = 1;
showPattern(stage);


// async function to show the pattern with some delay
async function showPattern(stage) {
  $("h1").text(`Level ${stage}`);
  makePattern(stage);
  console.log(gamePattern);
  for (let i = 0; i < gamePattern.length; i++) {
    let col = gamePattern[i];
    await delay(1000);
    playAudio(col);
    $(`#${col}`).fadeOut(500).fadeIn(500);

  }
}




// filling the gamePattern array with random color(making pattern).
function makePattern(stage) {
  for (let i = 1; i <= stage; i++) {
    gamePattern.push(colorSelected());
  }
}




// checking if pressed btn is of correct sequence
function check(pressedBtn) {
  if (choice <= stage && pressedBtn == gamePattern[choice - 1]) {
    choice += 1;
    return true;
  } else {
    choice += 1;
    return false;
  }

}









// click function when user click on the button
$(".btn").on("click", function (event) {
  let pressedColor = event.target.classList[1];
  let flag = check(pressedColor);

  if (flag) {
    playAudio(pressedColor);
    $(`#${pressedColor}`).addClass("pressed");
    setTimeout(function () { $(`#${pressedColor}`).removeClass("pressed"); }, 100);

    // if choice >stage it means the current level is completed. so go to next level.
    if (choice > stage) {
      choice = 1;
      stage++;
      gamePattern = [];
      showPattern(stage);
    }
  } else {
    $("h1").text("game Over");
    playAudio("wrong");
    $("body").fadeOut(100).fadeIn(100);
  }
});

// playing audio of respective color
function playAudio(pressedColor) {
  if (pressedColor === "green") {
    let audio = new Audio('./sounds/green.mp3');
    audio.play();
  } else if (pressedColor === "blue") {
    let audio = new Audio("./sounds/blue.mp3");
    audio.play();
  } else if (pressedColor === "red") {
    let audio = new Audio("./sounds/red.mp3");
    audio.play();
  } else if (pressedColor === "yellow") {
    let audio = new Audio("./sounds/yellow.mp3");
    audio.play();
  } else {
    let audio = new Audio("./sounds/wrong.mp3");
    audio.play();
  }
}

// delay function to delay some in showing the pattern.
function delay(delayInms) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(2);
    }, delayInms);
  });
}

// async function wait() {
//   let delayres = await delay(1000);
// }

