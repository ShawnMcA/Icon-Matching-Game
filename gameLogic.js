import { GameGrid } from './gameGrid.js';

export const GameLogic = {
    
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
};


(function gameLoop(){
    
})();


// window load
window.addEventListener("load", function(){
    GameGrid.createBoardItems();
    //GameGrid.fillBoardItems(); // !! FOR TESTING !! 
    GameGrid.createGridEventListeners();
});

// window unload
window.addEventListener("unload", function(){
    GameGrid.deleteGridEventListeners();
});