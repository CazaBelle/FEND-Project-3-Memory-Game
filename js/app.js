console.log ('jsfileloaded');

alert ('jsfileloaded');

//Set up the varibles

let card1 = '';
let card2 = '';
let card1Parent = '';
let card2Parent = '';
let ready = true; 
let stopTimer = false;
let cardCounter = 0; 


document.querySelector(".restart").addEventListener("click", restart);
document.querySelector(".deck").addEventListener("click", function() {stopTimer = false; timerStart()});
document.querySelector(".deck").addEventListener("click", cardOpen);


//  * Display the cards on the page
//  *   - shuffle the list of cards using the provided "shuffle" method below
//  *   - loop through each card and create its HTML
//  *   - add each card's HTML to the page
//  

//Unlocks clicked cards

function cardOpen(evt) {
	if (evt.target.className =="card" && cardCounter != 2) {
		evt.target.className += " open show";
	
//Determines card order when unlocked

if (card1 == false) {
	card1 = evt.target.firstElementChild.className; 
	card1Parent = evt.target; 
	cardCounter = 1; 
} else {
	document.querySelector(".moves").innerText = +document.querySelector(".moves").innerText + 1;

//rating systems start decrease depending on number of moves 
  
  if (document.querySelector(".moves").innerText == '16' || document.querySelector(".moves").innerText == '22') {
        document.querySelector(".fa-star").parentNode.removeChild(document.querySelector(".fa-star"));
      }

      card2 = evt.target.firstElementChild.className; 
      card2Parent =evt.target; 
      cardCounter = 2; 

      //card matching

      if (card1 == card2) {
      	card1Parent.className = "card open show match";
      	card2Parent.className = "card open show match";
      	card1 = '';
      	card2 = '';
      	cardCounter = 0; 
      	win ();
     }else {
     	setTimeout(function () {
          evt.target.className = "card close"; card1Parent.className = "card close"}, 700);
     	setTimeout(function () {
     		evt.target.className = "card"; card1Parent.className = "card";
     				card1 = ''; card2 = ''; cardCounter = 0}, 900);
     	}
     }
ready = false; 

	}
}


function restart() {
  card1 = "";
  card2 = "";
	document.querySelector(".moves").innerText = "0";
	returnStars();
  document.querySelector(".winBox").className = "winBox closed";

	let cards = Array.prototype.slice.call(document.querySelectorAll('.card'));
	cards = shuffle(cards);
	const deck = document.querySelector(".deck");

	for (let i = 0; i < cards.length; i++) {
		deck.appendChild(cards[i]);
		cards[i].className = "card";
	}

	ready = true;
  stopTimer = true;

 }

// // Shuffle function from http://stackoverflow.com/a/2450976
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


/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
// Timer

function timerStart() {
	if (ready == true) {
		var timer = 0;
		var hour = 0;
		var minute = 0;
		var second = 0;
		window.setInterval (function() {
		  ++timer;
		  hour = Math.floor(timer / 3600);
		  minute = Math.floor((timer - hour * 3600) / 60);
		  second = timer - hour * 3600 - minute * 60;
		  if (hour < 10) hour = '0' + hour;
		  if (minute < 10) minute = '0' + minute;
		  if (second < 10) second = '0' + second;
		  document.querySelector('#timer').innerHTML = hour + ':' + minute + ':' + second;
		  if(stopTimer) {
			document.querySelector('#timer').innerHTML = "00:00:00";
			timer = 0;
			hour = 0;
			minute = 0;
			second = 0;
			return;
		  }
		}, 1000);
	}
}

// Shows a modal box when you win:

function win() {
 document.querySelector(".movesCount").innerText = document.querySelector(".moves").innerText;
 document.querySelector(".starsCount").innerText = document.getElementsByClassName("fa-star").length;
 document.querySelector(".finalTime").innerText = document.querySelector('#timer').innerHTML;

 //Collect cards to check if all are open match:

 let matchingCards = document.getElementsByClassName('card match open show');
 if (matchingCards.length == 16) {
   setTimeout (function() {document.querySelector(".winBox").className = "winBox"}, 1000);
   stopTimer = true;
 }
}