"use strict";

// SELLECTING ELEMENT
const player0El = document.querySelector(".player--0");
const player1El = document.querySelector(".player--1");
const score0EL = document.querySelector("#score--0");
const score1El = document.getElementById("score--1");
const current0El = document.getElementById("current--0");
const current1El = document.getElementById("current--1");
const diceEl = document.querySelector(".dice");
const btnNew = document.querySelector(".btn--new");
const btnRoll = document.querySelector(".btn--roll");
const btnHold = document.querySelector(".btn--hold");
let activePlayer = 0;
let currentScore;
let scores, playing;
const init = function () {
  scores = [0, 0];
  currentScore = 0;
  playing = true;
  current0El.textContent = 0;
  current1El.textContent = 0;
  score0EL.textContent = 0;
  score1El.textContent = 0;
  diceEl.classList.add("hidden");
  player0El.classList.remove("player--winner");
  player1El.classList.remove("player--winner");
  player0El.classList.add("player--active");
  player1El.classList.remove("player--active");
};
init();

// Starting conditions
// SWITCHPLAYER
const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle("player--active");
  player1El.classList.toggle("player--active");
};

// Roll dice funtionality
btnRoll.addEventListener("click", function () {
  if (playing) {
    //1.genering a random dice roll
    const dice = Math.trunc(Math.random() * 6) + 1;

    //2.Display dice
    diceEl.classList.remove("hidden");
    diceEl.src = `./IMG/dice-${dice}.PNG`;
    console.log(dice);

    //3. Check for rolled 1
    if (dice !== 1) {
      //add dice to current score.!
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      switchPlayer();
      //switch player
    }
  }
});

btnHold.addEventListener("click", function () {
  if (playing) {
    //1.Add player's current to player's score
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];
    //.Check player's score >=100
    if (scores[activePlayer] >= 20) {
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add("player--winner");
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove("player--active");
      diceEl.classList.add("hidden");
      //End game
      playing = false;
    } else {
      //.Switch player
      switchPlayer();
    }
  }
});
btnNew.addEventListener("click", init);
