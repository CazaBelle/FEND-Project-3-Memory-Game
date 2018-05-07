console.log ('jsfileloaded');

alert ('jsfileloaded');

let cards = '';

//Set up the varibles

let firstCard = '';
let secondCard = '';
let firstCardParent = '';
let secondCardParent = '';
let ready = true; 
let stopTimer = false;
let cardCounter = 0; 


document.querySelector(".restart").addEventListener("click", restart);
document.querySelector(".deck").addEventListener("click", function() {stopTimer = false; timerStart()});
document.querySelector(".deck").addEventListener("click", cardOpen);
document.querySelector(".playAgain").addEventListener("click", function() {
  document.querySelector(".winPage").className = "winPage closed"; restart()});

//  * Display the cards on the page
//  *   - shuffle the list of cards using the provided "shuffle" method below
//  *   - loop through each card and create its HTML
//  *   - add each card's HTML to the page
//  


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

//Unlocks clicked cards

// Rating system renewal




function cardOpen(evt) {
	if (evt.target.className =="card" && cardCounter != 2) {
		evt.target.className += " open show";
	
//Determines card order when unlocked

if (firstCard == false) {
	firstCard = evt.target.firstElementChild.className; 
	firstCardParent = evt.target;
	cardCounter = 1; 
} else {
	document.querySelector(".moves").innerText = +document.querySelector(".moves").innerText + 1;

//rating systems start decrease depending on number of moves 
  
  if (document.querySelector(".moves").innerText == '15' || document.querySelector(".moves").innerText == '25') {
        document.querySelector(".fa-star").parentNode.removeChild(document.querySelector(".fa-star"));
      }

      secondCard = evt.target.firstElementChild.className; 
      secondCardParent = evt.target; 
      cardCounter = 2; 

      //card matching

      if (firstCard == secondCard) {
      	firstCardParent.className = "card open show match";
      	secondCardParent.className = "card open show match";
      	firstCard = '';
      	secondCard = '';
      	cardCounter = 0; 
      	win ();
     }else {
     	setTimeout(function () {
          evt.target.className = "card close"; firstCardParent.className = "card close"}, 700);
     	setTimeout(function () {
     		evt.target.className = "card"; firstCardParent.className = "card";
     				firstCard = ''; secondCard = ''; cardCounter = 0}, 900);
     	}
     }
ready = false; 

	}
}


function returnStars() {
  while (document.getElementsByClassName("fa-star").length != 3) {
    var newStar = document.createElement("li");
    newStar.className = "fa fa-star";
    document.querySelector(".stars").appendChild(newStar);
  }

}

function restart() {
  firstCard = "";
  secondCard = "";
	document.querySelector(".moves").innerText = "0";
	returnStars();
  document.querySelector(".winPage").className = "winPage closed";

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

 //Collect cards to check if all are open and match:

 let matchingCards = document.getElementsByClassName('card match open show');
 if (matchingCards.length == 16) {
   setTimeout (function() {document.querySelector(".winPage").className = "winPage"}, 1000);
   stopTimer = true;
 }
}
