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

    // random Number - Cycle through cell items
    randomNum : function () {
        return Math.floor(Math.random() * 8);
    },

    // update cell w/icon
    addCellItem: function (cell, icon) {
        cell.classList.add(icon);
    },

    // reset cell
    removeCellItem: function (cell, icon) {
        cell.classList.remove(icon);
    },

    // !!TODO!! - UPDATE EMPTY CELL LOGIC
    // empty - update cell // !empty - reset cell
    cellEmptyCheck: function(event){
        let cellItem = GameGrid.randomNum(); // TESTING
        const cell = event.target; // click target
        if(!cell.classList.contains(GameGrid.cells)) return; // returns if ! game cell
        cell.classList.contains(GameGrid.items[cellItem]) ? GameGrid.removeCellItem(cell, GameGrid.items[cellItem]) : GameGrid.addCellItem(cell, GameGrid.items[cellItem]); // add game item 
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

// load
window.addEventListener("load", function(){
    GameGrid.createGridEventListeners();
});

// unload
window.addEventListener("unload", function(){
    GameGrid.deleteGridEventListeners();
});