const GameGrid = {
    
    // cell items
    items: [
        "sword"
    ],
    
    // game board
    gameBG: "game-background",
    cells: "game-cell",

    // update cell w/icon
    addCellItem: function (cell, icon) {
        cell.classList.add(icon);
    },

    // reset cell
    removeCellItem: function (cell, icon) {
        cell.classList.remove(icon);
    },

    // empty - update cell // !empty - reset cell
    cellEmptyCheck: function(event){
        const cell = event.target; // click target
        if(!cell.classList.contains(GameGrid.cells)) return; // returns if ! game cell
        cell.classList.contains(GameGrid.items[0]) ? GameGrid.removeCellItem(cell, GameGrid.items[0]) : GameGrid.addCellItem(cell, GameGrid.items[0]); // add game item 
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