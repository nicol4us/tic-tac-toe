
// TIC TAC TOE Game


// Constant Declarations
// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
const inputPlayerOne    = document.querySelector("#inputPlayerOne");
const inputPlayerTwo    = document.querySelector("#inputPlayerTwo");
const startButton       = document.querySelector("#startButton");
const endButton         = document.querySelector("#endButton");
const gameBoardEl       = document.querySelector(".game-board");


// Atomic Data Definition
// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

// Marker is one of :
// - empty 
// - "X"
// - "O"
// interp. the mark for board
/*
function  fnForMarker(marker) {
    switch(marker) {
        case "" :
            ... ;
        case "X":
            ... ;
        case "O":
            ... ;
    }
}
*/
// Template rule used:
//  - One of: 3 cases
//  - Atomic distinct: empty
//  - Atomic distinct: "X"
//  - Atomic distinct: "O"


// Name is String
// interp. the name put by player from input field
/*
function funForName(name) {
    ... name;
}
*/
// Template rule used:
//  - Atomic non distinct: String


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
// interp. state of player to turn to play, red cant play while green is turn to play
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


// Win is Natural number
// interp. to count how many win each Player gets
/*
function funForWin(win) {
    ... win ;
}
*/
// Template rule used:
//  - Atomic non distinct: Natural number


// Index is Natural number
// interp. to record index number of Board from ListOfBoard
/*
function funForIndex(index) {
    ... index ;
}
*/
// Template rule used:
//  - Atomic non distinct: Natural number


// Record is  Compound of Array Index
// interp. Object to record index of the board
function record() {
    const firstRow = []
    const secondRow = []
    const thirdRow = []
    const firstColumn = []
    const secondColumn = []
    const thirdColumn = []
    const firstDiagonal = []
    const secondDiagonal = []    
}

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


// ListOfWinArea is Array of Record
// interp. array of Record data in a row for vertical, horizontal and diagonal to determine if player can win the game
// Example :
const listOfWinArea = [
    [1,2,3],
    [4,5,6],
    [7,8,9],
    [1,4,7],
    [2,5,8],
    [3,6,9],
    [1,5,9],
    [3,5,7]
];
/*
function funForListOfWinArea(listOfWinArea) {
    for ( let i= 0; i < listOfWinArea.length; i++) {
        funForRecord(listOfWinArea[i])
    }
}
*/
// Template rule used:
// - Array for loop
// - Reference: Record


// Compound Data Definition
// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

// Player Data & Method Definition 
function createPlayer(marker,playerName, idName, idPlayerState, idLightState, idWin) {
    let name  = playerName;
    let state = "OFF";
    let light = "red";
    let win = 0;
    let record = [];    
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
    const addMarkerToRecord = function(index) {
        record.push(index);
    }
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
    
    return {marker,record,setName, getName,changeState, changeLight, setWin, getWin, addMarkerToRecord, setToDefault}
}
// interp. player who run the game either with "X" mark or "O" mark
// Example

/*
function funForPlayer(player) {
    ...funForMarker(player.marker);    
    ...player.record;
    ...player.setName(Name);
    ...player.getName();
    ...player.changeState();
    ...player.changeLight();
    ...player.setWin();
    ...player.getWin();
    ...player.addMarkerToRecord(index); 
    ...player.setToDefault();       
}
*/
// Template rule used:
//  - Compound data
//  - reference : Marker
//  - reference : Name
//  - reference : PlayerState
//  - reference : LightState 
//  - reference : Index


// GameState data & method definition 
const GameState = function() {
    let playerON;
    let flag            = false;
    let round           = 0;
    let draw            = 0;
    const playerOne     = createPlayer("X", "", "playerOneName", "playerOneState", "playerOneLight", "playerOneWin");
    const playerTwo     = createPlayer("O", "", "playerTwoName", "playerTwoState", "playerTwoLight", "playerTwoWin");
    const listWinArea = [
        [1,2,3],
        [4,5,6],
        [7,8,9],
        [1,4,7],
        [2,5,8],
        [3,6,9],
        [1,5,9],
        [3,5,7]
    ];
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
        if(playerON.record.length === listWinArea[0].length) {
            playerON.record.sort();
            return hasSameElement(listWinArea, playerON.record);
        }
        else {
            return false
        }
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



// Helper Function For GameState 
// +++++++++++++++++++++++++++++++++++++++++++++++++++++

// (Player) -> ()
// Change State & Light of Player
function changeStateAndLight(player) {   
    player.changeState();
    player.changeLight();       
}

// (Array, Array) -> Boolean
// Return true if both array with same length is identical, false otherwise
function isTwoArraySame(arrayOne, arrayTwo) {
    for (let i = 0; i < arrayOne.length; i++ ) {
        if(!(arrayOne[i] === arrayTwo[i])) {            
            return false;
        }
    }
    return true;
}

// (Array of Array, Array) -> Boolean
// Check if an array has same element inside of array and return true, otherwise return false
function hasSameElement(listOfWin, recordArray) {
    for(let i=0; i < listOfWin.length ; i++) {
        if(isTwoArraySame(listOfWin[i], recordArray)) {
            return true
        }
    }
    return false   
}

/*
// Testing hasSameElement function
// This testing is for checking if a player can win the game
console.log("Player can win with board 1,2,3 : " + hasSameElement(listOfWinArea, [1,2,3]));
console.log("Player can win with board 4,5,6 : " + hasSameElement(listOfWinArea, [4,5,6]));
console.log("Player can win with board 7,8,9 : " + hasSameElement(listOfWinArea, [7,8,9]));
console.log("Player can win with board 1,4,7 : " + hasSameElement(listOfWinArea, [1,4,7]));
console.log("Player can win with board 2,5,8 : " + hasSameElement(listOfWinArea, [2,5,8]));
console.log("Player can win with board 3,6,9 : " + hasSameElement(listOfWinArea, [3,6,9]));
console.log("Player can win with board 1,5,9 : " + hasSameElement(listOfWinArea, [1,5,9]));
console.log("Player can win with board 3,5,7 : " + hasSameElement(listOfWinArea, [3,5,7]));

// This testing to check if player can not win the game if when the marker not in row of horizontal, vertical or diagonal
console.log("Player can win with board 1,5,6 : " + hasSameElement(listOfWinArea, [1,5,6]));
console.log("Player can win with board 4,5,9 : " + hasSameElement(listOfWinArea, [4,5,9]));
console.log("Player can win with board 2,5,7 : " + hasSameElement(listOfWinArea, [1,5,6]));
*/


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
const GameBoard = function(gameState, container) {    
    const listOfBoard = setGameBoard(9, "board", gameState, container);
    return {listOfBoard}    
}(GameState, gameBoardEl);


// GameBoard helper function
// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

// (Number, GameState, Element) -> Array
// To produce listofBoard according to the number
function setGameBoard(number, className,  gameState, container) {
    const listBoard = [];
    for (let i = 0 ; i < number; i++) {
        const board = createBoard(i, className);
        listBoard.push(board)
        container.appendChild(board.boardEl); 
        setBoardListener(board, gameState)   
    }
    return listBoard;
}

// (Board, GameState) -> ()
// To add event listener for Board Element
function setBoardListener(board, gameState) {    
    board.boardEl.addEventListener("click", function() {
        if(gameState.flag && board.boardEl.textContent === "") {
                board.boardEl.textContent = gameState.getPlayerON().marker;
                gameState.getPlayerON().addMarkerToRecord(board.index) ;          
            }
        })        
}



