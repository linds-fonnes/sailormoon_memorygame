const gameContainer = document.getElementById("game");
let cardsChosen = [];
let cardsChosenId = [];
let cardsWon = [];
let cardsClicked = [];
let score = document.getElementById("score");
const startOverlay = document.getElementById("start-overlay");
const CARDS = [
  {
    name: "sailormoon",
    img: "images/sailormoon.png",
  },
  {
    name: "sailormercury",
    img: "images/sailormercury.png",
  },
  {
    name: "sailormars",
    img: "images/sailormars.png",
  },
  {
    name: "sailorjupiter",
    img: "images/sailorjupiter.png",
  },
  {
    name: "sailorvenus",
    img: "images/sailorvenus.png",
  },
  {
    name: "sailormoon",
    img: "images/sailormoon.png",
  },
  {
    name: "sailormercury",
    img: "images/sailormercury.png",
  },
  {
    name: "sailormars",
    img: "images/sailormars.png",
  },
  {
    name: "sailorjupiter",
    img: "images/sailorjupiter.png",
  },
  {
    name: "sailorvenus",
    img: "images/sailorvenus.png",
  },
  {
    name: "tuxedomask",
    img: "images/tuxedomask.png",
  },
  {
    name: "tuxedomask",
    img: "images/tuxedomask.png",
  },
];

class AudioController {
  constructor() {
    this.bgMusic = new Audio("themesong.mp3");
    this.bgMusic.volume = 0.4;
    this.bgMusic.loop = true;
  }
  startMusic() {
    this.bgMusic.play();
  }
}

// let overlays = Array.from(document.querySelectorAll(".overlay-text"));
// overlays.forEach((overlay) => {
//   overlay.addEventListener("click", () => {
//     overlay.classList.remove("visible");
//     let audioController = new AudioController();
//     audioController.startMusic();
//   });
// });

startOverlay.addEventListener("click", () => {
  startOverlay.classList.remove("visible");
  let audioController = new AudioController();
  audioController.startMusic();
});

// here is a helper function to shuffle an array
// it returns the same array with values shuffled
// it is based on an algorithm called Fisher Yates if you want ot research more
function shuffle(array) {
  let counter = array.length;

  // While there are elements in the array
  while (counter > 0) {
    // Pick a random index
    let index = Math.floor(Math.random() * counter);

    // Decrease counter by 1
    counter--;

    // And swap the last element with it
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}

let shuffledCards = shuffle(CARDS);

// this function loops over the array of colors
// it creates a new div and gives it a class with the value of the color
// it also adds an event listener for a click for each card
function createCards(cardArray) {
  for (let i = 0; i < cardArray.length; i++) {
    // create a new div
    const card = document.createElement("img");
    card.setAttribute("src", "images/blank.png");
    card.setAttribute("data-id", i);

    // give it a class attribute for the value we are looping over
    card.classList.add(cardArray[i].name);
    card.classList.add("front-face");

    // call a function handleCardClick when a div is clicked on
    card.addEventListener("click", flipCard);

    // append the div to the element with an id of game
    gameContainer.append(card);
  }
}

//check for matches
function checkForMatch() {
  let cards = document.querySelectorAll("img");
  const optionOneId = cardsChosenId[0];
  const optionTwoId = cardsChosenId[1];
  if (cardsChosen[0] === cardsChosen[1]) {
    cardsWon.push(cardsChosen);
  } else {
    cards[optionOneId].setAttribute("src", "images/blank.png");
    cards[optionTwoId].setAttribute("src", "images/blank.png");
  }
  cardsChosen = [];
  cardsChosenId = [];
  score.textContent = cardsClicked.length;
  if (cardsWon.length === CARDS.length / 2) {
    document.getElementById("victory-text").classList.add("visible");
    document.getElementById(
      "victory-text"
    ).textContent = `Got em all! Your score is ${cardsClicked.length}`;
    endGame();
  }
}

// TODO: Implement this function!
//flip the card
function flipCard(event) {
  // you can use event.target to see which element was clicked
  console.log("you just clicked", event.target);
  let cardId = this.getAttribute("data-id");
  cardsChosen.push(CARDS[cardId].name);
  cardsChosenId.push(cardId);
  cardsClicked.push(CARDS[cardId].name);

  this.setAttribute("src", CARDS[cardId].img);
  if (cardsChosen.length === 2) {
    setTimeout(checkForMatch, 500);
  }
}

// when the DOM loads
createCards(shuffledCards);
