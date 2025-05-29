// letters
const letters = "abcdefghijklmnopqrstuvwxyz"

// Get array from letters 
let lettersArray = Array.from(letters)

// select letters container 
let lettersContainer = document.querySelector(".letters")

// Generate letters 
lettersArray.forEach((letter) => {

    // create span
    let span = document.createElement("span")

    // create letter Text Node
    let theLetter = document.createTextNode(letter)

    // append the letter to span
    span.appendChild(theLetter)

    // add class on span 
    span.className = 'letter-box'

    // append span to the letters container 
    lettersContainer.appendChild(span)
})

// Object of words + categories 

const words = {
    animals: [
    "elephant",
    "tiger",
    "giraffe",
    "kangaroo",
    "penguin"
  ],
  countries: [
    "brazil",
    "canada",
    "france",
    "australia",
    "japan"
  ],
  sports: [
    "football",
    "basketball",
    "tennis",
    "cricket",
    "hockey"
  ],
  movies: [
    "inception",
    "titanic",
    "avatar",
    "gladiator",
    "coco"
],
fruits: [
    "apple",
    "banana",
    "cherry",
    "grape",
    "orange"]
}

// get random category

let allKeys = Object.keys(words)

// get random number based on the categories length
let randomPropNum = Math.floor(Math.random() * allKeys.length)

// get random property name from the category
let randomPropName = allKeys[randomPropNum]

// get random value from the category
let randomPropValue = words[randomPropName]

// randomly select a word from the category
let randomValueNum = Math.floor(Math.random() * randomPropValue.length)

// get the random word
let randomValueName = randomPropValue[randomValueNum]

// set category Info 
document.querySelector(".game-info .category span").innerHTML = randomPropName

// select letters guess container
let lettersGuessContainer = document.querySelector(".letters-guess")

// convert choosen word to array 
let lettersAndSpace = Array.from(randomValueName)

// create spans based on the choosen word
lettersAndSpace.forEach((letter) => {
    // create empty span
    let emptySpan = document.createElement("span")

    // if the letter is space 
    if (letter === " ") {
        // add class to the span
        emptySpan.className = 'with-space'
    }
    // append the empty span to the letters guess container
    lettersGuessContainer.appendChild(emptySpan)
})




// select all spans inside letters guess container
let guessSpans = document.querySelectorAll(".letters-guess span")

// set wrong attempts
let wrongAttempts = 0;

// select the draw element 
let theDraw = document.querySelector(".hangman-draw");


// handle clicking on letters
document.addEventListener("click", (e) => {
    
    // select the choose status
    let theStatus = false;

    if(e.target.className === 'letter-box') {
        
        // add clicked class to the span
        e.target.classList.add("clicked")

        // get the clicked letter
        let theClickedLetter = e.target.innerHTML.toLowerCase()

        // the choosen word letters
        let theChoosenWord = Array.from(randomValueName.toLowerCase())
        
        theChoosenWord.forEach((wordLetter, wordIndex) => {
            
            // if the clicked letter equal to one of the chosen word letters
            if (theClickedLetter === wordLetter) {
                
                // set the status to true
                theStatus = true;

                // loop on all guess spans 
                guessSpans.forEach((span, spanIndex) => {
                    
                    if(wordIndex === spanIndex) {
                        span.innerHTML = theClickedLetter
                    }
                })
            }
        });

        // outside the forEach loop
        // if letter is wrong
        if(theStatus !== true) {
            // increase the Wrong Attempts
            wrongAttempts++;

            // add class wrong to the draw element
            theDraw.classList.add(`wrong-${wrongAttempts}`);

            if (wrongAttempts === 8) {
                // game over
                endGame();
                lettersContainer.classList.add("finished");
            }
            // play fail sound
            document.querySelector("#fail").play();
        } else {
            // play success sound
            document.getElementById("success").play();
            
        }
        checkWin();
    }
});


// end game function

function endGame() {
    // create popup div
    let div = document.createElement("div");

    // create text node
    let divText = document.createTextNode(`Game Over, The Word Is ${randomValueName}`);

    // append the text to the div
    div.appendChild(divText);

    // add class to the div
    div.className = 'popup';

    // append the div to the body
    document.body.appendChild(div);

    // remove event listener from letters container
    lettersContainer.classList.add("finished");

    // remove all spans from letters container
    lettersContainer.innerHTML = '';
} 





function checkWin() {
    let allSpans = document.querySelectorAll(".letters-guess span");
    let currentGuess = "";

    allSpans.forEach((span, idx) => {
        // Ignore spaces in the original word
        if (lettersAndSpace[idx] !== " " && span.innerHTML !== "") {
            currentGuess += span.innerHTML.toLowerCase();
        } else if (lettersAndSpace[idx] !== " " && span.innerHTML === "") {
            currentGuess += "_"; // Placeholder for missing letter
        }
    });

    // Remove spaces and compare lowercased
    let original = randomValueName.replace(/\s/g, "").toLowerCase();

    if (currentGuess.replace(/_/g, "") === original) {
        
        // create button for playagain
        let playAgain = document.createElement("button")
        let btnText = document.createTextNode("PlayAgain")
        playAgain.appendChild(btnText)
        playAgain.className = 'playagain'
        console.log(playAgain)
        
        let winDiv = document.createElement("div");
        winDiv.className = "popup-2";
        winDiv.textContent = `Congratulations! The Word Is ${randomValueName}`;
        document.body.appendChild(winDiv);
        winDiv.appendChild(playAgain)
        lettersContainer.classList.add("finished");
        lettersContainer.innerHTML = '';
        // add event on button to reaload to play again 
        playAgain.onclick = function () {
        window.location.reload()
        }
    }

}



// function endGameSuccess() {
//     // create popup div
//     let div = document.createElement("div");

//     // create text node
//     let divText = document.createTextNode(`Congratulations, You Win! your Mistakes Are ${wrongAttempts}`);

//     // append the text to the div
//     div.appendChild(divText);

//     // add class to the div
//     div.className = 'popup';

//     // append the div to the body
//     document.body.appendChild(div);

//     // remove event listener from letters container
//     lettersContainer.classList.add("finished");

//     // remove all spans from letters container
//     lettersContainer.innerHTML = '';
// }

console.log(lettersGuessContainer)