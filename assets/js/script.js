/**global variables declaration*/
let deck; //array of cards (deck)
let pl;  //player (CPU or P1)
let totalPoints = 0; //total points
let points = 0; //points according the rules for the chosen card
let chosenCard; //chosen and played card
let endGame = false; //boolean for the end of the game
let won = 0;
let lost = 0;
let num;
let clicked

prepareGame();
/** Method to Prepare a new game
 * 
 * Prepare the game loading all cards in an array (4 full sets) as a deck
 * calls for taking out three random cards and distribute to player and CPU
 * resets the points
 * places two empty cardson the deck (just for space) and the played
 * randomly chooses if it is CPU or player and changes the background of the area
 */ 
function prepareGame() {
    let buttons = document.getElementsByTagName("button");
    for (let button of buttons) {
        button.addEventListener("click", function() {
            clicked = this.id;
            mainGame()
        })
    }
    deck = [];
    deck = ["1","2","3","4","5","6","7","8","9","10","J","Q","K","1","2","3","4","5","6","7","8","9","10","J","Q","K","1","2","3","4","5","6","7","8","9","10","J","Q","K","1","2","3","4","5","6","7","8","9","10","J","Q","K"];
    points = 0;
    totalPoints = 0;
    document.getElementById("points").innerHTML = "0";
    document.getElementById("deck").innerHTML = "D";
    document.getElementById("played").innerHTML = "D";
    document.getElementById("won").innerHTML = "WON = " + won;
    document.getElementById("lost").innerHTML = "LOST = " + lost;

    distributeCardsAll();
    /** Method to Distribute random cards to all players
    * 
    * takes three random cards and distribute to CPU and Player
    */
    function distributeCardsAll () {
        //cycle through the 3 CPU cards and:
            for (let i = 1; i < 4; i++) {
                // Creates a random numbers between 0 and the deck total cards
                let num = Math.floor(Math.random() * deck.length);
                // takes the correspondent card
                let card = deck[num];
                //writes it in the CPU card
                document.getElementById("opponentCard"+i).innerHTML = card;
                // eliminates from the array
                deck.splice(num,1);
            }
        //cycle through the 3 Players cards and:
        for (let i = 1; i < 4; i++) {
            // Creates a random numbers between 1 and the deck total cards
            let num = Math.floor(Math.random() * deck.length);
            // takes the correspondent card
            let card = deck[num];
            //writes it in the Players card
            document.getElementById("playerCard"+i).innerHTML = card;
            // eliminates from the array
            deck.splice(num,1);
        }
    }
    
    choosePlayer();
    /** Method to randomly chose the starting player
    * 
    * Generate a random number between 0 and 1
    * if it is = 0 assign the CPU as first player
    * returns the Player (CPU or P1)
    */
    function choosePlayer() {
        let num = Math.floor(Math.random()*2);
        if (num === 0 ) {
            pl = "CPU";
            alert("CPU will Play First!")
        } else {
            pl = "P1";
        }
    }
    cardImages()
    /** Card Images Method to show cards instead of the numbers in the divs
    * 
    * Takes the number in the div (only PLayed Card and Player Cards)
    * Loads the corrispondent image and sets it as background for the DIV
    * cycle on all divs with class="cardImage"
    * takes the card
    * defines the image path and name
    * applies the background image
    * applies the style background-repeat: false;
    * applies the style background-size: cover;
    */
    function cardImages() {
        let divs = document.getElementsByClassName("cardImage")
        for (let i = 0; i < divs.length ; i++) {
            let num = divs[i].innerHTML
            let path = "url('/assets/pictures/" + num + ".jpg'"
            divs[i].style.backgroundImage = path      
            divs[i].style.backgroundRepeat = "false"     
            divs[i].style.backgroundSize = "cover"      
        }
    }
}


mainGame()
/** Main Game Routine
 * 
 * Checks who is playing and moves to the right routine
 * adds the points to the total according the rules
 * moves the card on the last played pile
 * check the points total if it is 99+ or if there are no more cards in the deck
 * if yes: display message, update counters, go for a new game
 * if no: takes a new card from the deck (checking if there are cards available)
 * changes player and start again with the new player
*/

function mainGame() {
    if (pl =="CPU") {
        /**Game Routine for the CPU Player only
        * 
        * takes a random card (between 1 and 3)
        * plays it
        * and eliminates it
        */
        let rnd = Math.floor(Math.random()*3) + 1
        chosenCard = document.getElementById("opponentCard" + rnd).innerHTML;
        document.getElementById("opponentCard" + rnd).innerHTML = " ";
    } else {
        /** Game routine for the player P1 only
        * 
        * 
        * takes the card chosen (button clicked)
        * plays it
        * and eliminates it
        */
        let num = clicked.slice(-1);
        chosenCard = document.getElementById("playerCard" + num).innerHTML;
        document.getElementById("playerCard" + num).innerHTML = " ";
    }
    getPoints();
    moveChosenCard();
    calculateTotalPoints();
    checkEndGame();
    if (endGame == false) {
        drawCard();
        changePlayer();
    } else {
        //check the player to understand who lost, update the counters
        if (pl === "CPU") {
            alert("You Won the Game!");
            won = parseInt(won)+1;
        } else {
            alert("You lost the game!");
            lost=parseInt(lost)+1;
        }
        prepareGame();
    }
}


/** Method to assign points from the chosen card
 * 
 * Calculates the points according to the rules of the game
 */
function getPoints () {
    switch (chosenCard) {
        case "1" : 
            points = 1;
            break;
        case "2" :
            points = 2;
            break;
        case "3" :
            points = 3;
            break;
        case "4" :
            points = 4;
            break;
        case "5" :
            points = 5;
            break;
        case "6" :
            points = 6;
            break;
        case "7" :
            points = 7;
            break;
        case "8" :
            points = 8;
            break;
        case "9" :
            points = 9;
            break;
        case "10" :
            points = -10;
            break;
        case "J" :
            points = 0;
            break;
        case "Q" :
            points = 0;
            break;
        case "K" :
            points = 99;
            break;
    }
}

/** Method to move the card from the player to the gameArea
 * 
 * Updates the Last Played Card in the Game area 
 */
function moveChosenCard () {
    document.getElementById("played").innerHTML = chosenCard;
}

/** Method to calulate the total points
 * 
 * Calculates the Total Points
 * If the played card is a K = 99 points, just makes the total as 99
 * displays the total Points in the correct area
 */
function calculateTotalPoints() {
    if (points == 99) {
        totalPoints = 99;
    } else {
        totalPoints = parseInt(points) + parseInt(totalPoints);
    }
    document.getElementById("points").innerHTML = totalPoints;
}

/** Method to evaluate if the game is finished
 * 
 * Checks if the total points are 99+ or if the deck is empty
 */
function checkEndGame () {
        let endGame1;
        let endGame2;
    if (parseInt(totalPoints) > 99) {
        endGame1 = true;
    } else {
        endGame1 = false;
    }
    if (deck.length == 0) {
        endGame2 = true;
    } else {
        endGame2 = false;
    }
    endGame = endGame1 || endGame2;
    }

/** Method to Change player
 * 
 * Changes the player, updates the background of the title and calls for a new mainGame routine if player is CPU
 */
function changePlayer() {
    if (pl === "CPU") {
        pl = "P1";
    } else {
        pl = "CPU";
    }
    if (pl ==="CPU") {
        mainGame();
    }
}

/** Method to draw new cards
 * 
 * Draws a new random card from the deck
 * places it in the available (= empty) place (CPU or P1)
 * takes it away from the deck
 */
function drawCard() {
    let cards;
    let card;
    //Checks wich player is playing
    if (pl==="CPU") {
        cards = "opponentCard";
    } else {
        cards = "playerCard";
    }
    //finds the empty card
    for (let i = 1; i<4; i++) {
        card = cards + i;
        let value = document.getElementById(card).innerHTML;
        if (value === " ") {
            // Creates a random numbers between 1 and the deck total cards
            let num = Math.floor(Math.random() * deck.length);
            let newCard = deck[num];
            //writes it in the empty place
            document.getElementById(card).innerHTML = newCard;
            // eliminates from the array
            deck.splice(num,1);
        }
    }
}
