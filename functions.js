// global letiable declarations

let asSongs = ["rocklobster", "peoplearepeople", "onceinalifetime", "sweetdreams", "missionaryman",
    "safetydance", "onlyalad", "whipit", "99redballoons"];
let aoContestants = [];
let availableLetters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
let usedLetters = [];
let randomSong;
let displayTitleName;
let currentContestant = 0;
let currentGame;
let firstName = "";
let lastName = "";

// person class declaration

class Person {
    constructor(firstName, lastName) {
        this.firstName = firstName;
        this.lastName = lastName;
    }
    age = 0;
}

// gamesPlayed class declaration

class GamesPlayed {
    guessCount = 0;
    finishedGame = false;
}


// contestant class declaration

class Contestant extends Person {
    constructor(firstName, lastName) {
        super(firstName, lastName);
    }
    numberOfGamesPlayed = 0;
    totalNumberOfGuesses = 0;
    gamesPlayed = [];

    getFullName() {
        return this.firstName + ' ' + this.lastName;
    }

    showResults() {
        if (this.numberOfGamesPlayed > 0) {
            let numGuesses = 0;
            for (let i = 0; i < this.gamesPlayed.length; i++) {
                numGuesses = numGuesses + this.gamesPlayed[i].guessCount;
            }
            return this.getFullName() + ' has made ' + numGuesses + ' guesses.' .bold();
        } else {
            return this.getFullName() + ' has not finished a game.' .bold();
        }
    }


}


//reset function

function resetMe() {
    aoContestants = [];
    availableLetters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
    usedLetters = [];
    alert('Game has been reset');
    document.getElementById('play-button').style.display = 'block';
    hideElements('gameplay');
    hideElements('afterGameplay');

}

// starts new game

function playGame() {

    availableLetters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
    usedLetters = [];
    document.getElementById('finalGuess').value = "";
    document.getElementById('usedLetters').innerHTML = formatLetters(usedLetters);
    document.getElementById('inputLetter').value = "";
    let elementsToShow = document.getElementsByClassName('afterGameplay');
    for (let i = 0; i < elementsToShow.length; i++) {
        elementsToShow.item(i).style.display = "none";
    }

    if (firstName === "") {
        firstName = prompt("Please enter your first name:");

        while (firstName === "" || firstName === null) {
            firstName = prompt("You must enter a name to continue:");
        }
        lastName = prompt("Please enter your last name:");
        while (lastName === "" || lastName === null) {
            lastName = prompt("You must enter a name to continue:");
        }
        currentContestant = aoContestants.length;
        aoContestants.push(new Contestant(firstName, lastName));
    }
    currentGame = aoContestants[currentContestant].gamesPlayed.length;
    aoContestants[currentContestant].gamesPlayed.push(new GamesPlayed);
    document.getElementById('welcome').innerHTML = 'Welcome, ' + aoContestants[currentContestant].getFullName() + '!'
    showElements('gameplay');
    document.getElementById('play-button').style.display = 'none';
    randomSong = asSongs[Math.floor(Math.random() * asSongs.length)];
    let numberOfSpaces = randomSong.length;
    displayTitleName = generateSpaces(numberOfSpaces);
    document.getElementById('displayTitleName').innerHTML = displayTitleName;
    document.getElementById('availableLetters').innerHTML = formatLetters(availableLetters);
    document.getElementById('inputLetter').focus();

}

// updates elements' display styling

function showElements(classToUse) {
    let elementsToShow = document.getElementsByClassName(classToUse);
    for (let i = 0; i < elementsToShow.length; i++) {
        elementsToShow.item(i).style.display = "block";
    }
}

// returns x number of blank spaces given a song title

function generateSpaces(numberOfSpaces) {
    let spaces = "";
    for (let i = 0; i < numberOfSpaces; i++) {
        spaces = spaces + '_ ';
    }
    return spaces;
}

// formats the available letters to look pretty

function formatLetters(letters) {
    let letterString = "";
    for (let i = 0; i < letters.length; i++) {
        letterString = letterString + letters[i] + " ";
    }
    return letterString.bold();
}

// submit letter guess

function submitCharacter() {

    let guess = document.getElementById('inputLetter').value;
    guess = guess.toUpperCase();
    if (guess.length !== 1) {
        alert('Guess must be a single character. Please try again.');
    } else if (usedLetters.includes(guess)) {
        alert("You have already guessed '" + guess + "'. Please enter a new character.");
    } else if (availableLetters.includes(guess) !== true) {
        alert('Please enter a letter from A to Z or a number from 0 to 9.');
    } else {
        aoContestants[currentContestant].gamesPlayed[currentGame].guessCount++;
        usedLetters.push(guess);
        availableLetters.splice(availableLetters.indexOf(guess), 1); // removes one character
        document.getElementById('availableLetters').innerHTML = formatLetters(availableLetters);
        document.getElementById('usedLetters').innerHTML = formatLetters(usedLetters);
        if (randomSong.includes(guess.toLowerCase())) {
            for (let i = 0; i < randomSong.length; i++) {
                if (randomSong.charAt(i) === guess.toLowerCase()) {
                    let charLocation = i * 2; // because there is a space every other letter
                    displayTitleName = displayTitleName.slice(0, charLocation) + guess + displayTitleName.slice(charLocation+1);
                }
            }
            document.getElementById('displayTitleName').innerHTML = displayTitleName;
            checkWin();
        }
    }

    document.getElementById('inputLetter').value = '';
    document.getElementById('inputLetter').focus();

}

// to match finished string to

function checkWin() {
    let newString = "";
    for (let i = 0; i < randomSong.length; i++) {
        newString = newString + randomSong.charAt(i).toUpperCase() + ' ';
    }
    let guess = document.getElementById('finalGuess').value;
    if (newString === displayTitleName || guess.toLowerCase() === randomSong) {
        if (aoContestants[currentContestant].gamesPlayed[currentGame].guessCount < 26) {
            youWon();
        }
        else {
            youLost();
        }
    } else {
        if (guess.toString() !== "") {
            youLost();
        }
    }
}

function youWon() {
    alert('Great job!');
    aoContestants[currentContestant].gamesPlayed[currentGame].finishedGame = true;
    aoContestants[currentContestant].numberOfGamesPlayed++;
    let elementsToShow = document.getElementsByClassName('gameplay');
    for (let i = 0; i < elementsToShow.length; i++) {
        elementsToShow.item(i).style.display = "none";
    }
    showElements('afterGameplay');
    document.getElementById('showGames').innerHTML = "";
}

function youLost() {
    alert("Sorry! The word was " + randomSong + ". You were unable to guess the correct word in less than 26 tries. Please try again!");
    let elementsToShow = document.getElementsByClassName('gameplay');
    for (let i = 0; i < elementsToShow.length; i++) {
        elementsToShow.item(i).style.display = "none";
    }
    showElements('afterGameplay');
    document.getElementById('showGames').innerHTML = "";
}

// play again with different user

function differentUser() {
    firstName = "";
    lastName = "";
    playGame();
}

// hide elements

function hideElements(className) {
    let elementsToHide = document.getElementsByClassName(className);
    for (let i = 0; i < elementsToHide.length; i++) {
        elementsToHide.item(i).style.display = "none";
    }
}


// show games

function showGames() {

    document.getElementById('showGames').innerHTML = aoContestants[currentContestant].showResults();

}



