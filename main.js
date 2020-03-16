// ========================================
// Game Icons from https://game-icons.net/
//
// ========================================


const GameGrid = {
    
    // cell items
    items: [
        "anubis",
        "centaur",
        "dinosaur",
        "ghost",
        "hydra", 
        "loch-ness",
        "moon",
        "reaper"
    ],
    
    // game board
    gameBG: "game-background",
    cells: "game-cell",
    board: [],

    // fills the board array with icons 
    createBoardItems: function() {
        for(let i = 0; i < 16; i++){
            let count = 0;
            let item = this.randomItem();

            // check for duplicates
            for(let j = 0; j <= i; j++) {
                if (this.board[j] === item) count++;
            }

            // fills non-duplicate
            if (count < 2) {
                this.board[i] = item;
            } else i--; // reset
        }
    },

    // fills cells with board array icons
    fillBoardItems: function() {
        const cells = document.getElementsByClassName("game-cell");

        this.createBoardItems(); // fills board array with random numbers

        for(let i = 0; i < cells.length; i++) {
            cells[i].classList.add(this.items[this.board[i]]); // Adds items class to board cells
        }
    },

    // random Number - Cycle through cell items
    randomItem: function () {
        return Math.floor(Math.random() * 8);
    },

    // update cell w/icon
    addCellItem: function (cell) {
        let num = Math.abs(+cell.id.slice(cell.id.length - 2));
        let icon = this.items[this.board[num - 1]];
        cell.classList.add(icon);

    },

    // reset cell
    removeCellItem: function (cell) {
        for(let i = 0; i < cell.classList.length; i++) {
            let item = cell.classList.item(i);
            if(item !== "game-cell") cell.classList.remove(item);
        }
    },

    // empty - update cell // !empty - reset cell
    cellEmptyCheck: function(event){
        const cell = event.target; // click target
        let cellClasses = event.target.classList;

        if(!cellClasses.contains(GameGrid.cells)) return; // returns if ! game cell

        if(cellClasses.length > 1)  {
            GameGrid.removeCellItem(cell);
         } else {
            GameGrid.addCellItem(cell); // add game item 
         } 
    },
    
    // add grid listeners
    createGridEventListeners: function () {
        const table = document.getElementById(this.gameBG);
        table.addEventListener("click", this.cellEmptyCheck);
    },

    // delete grid listeners
    deleteGridEventListeners: function() {
        const table = document.getElementById(this.gameBG);
        table.removeEventListener("click", this.cellEmptyCheck);
    }
};

// window load
window.addEventListener("load", function(){
    GameGrid.fillBoardItems();
    GameGrid.createGridEventListeners();
});

// window unload
window.addEventListener("unload", function(){
    GameGrid.deleteGridEventListeners();
});