
// TIC TAC TOE Game


// Constant Declarations
// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
const inputPlayerOne    = document.querySelector("#inputPlayerOne");
const inputPlayerTwo    = document.querySelector("#inputPlayerTwo");
const startButton       = document.querySelector("#startButton");
const endButton         = document.querySelector("#endButton");
const gameBoardEl       = document.querySelector(".game-board");
const dialog = {
    dialogEl : document.querySelector("dialog"),
    messageEl : document.querySelector("#message"),
    closeButton : document.querySelector("#close-dialog-button")
}


// Atomic Data Non Distinct Definition 
// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

// Win is Natural number
// interp. to count how many win each Player gets
/*
function funForWin(win) {
    ... win ;
}
*/
// Template rule used:
//  - Atomic non distinct: Natural number

// Round is Natural number
// interp. to count how many games has been played
/*
function funForRound(round) {
    ... round ;
}
*/
// Template rule used:
//  - Atomic non distinct: Natural number


// Draw is Natural number
// interp. to count how many games get draw result
/*
function funForDraw(draw) {
    ... draw ;
}
*/
// Template rule used:
//  - Atomic non distinct: Natural number

// Name is String
// interp. the name put by player from input field
/*
function funForName(name) {
    ... name;
}
*/
// Template rule used:
//  - Atomic non distinct: String


// Atomic Distinct Data Definition
// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

// Marker is one of :
// - "X"
// - "O"
// interp. the mark for board from Player
/*
function  fnForMarker(marker) {
    switch(marker) {        
        case "X":
            ... ;
        case "O":
            ... ;
    }
}
*/
// Template rule used:
//  - One of: 2 cases
//  - Atomic distinct: empty
//  - Atomic distinct: "X"
//  - Atomic distinct: "O"




// State is one of:
//  - "ON"
//  - "OFF"
// interp. state of player to turn to play
/*
function funForPlayerState(state) {
    switch(state) {
        case "ON" :
            ... ;
        case "OFF" :
            ... ;
    }
}
*/
// Template rule used:
//  - One of: 2 cases
//  - Atomic distinct: "ON";
//  - Atomic distinct: "OFF"


// Light is one of:
//  - "red"
//  - "green"
// interp. state of player to turn to play, 
//     - red means Player cant play
//     - green measn Player can play
/*
function funForLightState(light) {
    switch(light) {
        case "red" :
            ... ;
        case "green" :
            ... ;
    }
}
*/
// Template rule used:
//  - One of: 2 cases
//  - Atomic distinct: "red"
//  - Atomic distinct: "green"


// Index is one of :
//  - 0
//  - 1
//  - 2
//  - 3
//  - 4
//  - 5
//  - 6
//  - 7
//  - 8
// interp. index of each board in Tic Tac Toe game board.
/*
function funForIndex(index) {
    switch (index) {
        case 0 :
            ...;
            break;
        case 1 :
            ...;
            break;
        case 2 :
            ...;
            break;
        case 3 :
            ...;
            break;
        case 4 :
            ...;
            break;
        case 5 :
            ...;
            break;
        case 6 :
            ...;
            break;
        case 7 :
            ...;
            break;
        case 8 :
            ...;
            break;
    }
}
*/
// Template rule used:
//  - One of : 9 cases
//  - Atomic distinct: Number


// Record data definition & method
function createRecord() {
    const firstRow = []
    const secondRow = []
    const thirdRow = []
    const firstColumn = []
    const secondColumn = []
    const thirdColumn = []
    const firstDiagonal = []
    const secondDiagonal = [] 
    const set = function(index) {
        switch(index) {
            case 0 :
                addIndexToRecord([firstRow, firstColumn, firstDiagonal], index);
                break;
            case 1 :
                addIndexToRecord([firstRow, secondColumn], index);            
                break;
            case 2 :
                addIndexToRecord([firstRow, thirdColumn, secondDiagonal], index);
                break;
            case 3 :
                addIndexToRecord([secondRow, firstColumn], index);
                break;
            case 4 :
                addIndexToRecord([secondRow, secondColumn, firstDiagonal, secondDiagonal], index)
                break;
            case 5 :
                addIndexToRecord([secondRow, thirdColumn], index)
                break;
            case 6 :
                addIndexToRecord([thirdRow, firstColumn, secondDiagonal], index)
                break;
            case 7 :
                addIndexToRecord([thirdRow, secondColumn], index)
                break;
            case 8 :
                addIndexToRecord([thirdRow, thirdColumn, firstDiagonal], index)
                break;
        }           
                
    }
    return {listRecord : [firstRow, secondRow, thirdRow, firstColumn, secondColumn, thirdColumn, firstDiagonal, secondDiagonal], set} 
}
/*
function funForRecord(record) {
    ...funForListRecord(record.listrecord);
    ...record.set();
}
*/
// Template rule used :
//  - Compound data
//  

// Helper function for Record data
// +++++++++++++++++++++++++++++++++++++++++++++++

// (Array, Number) -> ()
// Add index for each of element of Array
function addIndexToRecord(array, index) {
    array.forEach(element => {        
        element.push(index)
    });
}



// Player Data & Method Definition 
function createPlayer(marker,playerName, idName, idPlayerState, idLightState, idWin) {
    let name  = playerName;
    let state = "OFF";
    let light = "red";
    let win = 0;
    let record = createRecord();    
    const nameEl = document.querySelector("#" + idName);
    nameEl.textContent = name;
    const stateEl = document.querySelector("#" + idPlayerState);
    stateEl.textContent = state;
    const lightEl = document.querySelector("#"+ idLightState);
    lightEl.style.backgroundColor = light;
    const winEl = document.querySelector("#" + idWin) ; 
    winEl.textContent = win;
    const setName = function(newName) {
        name = newName;
        nameEl.textContent = name;
    }
    const getName = () => name;
    const changeState = function() {
        switch(state) {
            case "OFF" :
                state = "ON";
                stateEl.textContent = state;
                break;
            case "ON" :
                state = "OFF";
                stateEl.textContent = state;
                break;
        }        
    }    
    const changeLight = function() {
        switch(light) {
            case "red" :
                light = "green";
                lightEl.style.backgroundColor = light;
                break;
            case "green" :
                light = "red";
                lightEl.style.backgroundColor = light
                break;
        }       
    };   
    const setWin = function() {
        win++;
        winEl.textContent = win;
    };    
    const getWin = () => win;    
    const setToDefault = function() {
        name = "";
        nameEl.textContent = name;
        state = "OFF";
        stateEl.textContent = state;
        light = "red";
        lightEl.style.backgroundColor = light;
        win = 0;
        winEl.textContent = win;
        recordMarker.length = 0;
    }    
    
    return {marker,record,setName, getName,changeState, changeLight, setWin, getWin, setToDefault}
}
// interp. player who run the game either with "X" mark or "O" mark
/*
function funForPlayer(player) {
    ...funForMarker(player.marker);    
    ...funForRecord(player.record);
    ...player.setName(Name);
    ...player.getName();
    ...player.changeState();
    ...player.changeLight();
    ...player.setWin();
    ...player.getWin();    
    ...player.setToDefault();       
}
*/
// Template rule used:
//  - Compound data
//  - reference : Marker
//  - reference : Record
//  - reference : Name
//  - reference : State
//  - reference : Win


// BoardRecord is Array of Index
// interp. to record index of the board that have selected by both player
/*
function funForBoardRecord(boardRecord) {
    for(let i=0; i < boardRecord.length; i++) {
        ... boardRecord[i]
    }
}
*/
// Template rule used:
//  - Array of loop


// GameState data & method definition 
const GameState = function() {
    let playerON;
    let flag            = false;
    let round           = 0;
    let draw            = 0;
    const playerOne     = createPlayer("X", "Nico", "playerOneName", "playerOneState", "playerOneLight", "playerOneWin");
    const playerTwo     = createPlayer("O", "Dwi", "playerTwoName", "playerTwoState", "playerTwoLight", "playerTwoWin");    
    const roundEl       = document.querySelector("#round");
    roundEl.textContent = round;
    const drawEl        = document.querySelector("#draw");
    drawEl.textContent  = draw;    
    const start = function() {
        playerON = playerOne;
        changeStateAndLight(playerON);
    }
    const changePlayer = function() {
        switch(playerON.marker) {            
            case "X":
                playerON = playerTwo;
                changeStateAndLight(playerOne);
                break;            
            case "O":
                playerON = playerOne;
                changeStateAndLight(playerTwo);
                break;               
        }
        changeStateAndLight(playerON);
       
    }
    const getPlayerON = () => playerON;
    const setRound = function() {
        round++;
        roundEl.textContent = round;
    };
    const getRound = () => round;
    const setDraw = function() {
        draw++;
        drawEl.textContent = draw
    };
    const getDraw = () => draw;
    const isPlayerWin = function() {        
        for (let i = 0; i < playerON.record.listRecord.length; i++) {
            if(playerON.record.listRecord[i].length === 3) {
                return true
            }
        }
        return false;
    }
    const setToInitial = function() {
        round = 0;
        draw  = 0;
        playerOne.setToDefault();
        playerTwo.setToDefault();
        playerON = null;
    }
    return {flag, start,changePlayer, getPlayerON ,setRound, getRound, setDraw, getDraw, isPlayerWin, setToInitial};
}();
/*
function funForGameState(gameState) {
    ... gameState.flag;
    ... gameState.start();
    ... gameState.changePlayer();
    ... funForPlayer(gameState.getPlayerON);
    ... gameState.setRound();
    ... gameState.getRound();
    ... gameState.setDraw();
    ... gameState.getDraw();
    ... gameState.isPlayerWin();
    ... gameState.setToInitial();
}
*/
// Template rule used:
//  - Compound data
//  - Reference: Player
//  - Reference: Round
//  - Reference: Draw
//  - Reference: Record



// Helper Function For GameState 
// +++++++++++++++++++++++++++++++++++++++++++++++++++++

// (Player) -> ()
// Change State & Light of Player
function changeStateAndLight(player) {   
    player.changeState();
    player.changeLight();       
}



// Board Data Definition
function createBoard(indexList, className) {
    const index = indexList;
    const boardEl = document.createElement("div");
    boardEl.classList.add(className);
    return {index, boardEl}
}
/*
function funforBoard(board) {
    ... board.index;
    ... board.boardEl;
}
*/
// Rule template used:
//  - Compound data;



// GameBoard Data & Method definition
const GameBoard = function(gameState, container, dialog) {    
    const listOfBoard = setGameBoard(9, "board", gameState, container, dialog);

    return {listOfBoard}    
}(GameState, gameBoardEl, dialog);


// GameBoard helper function
// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

// (Number, GameState, Element) -> Array
// To produce listofBoard according to the number
function setGameBoard(number, className,  gameState, container, dialog) {
    const listBoard = [];
    for (let i = 0 ; i < number; i++) {
        const board = createBoard(i, className);
        listBoard.push(board)        
        container.appendChild(board.boardEl); 
        setBoardListener(board, gameState, dialog)   
    }
    return listBoard;
}

// (Board, GameState) -> ()
// To add event listener for Board Element
function setBoardListener(board, gameState, dialog) {    
    board.boardEl.addEventListener("click", function() {
        if(gameState.flag && board.boardEl.textContent === "") {
                board.boardEl.textContent = gameState.getPlayerON().marker;
                gameState.getPlayerON().record.set(board.index);                
                checkPlayerWin(gameState, dialog) ;       
            }
        })        
}

// (GameState) -> ()
// To check if Player win, if false change the player
function checkPlayerWin(gameState, dialog) {   
    if(gameState.isPlayerWin()) {
        dialog.messageEl.textContent = "Congratulations " + gameState.getPlayerON().getName() + ", you are the winner!!!"
        dialog.dialogEl.showModal();
        setDialogCloseListener(gameState, dialog);        
    }
    else {
        gameState.changePlayer();
    }
}

// (GameState, Dialog) -> ()
// To add event listener for close the dialog and update gameState
function setDialogCloseListener(gameState, dialog) {
    dialog.closeButton.addEventListener("click", function(){
        dialog.dialogEl.close();
        gameState.setRound();
    })
}


