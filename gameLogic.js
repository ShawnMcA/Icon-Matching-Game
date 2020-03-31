import { GameGrid } from './gameGrid.js';

export const GameLogic = {

    moves: 0,
    score: 0,
    matchCells: [],
    messages: {
        noMatch: "Sorry, no match...",
        gameOver: "Ohh no!! You've run out of lives... GAME OVER...",
        onWin: "Congrats!!! You won!!!",
    },

    // Empty - update cell // !empty - reset cell
    cellEmptyCheck: function(){
        console.log("Running empty check")
        const cell = event.target; // click target
        let cellClasses = event.target.classList;

        if(!cellClasses.contains(GameGrid.cells)) return; // returns if ! game cell

        // If cell empty and moves less than 2
        if(cellClasses.length === 1 && GameLogic.moves < 2)  {
            console.log("updating cell")
            GameGrid.addCellItem(cell); // add game item 
            GameLogic.matchCells[GameLogic.moves] = cell;
            GameLogic.moves++;
            console.log(GameLogic.matchCells); // !!TESTING!!
            console.log(GameLogic.moves); // !!TESTING!!
        } 
        
        // If second move check for match
        if(GameLogic.moves === 2) {
            GameLogic.matchCheck();
        }
    },

    // Cells ! match minus lives
    matchCheck: function(){
        if (GameLogic.matchCells[0].classList[1] === GameLogic.matchCells[1].classList[1]){
            GameLogic.match();
        } else {
            GameLogic.noMatch();
        }
    },

    // If the cells match check win
    match: function() {
        const messageBtn = document.getElementById(GameGrid.messageBtn);
        const win = this.checkWin();
        GameLogic.moves = 0;
        GameLogic.matchCells = [];

        if(win) {
            this.updateMessageBox(this.messages.onWin);
            this.displayMessage();
            messageBtn.addEventListener("click", this.removeModal);
        }
    },

    // If the cells don't match check game over
    noMatch: function() {
        const messageBtn = document.getElementById(GameGrid.messageBtn);
        let gameOver = GameLogic.updateLives();

        if (gameOver === true) {
            GameLogic.executeGameOver();
            messageBtn.addEventListener("click", this.removeModal);
        } else {
            this.updateMessageBox(GameLogic.messages.noMatch);
            this.displayMessage();
            messageBtn.addEventListener("click", this.removeNoMatchModal);
        }
    },

    // Updates the modal
    updateMessageBox: function(message) {
        const messageHeader = document.getElementById(GameGrid.messageHeader);
        messageHeader.innerHTML = message;
    },

    // Displays the modal
    displayMessage: function() {
        const modal = document.getElementById(GameGrid.modal);
        modal.classList.add("show-modal");  
    },

    // Resets the cells items and removes model on !matching
    removeNoMatchModal: function() {
        const modal = document.getElementById(GameGrid.modal);
        const messageBtn = document.getElementById(GameGrid.messageBtn);
        
        GameGrid.removeCellItem(GameLogic.matchCells[0]);
        GameGrid.removeCellItem(GameLogic.matchCells[1]);

        GameLogic.moves = 0;
        GameLogic.matchCells = [];

        modal.classList.remove("show-modal");

        messageBtn.removeEventListener("click", this.removeNoMatchModal);
    },

    // Removes the modal
    removeModal: function() {
        const modal = document.getElementById(GameGrid.modal);
        const messageBtn = document.getElementById(GameGrid.messageBtn);

        GameLogic.moves = 0;
        GameLogic.matchCells = [];

        modal.classList.remove("show-modal");
        messageBtn.removeEventListener("click", this.removeModal);
    },

    // Updates the remaining lives. Gameover if 0
    updateLives: function() {
        const lives = document.getElementById("lives");
        let currentLives = lives.innerHTML;
        lives.innerHTML = --currentLives;

        if (lives.innerHTML == 0) return true;
    },

    // Remove listeners and show game over message
    executeGameOver: function() {
        GameGrid.deleteGridEventListeners();
        this.updateMessageBox(this.messages.gameOver);
        this.displayMessage();
    },
    
    // Checks if all cells are populated
    checkWin: function() {
        const cells = Array.from(document.getElementsByClassName(GameGrid.cells));
        const win = cells.every(elem => elem.classList.length > 1);

        return win;
    },
};

