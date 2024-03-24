/**After the loading of the page:
 * add event listeners to the buttons (click) for the player Area
 * Load all cards in the Deck (1-2-3-4-5-6-7-8-9-10-J-Q-K) x 4 = prepareGame()
 * Distribute 3 random cards to the player and to the CPU = distributeCardsAll()
 * Every time a card is distributed, eliminate from the deck
 * Random choose for who start first (Player or CPU) = choosePlayer()
 * CPU play = random choice between the cards (5 seconds "...thinking")
 * Player play = click on the respective button
 * Play =
 * 1. card chosen
 * 2. cards points taken from the rules (K=go to 99, Q/J = 0, 10 = -10, others = card #)
 * 3. add points to the actual game points (start from 0)
 * 4. move card to the last played area
 * 5. check if the result is 99+
 * if yes: display message (win-lose), update counters
 * if no: chek if there are more cards in the deck and  draw a new one
 * 6. change player
 * 7. if player is CPU, wait time or add a interaction to start CPU play
 */

/**global variables declaration*/
let deck; //array of cards (deck)
let pl;  //player (CPU or P1)
let totalPoints = 0; //total points
let points = 0; //points according the rules for the chosen card
let chosenCard; //chosen and played card
let endGame = false; //boolean for the end of the game

/**NORMAL SEQUENCE OF THE GAME */
prepareGame()
mainGame()




/** Get the button elements and add event listeners to the buttons
 * Prepare the game loading all cards in an array (4 full sets) as a deck
 * calls for taking out three random cards and distribute to player and CPU
 * resets the points
 * places two empty cardson the deck (just for space) and the played
 * randomly chooses if it is CPU or player and changes the background of the area
 */ 
function prepareGame() {
    let buttons = document.getElementsByTagName("button");
    for (let button of buttons) {
        //when button clicked, play the game passing the button id
        button.addEventListener("click", mainGame, this.id)
    }
    deck = ["1","2","3","4","5","6","7","8","9","10","J","Q","K","1","2","3","4","5","6","7","8","9","10","J","Q","K","1","2","3","4","5","6","7","8","9","10","J","Q","K","1","2","3","4","5","6","7","8","9","10","J","Q","K"];
    distributeCardsAll()
    document.getElementById("points").innerHTML = "0";
    document.getElementById("deck").innerHTML = " ";
    document.getElementById("played").innerHTML = " ";
    choosePlayer()
    playerColor()
}

/** takes three random cards and distribute to CPU and Player
*/
function distributeCardsAll () {
    //cycle through the 3 CPU cards and:
        for (let i = 1; i < 4; i++) {
            // Creates a random numbers between 0 and the deck total cards
            let num = Math.floor(Math.random() * deck.length)
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
/**Generate a random number between 0 and 1
 * if it is = 0 assign the CPU as first player
 * returns the Player (CPU or P1)
 */
function choosePlayer(){
    let num = Math.floor(Math.random()*2);
    if (num === 0 ) {
        pl = "CPU";
        alert("CPU will play first!");
    } else {
        pl = "P1";
        alert("Player ONE will play first!");
    }
}

/**Makes the actual player color background different
 * takes the player (pl) and changes the background of the area Title
 */
function playerColor() {
    if (pl =="CPU") {
        document.getElementById("opponentTitle").style.backgroundColor="yellow";
        document.getElementById("playerTitle").style.backgroundColor="green";
    } else {
        document.getElementById("playerTitle").style.backgroundColor="yellow";
        document.getElementById("opponentTitle").style.backgroundColor="green";
    }
}

/**Main Game Routine
 * Checks who is playing and moves to the right routine
 * adds the points to the total according the rules
 * moves the card on the last played pile
 * check the points total if it is 99+ or if there are no more cards in the deck
 * if yes: display message, update counters, ask for a new game
 * if no: takes a new card from the deck (checking if there are cards available)
 * changes player and start again with the new player
*/

function mainGame() {
    if (pl =="CPU") {
        cpuGame();
    } else {
        clicked = this.id
        playerGame(clicked);
    }
    getPoints()
    moveChosenCard()
    calculateTotalPoints()
    checkEndGame()
    if (endGame == false) {
        drawCard()
        changePlayer()
    } else {
        alert("Exit game")
    }
}



/**Game Routine for the CPU only
 * waits 3000 milliseconds "thinking")
 * takes a random card from the 3 available
 * and eliminates it
 */
function cpuGame() {
    let num = Math.floor(Math.random()*3) + 1;
    chosenCard = document.getElementById("opponentCard"+ num).innerHTML;
    document.getElementById("opponentCard" + num).innerHTML = " "
}


/**Game routine for the player P1 only
 * takes the card chosen (button click)
 * and eliminates it
 * then gets back to the mainGame
 */
function playerGame(clicked) {
    let buttonID = clicked
    let num = buttonID.slice(-1)
    chosenCard = document.getElementById("playerCard" + num).innerHTML
    document.getElementById("playerCard" + num).innerHTML = " "
}

/**Calculates the points according to the rules of the game */
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

/**Updates the Last Played Card in the Game area */
function moveChosenCard () {
    document.getElementById("played").innerHTML = chosenCard
}

/**Calculates the Total Points
 * If the played card is a K = 99 points, just makes the total as 99
 * displays the total Points in the correct area
 */
function calculateTotalPoints() {
    if (points == 99) {
        totalPoints = 99
    } else {
        totalPoints = parseInt(points) + parseInt(totalPoints)
    }
    document.getElementById("points").innerHTML = totalPoints
}

/**Checks if the total points are 99+ or if the deck is empty */
function checkEndGame () {
        let endGame1
        let endGame2
    if (parseInt(totalPoints) > 99) {
        endGame1 = true
    } else {
        endGame1 = false
    }
    if (deck.length == 0) {
        endGame2 = true
        alert("deck 0")
    } else {
        endGame2 = false
    }
    endGame = endGame1 || endGame2
    }
/**Changes the player, updates the background of the title and calls for a new mainGame routine if player is CPU*/
function changePlayer() {
    if (pl === "CPU") {
        pl = "P1"
    } else {
        pl = "CPU"
    }
    playerColor()
    if (pl ==="CPU") {
        mainGame()
    }
}

/**Draws a new random card from the deck
 * places it in the available (= empty) place (CPU or P1)
 * takes it away from the deck
 */
function drawCard() {
    let cards
    let card
    //Checks wich player is playing
    if (pl==="CPU") {
        cards = "opponentCard"
    } else {
        cards = "playerCard"
    }
    //finds the empty card
    for (let i = 1; i<4; i++) {
        card = cards + i
        let value = document.getElementById(card).innerHTML
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