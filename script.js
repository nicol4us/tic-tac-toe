
// TIC TAC TOE Game


// Constant Declarations
// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

const minNameLength     = 2;
const maxRowAndColumn   = 3;
const maxBoard          = 9;
const startButton       = document.querySelector("#startButton");
const endButton         = document.querySelector("#endButton");



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
    let firstRow = []
    let secondRow = []
    let thirdRow = []
    let firstColumn = []
    let secondColumn = []
    let thirdColumn = []
    let firstDiagonal = []
    let secondDiagonal = []
    let listRecord = [firstRow, secondRow, thirdRow, firstColumn, secondColumn, thirdColumn, firstDiagonal, secondDiagonal]
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
       listRecord.forEach(element => element.length = 0)
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
    const lightElement  = document.querySelector("#"+ idLightState);
    lightElement.style.backgroundColor = light;
    const winElement          = document.querySelector("#" + idWin) ; 
    winElement .textContent   = win;
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
        lightElement.style.backgroundColor = light;           
    };   
    const getLight  = () => light
    const setWin    = function() {
        win++;
        winElement .textContent = win;
    }; 
    const getWin    = () => win;  
    const setToDefault = function() {    
        marker.textContent  = "" ;
        name.textContent    = "";
        state.textContent   = "OFF"   
        light               = "red"
        win                 = 0;
        record.clear();

    }        
    return {record,color, lightElement, winElement,
        setMarker, getMarker,setName, getName,changeState, getState,changeLight, getLight,setWin, getWin, setToDefault}
}
// Example
//const firstPlayer = createPlayer("playerOneMarker", "", "playerOneName", "playerOneState", "playerOneLight", "playerOneWin", "cyan")
//const secondPlayer = createPlayer("playerTwoMarker", "", "playerTwoName", "playerTwoState", "playerTwoLight", "playerTwoWin", "blue") 
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
    let flag                    = false;
    let round                   = 0;
    let draw                    = 0;
    let boardRecord             = [];       
    const roundElement          = document.querySelector("#round");
    roundElement.textContent    = round;
    const drawElement           = document.querySelector("#draw");
    drawElement.textContent     = draw; 
    const setPlayerON = function(player) { 
        playerON = player 
        changeStateAndLight(player)      
    }
    const getPlayerON = () => playerON;
    const setPlayerChange = function(player) {  
        changeStateAndLight(playerON);
        playerON = player;
        changeStateAndLight(playerON) 
    }
    const setRound = function() {
        round++;
        roundElement.textContent = round;
    }
    const getRound = () => round;
    const setDraw = function() {    
        draw++;
        drawElement.textContent = draw;    
    };
    const getDraw = () => draw;
    const isPlayerOnWin = function() {  
        for(let i=0; i < playerON.record.listRecord.length; i++) {
            if(playerON.record.listRecord[i].length === 3) {
                return true
            }
        } 
        return false;     
    }
    const setToInitial = function() {  
        playerON = undefined;
        this.flag = false;
        round = 0;
        roundElement.textContent = 0
        draw = 0
        drawElement.textContent = 0
        boardRecord.length = 0

    }
    const hasEmptyBoard = function() {    
        return boardRecord.length < maxBoard
    }
    const start         = function(firstPlayerName, playerOne, secondPlayerName, playerTwo) {
        playerOne.setName(firstPlayerName);
        playerOne.setMarker("X");
        playerTwo.setName(secondPlayerName);
        playerTwo.setMarker("O");
        this.flag = true;
        this.setPlayerON(playerOne);
    }
    return {flag, boardRecord,roundElement, drawElement,
        setPlayerON, getPlayerON,setPlayerChange,setRound, getRound, setDraw, getDraw, isPlayerOnWin, setToInitial, hasEmptyBoard, start};
};
/*
function funForGameState(gameState) {
    ... gameState.flag;    
    ... gameState.boardRecord;
    ... gameState.setPlayerOn();
    ... funForPlayer(gameState.getPlayerON());
    ... gameState.setPlayerChange(player);
    ... gameState.setRound();
    ... funForRound(gameState.getRound());
    ... gameState.setDraw();
    ... funForDraw(gameState.getDraw());
    ... gameState.isPlayerOnWin();
    ... gameState.setToInitial();
    ... gameState.hasEmptyBoard();
}
*/
// Template rule used:
//  - Compound data
//  - Reference : Player
//  - Reference : Round
//  - Reference : Draw


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




// Message is 
const Message = function() {
    const dialog            = document.querySelector("dialog");
    const text              = document.querySelector("#message");
    const closeButton       = document.querySelector("#close-dialog-button");
    const win               = function(player) {        
        text.textContent        =  "Congratulations " + player.getName() + ", you are the winner!!!"
        dialog.showModal();
    }
    const draw              = function() {
        text.textContent        =  "You both get draw result"
        dialog.showModal();
    }
    const nameError         = function() {
        text.textContent        = "Please insert your name properly!!";
        dialog.showModal();
    }
    const close    = function() {
        closeButton.addEventListener("click", function() {
            dialog.close()
        })

    }

    return {win, draw,nameError,close}
};
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
// Template rule used:
//  - One of: 2 cases
   

// GameBoard Data & Method definition
const GameBoard = function() {   
    const container   = document.querySelector(".game-board")
    const listOfBoard = setGameBoard(9, "board", container);
    const clear = function() {
        for(let i = 0; i < listOfBoard.length; i++) {
            listOfBoard[i].boardEl.textContent = "";        
        }        
    }
    return {listOfBoard, clear}    
}; 
// interp. 9 square box to play Tic TacToe Game
/*
function forGameBoard(gameBoard) {
    ... gameBoard.listOfBoard;
    ... gameBoard.clear();
    }
*/
// Template rule used:
//  - Compound data

// GameBoard helper function
// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// (Number, String, Element) -> Array
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


// (Element, Element) -> ()
// To initialize the Tic-Tac-Toe Game
function gamePlay(startButton, endButton, gameState, gameBoard, firstPlayer, secondPlayer ,message) {       
    let inputNamePlayerOne  = document.querySelector("#inputPlayerOne")
    let inputNamePlayerTwo  = document.querySelector("#inputPlayerTwo")    
    setStartAndEndButton(startButton, endButton, "ON")
    startButton.addEventListener("click", function() {
        const firstPlayerName = inputNamePlayerOne.value       
        const secondPlayerName = inputNamePlayerTwo.value
        if(firstPlayerName.length >= minNameLength && secondPlayerName.length >= minNameLength) {
            gameState.start(firstPlayerName, firstPlayer, secondPlayerName, secondPlayer);
            setBoardListener(gameBoard, gameState, firstPlayer, secondPlayer, message)
            setStartAndEndButton(startButton, endButton, "OFF")
            inputNamePlayerOne.hidden = true;
            inputNamePlayerTwo.hidden = true;
        }
        else {
            message.nameError()
            message.close()
        }
    })
      
}


// (Button, Button, State) -> ()
// To Activate or deactivate button according to the State data
function setStartAndEndButton(startButton, endButton, state) {
    switch(state) {
        case "ON" :
            startButton.disabled = false;
            startButton.style.backgroundColor = "green" ;           
            endButton.disabled = true;  
            endButton.style.backgroundColor = "gray"                   
            break;
        case "OFF" :
            startButton.disabled = true;  
            startButton.style.backgroundColor = "gray"                    
            endButton.disabled = false;   
            endButton.style.backgroundColor = "green" 
            break;
    }
}


// (GameBoard, GameState, Message) -> ()
// To add event listener for Board Element
function setBoardListener(gameBoard, gameState,playerOne, playerTwo, message) {    
    for(let i = 0; i < gameBoard.listOfBoard.length; i++) {
        const board = gameBoard.listOfBoard[i]
        board.boardEl.addEventListener("click", function() {
            if(gameState.flag && board.boardEl.textContent === "") {                    
                    board.boardEl.textContent = gameState.getPlayerON().getMarker();
                    gameState.getPlayerON().record.set(board.index); 
                    gameState.boardRecord.push(board.index)               
                    checkGameState(gameBoard, gameState, playerOne, playerTwo, message) ;       
                }
            })
    
        }
        
}

// (GameState) -> ()
// To check if Player win, if false change the player
function checkGameState(gameBoard, gameState, playerOne, playerTwo, message) {  
    switch (true) {
        case (gameState.isPlayerOnWin()) :         
            message.win(gameState.getPlayerON())
            message.close()
            updateState(gameBoard, gameState, playerOne, playerTwo, "Win")
            break;
        case (gameState.hasEmptyBoard()) :
            changePlayer(gameState, playerOne, playerTwo)
            break; 
        case (gameState.boardRecord.length === maxBoard) :
            message.draw()
            message.close()
            updateState(gameBoard, gameState, playerOne, playerTwo, "Draw")
            break;    
    }    
}

// (GameBoard, GameState, Player, Player, Result) -> ()
// To update state of Player and Game
function updateState(gameBoard, gameState, playerOne, playerTwo, result) {
    switch (result) {
        case "Win" :
            gameState.getPlayerON().setWin();;
            break;
        case "Draw" :
            gameState.setDraw();
            break;
    }
    setPlayerForNext(gameState, playerOne, playerTwo)
    setNextRound(gameState, gameBoard)
}


//(GameState, GameBoard, Player, Player) -> ()
// To set state for next round
function setNextRound(gameState, gameBoard) {
    gameState.setRound()            
    gameState.boardRecord.length = 0;         
    gameBoard.clear() 
}

// (GameState, Player, Player) -> ()
// To swap player ON
function changePlayer(gameState, playerOne, playerTwo) {
    switch(true) {        
        case (gameState.getPlayerON().getMarker() === playerOne.getMarker()):
            gameState.setPlayerChange(playerTwo) ;
            break;
        case (gameState.getPlayerON().getMarker() === playerTwo.getMarker()):
            gameState.setPlayerChange(playerOne);
            break;
    }
}

// (GameState, Player, Player) -> ()
// To swap marker between player
function setPlayerForNext(gameState, playerOne, playerTwo) {
    const playerWin = gameState.getPlayerON() 
    switch(true)      { 
        case (playerWin == playerOne && playerOne.getMarker() === "X"):           
            playerOne.setMarker("O");
            playerTwo.setMarker("X");
            gameState.setPlayerON(playerTwo)
            changeStateAndLight(playerOne);
            break;
        case (playerWin == playerTwo && playerTwo.getMarker() === "X"):            
            playerOne.setMarker("X");
            playerTwo.setMarker("O");
            gameState.setPlayerON(playerOne)
            changeStateAndLight(playerTwo)
            break;
        case(playerWin == playerOne && playerOne.getMarker() === "O"):
            gameState.setPlayerON(playerTwo)
            changeStateAndLight(playerOne)
            break;
        case(playerWin == playerTwo && playerTwo.getMarker() === "O"):
            gameState.setPlayerON(playerOne)
            changeStateAndLight(playerTwo);
    }
    playerOne.record.clear();        
    playerTwo.record.clear(); 
}


//module.exports = {}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        createRecord, createPlayer, GameState, GameBoard, gamePlay, Message
    };
  }