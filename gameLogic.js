import { GameGrid } from './gameGrid.js';

export const GameLogic = {

    moves: 0,
    score: 0,
    matchCells: [],

    // if cells match add to score else reset cells
    matchCheck: function(){
        if (this.matchCells[0].classList[1] === this.matchCells[1].classList[1]){
            this.score += 10;
            this.moves = 0;
            this.matchCells = [];
            alert("You got a match!!"); // !!UPDATE!! - TEMP
            console.log(this.score); // !!TESTING!!
        } else {
            GameGrid.removeCellItem(this.matchCells[0]);
            GameGrid.removeCellItem(this.matchCells[1]);
            this.moves = 0;
            this.matchCells = [];
            alert("Sorry, no match..."); // !!UPDATE!! - TEMP
        }
    },

    // empty - update cell // !empty - reset cell
    cellEmptyCheck: function(event){
        const cell = event.target; // click target
        let cellClasses = event.target.classList;

        if(!cellClasses.contains(GameGrid.cells)) return; // returns if ! game cell

        // if cell empty and moves less than 2
        if(cellClasses.length === 1 && GameLogic.moves < 2)  {
            GameGrid.addCellItem(cell); // add game item 
            GameLogic.matchCells[GameLogic.moves] = cell;
            GameLogic.moves++;
            console.log(GameLogic.matchCells); // !!TESTING!!
            console.log(GameLogic.moves); // !!TESTING!!
        } 

        // if second move check for match
        if(GameLogic.moves === 2) {
            GameLogic.matchCheck();
        }
    },

};

