// Declarations

const deck = document.querySelector('.deck');
let moves = 0;
let toggledCards = [];
let clockOff = true;
let time = 0;
let clockId;
let matches = 0;
const totalPairs = 8;

// Functions

function toggleCard(card) {
  card.classList.toggle('open');
  card.classList.toggle('show');
}

function isClickValid(clickTarget) {
  return (
    clickTarget.classList.contains('card') &&
    !clickTarget.classList.contains('match') &&
    toggledCards.length < 2 &&
    !toggledCards.includes(clickTarget)
  );
}

function addToggleCard(clickTarget) {
  toggledCards.push(clickTarget);
}

function checkForMatch() {
  if (
    toggledCards[0].firstElementChild.className ===
    toggledCards[1].firstElementChild.className
  ) {
    toggledCards[0].classList.toggle('match');
    toggledCards[1].classList.toggle('match');
    toggledCards = [];
    matches++;
  }
    else {
      setTimeout(() => {
        toggleCard(toggledCards[0]);
        toggleCard(toggledCards[1]);
        toggledCards = [];
      }, 600);
    };
  }

function moveCount() {
  moves++;
  const movesText = document.querySelector('.moves');
  movesText.innerHTML = moves;
}

function hideStar() {
  const starList = document.querySelectorAll('.stars li');
  for (star of starList) {
    if (star.style.display !== 'none') {
      star.style.display = 'none';
      break;
    }
  }
}

function getStars() {
  stars = document.querySelectorAll('.stars li');
  starCount = 0;
  for (star of stars) {
    if (star.style.display !== 'none') {
      starCount++;
    }
  }
  return starCount;
}

function checkScore() {
  if (moves === 15 || moves === 22) {
    hideStar();
  }
}

function displayTime() {
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;
  const clock = document.querySelector('.clock');
  clock.innerHTML = time;
  if (seconds < 10) {
    clock.innerHTML = `${minutes}:0${seconds}`;
  } else {
    clock.innerHTML = `${minutes}:${seconds}`;
  }
}

function startClock() {
  clockId = setInterval(() => {
    time++;
    displayTime();
  }, 1000);
}

function stopClock() {
  clearInterval(clockId);
}

function toggleModal() {
  const modal = document.querySelector('.modal-background');
  modal.classList.toggle('hide');
}

function writeModalSummary() {
  const timeSum = document.querySelector('.modal-time');
  const clockTime = document.querySelector('.clock').innerHTML;
  const movesSum = document.querySelector('.modal-moves');
  const starsSum = document.querySelector('.modal-stars');
  const stars = getStars();

  timeSum.innerHTML = `Time = ${clockTime}`;
  movesSum.innerHTML = `Moves = ${moves}`;
  starsSum.innerHTML = `Stars = ${stars}`;
}

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

function shuffleDeck() {
  const cardsToShuffle = Array.from(document.querySelectorAll('.deck li'));
  const shuffledCards = shuffle(cardsToShuffle);
  for (card of shuffledCards) {
    deck.appendChild(card);
  }
}

function resetClockTime() {
  stopClock();
  clockOff = true;
  time = 0;
  displayTime();
}

function resetMoves() {
  moves = 0;
  document.querySelector('.moves').innerHTML = moves;
}

function resetStars() {
  stars = 0;
  const starList = document.querySelectorAll('.stars li');
  for (star of starList) {
    star.style.display = 'inline';
  }
}

function resetCards() {
  const cards = document.querySelectorAll('.deck li');
  for (let card of cards) {
    card.className = 'card';
  }
}

function resetGame() {
  resetClockTime();
  resetMoves();
  resetStars();
  resetCards();
  shuffleDeck();
  matches = 0;
}

function replayGame() {
  resetGame();
  toggleModal();
}

function gameOver() {
  stopClock();
  writeModalSummary();
  toggleModal();
  resetGame();
}

// Execution

document.querySelector('.modal-cancel').addEventListener('click', () => {
  toggleModal();
});

document.querySelector('.modal-replay').addEventListener('click', replayGame);

document.querySelector('.restart').addEventListener('click', resetGame);

document.querySelector('.modal-close').addEventListener('click', toggleModal);

shuffleDeck();

// Gameplay; timer started, cards flipped/checked for match, moves counted, score updated, win confirmed

deck.addEventListener('click', event => {
  const clickTarget = event.target;
  if (isClickValid(clickTarget)) {
    if (clockOff) {
      startClock();
      clockOff = false;
    }
    toggleCard(clickTarget);
    addToggleCard(clickTarget);
    if (toggledCards.length === 2) {
      checkForMatch(clickTarget);
      moveCount();
      checkScore();
    }
    if (matches === totalPairs) {
      gameOver();
    }
  }
});


/*
 * Create a list that holds all of your cards
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 *set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
