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

/** Wait for the DOM to finish loading before running the game
 * Get the button elements and add event listeners to them
 * calls for preparing the game
*/
document.addEventListener("DOMContentLoaded", function() {
    let buttons = document.getElementsByTagName("button");
    for (let button of buttons) {
        button.addEventListener("click", function() {
        });
    }
    prepareGame()
    mainGame()
});

/** Prepare the game loading all cards in an array (4 full sets) as a deck
 * calls for taking out three random cards and distribute to player and CPU
 * resets the points
 * places two empty cardson the deck (just for space) and the played
 * randomly chooses if it is CPU or player and changes the background of the area
 */ 
function prepareGame() {
    var deck = ["1","2","3","4","5","6","7","8","9","10","J","Q","K","1","2","3","4","5","6","7","8","9","10","J","Q","K","1","2","3","4","5","6","7","8","9","10","J","Q","K","1","2","3","4","5","6","7","8","9","10","J","Q","K"];
    distributeCardsAll(deck)
    var points = "0";
    document.getElementById("points").innerHTML = points;
    document.getElementById("deck").innerHTML = " ";
    document.getElementById("played").innerHTML = " ";
    choosePlayer()
    playerColor()
}


/** takes three random cards and distribute to CPU and Player
*/
function distributeCardsAll (deck) {
    //cycle through the 3 CPU cards and:
        for (let i = 1; i < 4; i++) {
            // Creates a random numbers between 1 and the deck total cards
            let num = Math.floor(Math.random() * deck.length) + 1;
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
        let num = Math.floor(Math.random() * deck.length) + 1;
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
    } else {
        pl = "P1";
    }
    return pl;
}

/**Makes the actual player color background different
 * takes the player (pl) and changes the background of the area Title
 */
function playerColor() {
    if (pl =="CPU") {
        document.getElementById("opponentTitle").style.backgroundColor="yellow";
    } else {
        document.getElementById("playerTitle").style.backgroundColor="yellow";
    }
}

/**Main Game Routine
 * Checks who is playng and moves to the right routine
 * adds the points to the total according the rules
 * moves the card on the last played pile
 * check the points total if it is 99+
 * if yes: display message, update counters, ask for a new game
 * if no: takes a new card from the deck (checking if there are cards available)
 * changes player
 */
function mainGame() {
    if (pl =="CPU") {
        cpuGame()
    } else {
        playerGame()
    }
}



/**Game Routine for the CPU
 * waits 5000 milliseconds ("thinking")
 * takes a random card from the 3 available
 */
function cpuGame() {
    setTimeout(function() {
        document.getElementById("opponentTitle").innerHTML = "CPU PLAYER      ......I'm Thinking.......";
        let num = Math.floor(Math.random()*3) + 1;
        var chosenCard = document.getElementById("opponentCard"+ num).innerHTML;
        console.log(chosenCard);
        return chosenCard
      }, 1000);
}


/**Game routine for the player P1
 * takes the card chosen (button click)
 */
function playerGame() {

}