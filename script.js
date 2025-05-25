
// TIC TAC TOE Game


// Constant Declarations
// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

const maxRowAndColumn   = 3;
const maxBoard          = 9;
const inputPlayerOne    = document.querySelector("#inputPlayerOne");
const inputPlayerTwo    = document.querySelector("#inputPlayerTwo");
const startButton       = document.querySelector("#startButton");
const endButton         = document.querySelector("#endButton");
const gameBoardEl       = document.querySelector(".game-board");


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
            break;
        case "O":
            ... ;
            break;
    }
}
*/
// Template rule used:
//  - One of: 2 cases 
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
            break;
        case "OFF" :
            ... ;
            break;
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
            break;
        case "green" :
            ... ;
            break;
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
//  - Atomic distinct: Numbers


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
    listRecord = [firstRow, secondRow, thirdRow, firstColumn, secondColumn, thirdColumn, firstDiagonal, secondDiagonal]
    const set = function(index) { 
        switch (index) {
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
                addIndexToRecord([secondRow, secondColumn, firstDiagonal, secondDiagonal], index);
                break;
            case 5 :
                addIndexToRecord([secondRow, thirdColumn], index);
                break;
            case 6 :
                addIndexToRecord([thirdRow, firstColumn, secondDiagonal], index);
                break;
            case 7 :
                addIndexToRecord([thirdRow, secondColumn], index);
                break;
            case 8 :
                addIndexToRecord([thirdRow, thirdColumn, firstDiagonal], index);
                break;
        }                 
    }
    const clear = function() {  
        for (let i= 0; i < listRecord.length; i++) {
            listRecord[i].length = 0;
        }
   }
    return {listRecord, set, clear} 
}


/*
function funForRecord(record) {
    ...funForListRecord(record.listrecord);
    ...record.set();
    ...record.clear();
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
function createPlayer(markerID,playerName, idName, idPlayerState, idLightState, idWin, color) {
    const marker        = document.querySelector("#" + markerID) 
    marker.style.color  = color  
    const name          = document.querySelector("#" + idName)
    name.textContent    = playerName;
    const state         = document.querySelector("#" + idPlayerState);
    state.textContent   = "OFF";
    let light           = "red";
    let win             = 0;
    let record          = createRecord();    
    const lightEl       = document.querySelector("#"+ idLightState);
    lightEl.style.backgroundColor = light;
    const winEl         = document.querySelector("#" + idWin) ; 
    winEl.textContent   = win;
    const setMarker     = function(newMarker) { 
        marker.textContent = newMarker            
    }  
    const getMarker = () => marker.textContent     
    const setName = function(newName) { 
        name.textContent = newName
    }
    const getName = () => name.textContent;
    const changeState = function() {  
        switch(state.textContent) {
            case "ON" :
                state.textContent = "OFF" ;
                break
            case "OFF" :
                state.textContent = "ON" ;
                break;
        }            
    } 
    const getState = () => state.textContent;
    const changeLight = function() {  
        switch(light) {
            case "red" :
                light = "green" ;                
                break;
            case "green" :
                light = "red" ;                
                break;
        }
        lightEl.style.backgroundColor = light;           
    };   
    const getLight  = () => light
    const setWin    = () => win++; 
    const getWin    = () => win;  
    const setToDefault = function() {    
        marker.textContent  = "" ;
        name.textContent    = "";
        state.textContent   = "OFF"   
        light               = "red"
        win                 = 0;
        record.clear();

    }        
    return {record,color, setMarker, getMarker,setName, getName,changeState, getState,changeLight, getLight,setWin, getWin, setToDefault}
}
// Example
// const playerTest = createPlayer("playerOneMarker", "Tester", "playerOneName", "playerOneState", "playerOneLight", "playerOneWin", "cyan");
/*
function funForPlayer(player) {
    ... funForRecord(player.record);
    ... player.color;
    ... player.setMarker(marker);
    ... funForMarker(player.getMarker());
    ... player.setName(name);
    ... funForName(player.getName());
    ... player.changeState();
    ... funForState(player.getState());
    ... player.changeLight();
    ... funForLight(player.getLight());
    ... player.setWin();
    ... funForWin(player.getWin());
    ... player.setToDefault();
}
*/
// Template rule used:
//  - Compound data
//  - Reference : Record
//  - Reference : Marker
//  - Reference : Name
//  - Reference : State
//  - Reference : Light
//  - Reference : Win 

module.exports = {createRecord, createPlayer}
/*
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
    const setMarker = function(newMarker) {
        switch(newMarker) {        
            case "X":
                marker = "X" ;
            case "O":
                marker = "O" ;
        }
    }    
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
        record.clear();
    }    
    
    return {marker,record,setMarker,setName, getName,changeState, changeLight, setWin, getWin, setToDefault}
}
    

*/

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
    let boardRecord     = [];
    const playerOne     = createPlayer("X", "Dhika", "playerOneName", "playerOneState", "playerOneLight", "playerOneWin");
    const playerTwo     = createPlayer("O", "Evan", "playerTwoName", "playerTwoState", "playerTwoLight", "playerTwoWin");    
    const roundEl       = document.querySelector("#round");
    roundEl.textContent = round;
    const drawEl        = document.querySelector("#draw");
    drawEl.textContent  = draw;    
    const start = function() {        
    }
    const changePlayer = function() {        
    }
    const getPlayerON = function() {        
    };
    const setRound = function() {        
    };
    const getRound = function() {        
    };
    const setDraw = function() {        
    };
    const getDraw = function() {        
    };
    const isPlayerWin = function() {         
    }
    const setToInitial = function() {        
    }
    const hasEmptyBoard = function() {        
    }
    return {flag,playerOne, playerTwo, boardRecord,start,changePlayer, getPlayerON ,setRound, getRound, setDraw, getDraw, isPlayerWin, setToInitial, hasEmptyBoard};
}();

/*
function funForGameState(gameState) {
    ... gameState.flag;
    ... gameState.playerOne;
    ... gameState.playerTwo;
    ... gameState.boardRecord;
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

// GameState data & method definition 
/*
const GameState = function() {
    let playerON;
    let flag            = false;
    let round           = 0;
    let draw            = 0;
    let boardRecord     = [];
    const playerOne     = createPlayer("X", "Dhika", "playerOneName", "playerOneState", "playerOneLight", "playerOneWin");
    const playerTwo     = createPlayer("O", "Evan", "playerTwoName", "playerTwoState", "playerTwoLight", "playerTwoWin");    
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
            if(playerON.record.listRecord[i].length === maxRowAndColumn) {
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
    const hasEmptyBoard = function() {
        if(boardRecord.length < maxBoard) {
            return true
        }
        else return false;
    }
    return {flag,playerOne, playerTwo, boardRecord,start,changePlayer, getPlayerON ,setRound, getRound, setDraw, getDraw, isPlayerWin, setToInitial, hasEmptyBoard};
}();
*/
/*
function funForGameState(gameState) {
    ... gameState.flag;
    ... gameState.playerOne;
    ... gameState.playerTwo;
    ... gameState.boardRecord;
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



// ListOfBoard is 9 of Board
// interp. 9 Board to play the game
/*
function funForListOfBoard(listOfBoard) {
    for(let i = 0; i < listOfBoard.length; i++) {
        ... funForBoard(listOfBoard[i]) {                
        }
    }
}
*/
// Template rule used:
//  - Array of loop
//  - Reference : Board



// Message is 
/*
const Message = function(dialogTag, messageID, buttonID) {
    const dialog        = document.querySelector(dialogTag);
    const text          = document.querySelector(messageID);
    const closeButton   = document.querySelector(buttonID);
    return {dialog, text, closeButton}
}("dialog", "#message", "#close-dialog-button");
*/
// interp. Dialog Element to send message if player win or get draw
/*
function funForMessage(message) {
    ... message.dialog;
    ... message.text;
    ... message.closeButton;
}
*/
// Template rule used:
//  - Compound data


// Result is one of:
//  - "Win"
//  - "Draw"
// interp. to determine the result of the game
/*
function funForResult(result) {
    switch (result) {
        case "Win" :
            ....;
            break;
        case "Draw" :
            ...;
            break;
    }
}
*/



// GameBoard Data & Method definition
/*
const GameBoard = function(container) {     
    const listOfBoard = setGameBoard(9, "board", container);
    const clear = function() {
        for(let i = 0; i < listOfBoard.length; i++) {
            listOfBoard[i].boardEl.textContent = "";        
        }        
    }
    return {listOfBoard, clear}    
}(gameBoardEl);
*/
// interp. 9 square box to play Tic TacToe Game
/*
function forGameBoard(gameBoard) {
    ... funForListOfBoard(gameBoard.listOfBoard)
    ... gameBoard.clear();
    }
*/
// Template rule used:
//  - Compound data
//  - Reference : ListOfBoard


// GameBoard helper function
// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

// (Number, GameState, Element) -> Array
// To produce listofBoard according to the number
function setGameBoard(number, className, container) {
    const listBoard = [];
    for (let i = 0 ; i < number; i++) {
        const board = createBoard(i, className);
        listBoard.push(board)        
        container.appendChild(board.boardEl);
    }        
    return listBoard;
}


// Functions Declaration 
// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
function gamePlay() {
    GameState.flag = true;
    GameState.start();
    setBoardListener(GameBoard, GameState, Message)
}




// (GameBoard, GameState, Message) -> ()
// To add event listener for Board Element
function setBoardListener(gameBoard, gameState, message) {  
    for(let i = 0; i < gameBoard.listOfBoard.length; i++) {
        const board = gameBoard.listOfBoard[i]
        board.boardEl.addEventListener("click", function() {
            if(gameState.flag && board.boardEl.textContent === "") {
                    board.boardEl.textContent = gameState.getPlayerON().marker;
                    gameState.getPlayerON().record.set(board.index); 
                    gameState.boardRecord.push(board.index)               
                    checkGameState(gameBoard, gameState, message) ;       
                }
            })
    
        }
        
}

// (GameState) -> ()
// To check if Player win, if false change the player
function checkGameState(gameBoard, gameState, message) {  
    switch (true) {
        case gameState.isPlayerWin() :         
            message.text.textContent = "Congratulations " + gameState.getPlayerON().getName() + ", you are the winner!!!";
            message.dialog.showModal();
            setDialogCloseListener(gameBoard, gameState, message, "Win"); 
            break;
        case gameState.hasEmptyBoard() :
            gameState.changePlayer()
            break; 
        case (gameState.boardRecord.length === maxBoard) :
            message.text.textContent = "You both get draw result";
            message.dialog.showModal();
            setDialogCloseListener(gameBoard, gameState, message, "Draw")
            break;
    
    }
}

// (GameState, Dialog, String) -> ()
// To add event listener for close the dialog and update gameState
function setDialogCloseListener(gameBoard, gameState, message, result) {
    message.closeButton.addEventListener("click", function(){
        switch (result) {
            case "Win" :                
                gameState.getPlayerON().setWin();
                break;
            case "Draw" :
                gameState.setDraw();
                break;
        }
        gameState.setRound();
        gameState.playerOne.record.clear();        
        gameState.playerTwo.record.clear();         
        gameState.boardRecord.length = 0;         
        gameBoard.clear() ; 
        message.dialog.close();              
    })
}


