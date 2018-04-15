console.log ('jsfileloaded');

alert ('jsfileloaded');

//Set up the varibles

let card1 = '';
let card2 = '';
let card1Parent = '';
let card2Parent = '';
let ready = true; 
let stopTimer = false;
let cardcounter = 0; 

document.querySelector(".restart").addEventListener("click", restart);
document.querySelector(".deck").addEventListener("click", function(){stopTimer = false; timerStart()});
document.querySelector(".deck").addEventListener("click", cardOpen);
document.querySelector(".playAgain").addEventListener("click", function() {
		document.querySelector(".winPage").className = "winPage closed"; restart()}); 


//  * Display the cards on the page
//  *   - shuffle the list of cards using the provided "shuffle" method below
//  *   - loop through each card and create its HTML
//  *   - add each card's HTML to the page
//  

//Unlocks clicked cards

function cardOpen(evt) {
	if (evt.target.className =="card" && cardCounter != 2) {
		evt.target.className += "open show";
	
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
      card2Partent =evt.target; 
      cardcounter = 2; 

      //card matching

      if (card1 == card2) {
      	card1Parent.className = "card open show match";
      	card2Parent.className = "card open show match";
      	card1 = '';
      	card 2 = '';
      	cardCounter = 0; 
      	win ();
     }else 
     	setTimeout(function() {
     		evt.taget.className = "card close"; card1Parent.className = "card close"}, 700);
     	setTimeout(function () {
     		evt.target.className = "card"; card1Parent.className = "card";
     				card1 = ''; card2 = ''; cardCounter = 0}, 900);
     	}
     }
ready = false; 

	}

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
