
// TIC TAC TOE Game


// Constant Declarations
// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

const minNameLength     = 2;
const maxRowAndColumn   = 3;


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
// - ""
// - "X"
// - "O"
// interp. the mark for board from Player
/*
function  fnForMarker(marker) {
    switch(marker) { 
        case "":
            ...;
            break;       
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
//  - One of: 3 cases 
//  - Atomic distinct: ""
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
function createPlayer(name, color) {
    let marker          = "";    
    let state           = "OFF"
    let light           = "red";
    let win             = 0;
    let record          = createRecord();    
    const setMarker     = function(newMarker) { 
        marker          = newMarker           
    }  
    const getMarker = () => marker
    
    const changeState = function() {  
        switch(state) {
            case "ON" :
                state = "OFF" ;
                break
            case "OFF" :
                state = "ON" ;
                break;
        }            
    } 
    const getState = () => state;
    const changeLight = function() {  
        switch(light) {
            case "red" :
                light = "green" ;                
                break;
            case "green" :
                light = "red" ;                
                break;
        }                  
    };   
    const getLight  = () => light;
    const setWin    = function() {
        win++;        
    }; 
    const getWin    = () => win;  
    const setToDefault = function() {    
        marker              = "" ;        
        state               = "OFF"   
        light               = "red"
        win                 = 0;
        record.clear();

    }        
    return {name, record,color,
        setMarker, getMarker,changeState, getState,changeLight, getLight,setWin, getWin, setToDefault}
}
// Example
//const firstPlayer = createPlayer("Evan", "cyan")
//const secondPlayer = createPlayer("Dhika", "blue") 
/*
function funForPlayer(player) {
    ... player.name;
    ... funForRecord(player.record);
    ... player.color;
    ... player.setMarker(funForMarker(marker))
    ... player.getMarker();
    ... player.changeState();
    ... player.getState();
    ... player.changeLight();
    ... player.getLight();
    ... player.setWin();
    ... player.getWin();
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
 const GameState = function(firstPlayer, secondPlayer) {    
    let playerON                = firstPlayer
    let flag                    = false;
    let round                   = 0;
    let draw                    = 0;
    let boardRecord             = []; 
    const maxBoard              = 9 
    const lengthRecordToWin     = 3;   
    
    const swapPlayer = function() {
        if(playerON == firstPlayer) {
            playerON = secondPlayer;
            changeStateAndLight(firstPlayer)
        }
        else {
            playerON = firstPlayer
            changeStateAndLight(secondPlayer)
        }
        changeStateAndLight(playerON)
    }
    const getPlayerON = () => playerON;    
    const setRound = function() {
        round++;        
    }
    const getRound = () => round;
    const setDraw = function() {    
        draw++;          
    };
    const getDraw = () => draw;
    const isPlayerOnWin = function() {  
        for(let i=0; i < playerON.record.listRecord.length; i++) {
            if(playerON.record.listRecord[i].length === lengthRecordToWin) {
                return true
            }
        } 
        return false;     
    }
    const setToInitial = function() {
        firstPlayer.setToDefault()
        secondPlayer.setToDefault()
        playerON = firstPlayer;
        this.flag = false;
        round = 0;       
        draw = 0        
        boardRecord.length = 0

    }
    const hasEmptyBoard = function() {    
        return boardRecord.length < maxBoard
    }
    const start         = function() {
        firstPlayer.setMarker("X")
        changeStateAndLight(firstPlayer)
        secondPlayer.setMarker("O")
        this.flag = true;        
    }
    return {flag, boardRecord, firstPlayer, secondPlayer,
        swapPlayer, getPlayerON,setRound, getRound, setDraw, getDraw, isPlayerOnWin, setToInitial, hasEmptyBoard, start};
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
    const summary = function(gameState, firstPlayer, secondPlayer) {
        text.textContent = "Summary:\n" 
        + firstPlayer.getName() + " get win : " + firstPlayer.getWin() + " times.\n"
        + secondPlayer.getName() +" get win : " + secondPlayer.getWin() + " times.\n"
        + "Total draw : " + gameState.getDraw() + " times.\n" 
        + "Total round : " + gameState.getRound() + " times."
    }

    return {text, win, draw,nameError,close, summary}
};
// interp. Dialog Element to send message if player win or get draw
/*
function funForMessage(message) {    
    ... message.text;
    ... message.win(funForPlayer(player));
    ... message.draw();
    ... message.nameError();
    ... message.close();
    ... message.summary(funForGameState(gameState), funForPlayer(player), funForPlayer(player)); 
}
*/
// Template rule used:
//  - Compound data
//  - Reference : Player
//  - Reference : GameState 

// Board Data Definition
const createBoard  = function(indexList, className) {
    const index = indexList;
    const boardElement = document.createElement("div");
    boardElement.classList.add(className);
    const writeMarker = function(gameState) {
        boardElement.textContent = gameState.getPlayerON().getMarker()
        boardElement.style.color = gameState.getPlayerON().color
        gameState.getPlayerON().record.set(index)
        gameState.boardRecord.push(index)

    }
    return {index, boardElement, writeMarker}
}
/*
function funforBoard(board) {
    ... board.index;
    ... board.boardElement;
}
*/
// Rule template used:
//  - Compound data;


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
    let listMarker = ["","","","","","","","",""];
    const insertMarker = function(gameState, indexSelected) {
        if(listMarker[indexSelected] === "") {
            listMarker[indexSelected] = gameState.getPlayerON().getMarker()
            checkGameState(gameState)
        }
    }
   
    return {listMarker, insertMarker}    
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
        container.appendChild(board.boardElement);
    }        
    return listBoard;
}

// (GameState) -> ()
// To check if Player win, if false change the player
function checkGameState(gameState, message) {  
    switch (true) {
        case (gameState.isPlayerOnWin()) :         
            message.win(gameState.getPlayerON())
            message.close()
            return "Win";   
        
        case (gameState.boardRecord.length === maxBoard) :
            message.draw()
            message.close()
            return "Draw"; 
        case (gameState.hasEmptyBoard()) :           
            return "PlayOn";                        
    }    
}

// (GameBoard, GameState, Player, Player, Result) -> ()
// To update state of Player and Game
function updateState(gameBoard, gameState, firstPlayer, secondPlayer, result) {
    switch (result) {
        case "Win" :
            gameState.getPlayerON().setWin();;
            setPlayerForNext(gameState, firstPlayer, secondPlayer)
            setNextRound(gameState, gameBoard)
            break;
        case "Draw" :
            gameState.setDraw();
            setPlayerForNext(gameState, firstPlayer, secondPlayer)
            setNextRound(gameState, gameBoard)
            break;
        case "PlayOn" :
            changePlayer(gameState, firstPlayer, secondPlayer)
            break;
    }
    //setPlayerForNext(gameState, firstPlayer, secondPlayer)
    //setNextRound(gameState, gameBoard)
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
function changePlayer(gameState, firstPlayer, secondPlayer) {
    switch(true) {        
        case (gameState.getPlayerON().getMarker() === firstPlayer.getMarker()):
            gameState.setPlayerChange(secondPlayer) ;
            break;
        case (gameState.getPlayerON().getMarker() === secondPlayer.getMarker()):
            gameState.setPlayerChange(firstPlayer);
            break;
    }
}

// (GameState, Player, Player) -> ()
// To swap marker between player
function setPlayerForNext(gameState, firstPlayer, secondPlayer) {
    const playerWin = gameState.getPlayerON() 
    switch(true)      { 
        case (playerWin == firstPlayer && firstPlayer.getMarker() === "X"):           
            firstPlayer.setMarker("O");
            secondPlayer.setMarker("X");
            gameState.setPlayerON(secondPlayer)
            changeStateAndLight(firstPlayer);
            break;
        case (playerWin == secondPlayer && secondPlayer.getMarker() === "X"):            
            firstPlayer.setMarker("X");
            secondPlayer.setMarker("O");
            gameState.setPlayerON(firstPlayer)
            changeStateAndLight(secondPlayer)
            break;
        case(playerWin == firstPlayer && firstPlayer.getMarker() === "O"):
            gameState.setPlayerON(secondPlayer)
            changeStateAndLight(firstPlayer)
            break;
        case(playerWin == secondPlayer && secondPlayer.getMarker() === "O"):
            gameState.setPlayerON(firstPlayer)
            changeStateAndLight(secondPlayer);
    }
    firstPlayer.record.clear();        
    secondPlayer.record.clear(); 
}


// InputPlayerName is
const InputPlayerName = function() {
    const first     = document.querySelector("#inputPlayerOne")
    const second    = document.querySelector("#inputPlayerTwo")
    const hide      = function() {
        first.hidden    = true;
        second.hidden   = true;
    }
    return {first, second, hide}
}
// interp. Input HTML element for player name
/*
function funForInputPlayerName(inputPlayerName) {
    inputPlayerName.first...
    inputPlayerName.second...
}
*/
// Template rule used:
//  - Compound data 

// GameButton is
const GameButton = function() {
    const start   = document.querySelector("#startButton")
    const end     = document.querySelector("#endButton")
    return {start, end}
}
// interp. all button used for the game
/*
function funForGameButton(gameButton) {
    ... gameButton.start;
    ... gameButton.end;
}
*/
// Template rule used:
//  - Compound data;


// (Element, Element) -> ()
// To initialize the Tic-Tac-Toe Game
function gamePlay(gameState, gameBoard, firstPlayer, secondPlayer ,message, inputPlayerName, gameButton) {
    setButtonState(gameButton, "ON")
    gameButton.start.addEventListener("click", function() {        
        if(inputPlayerName.first.value.length >= minNameLength && inputPlayerName.second.value.length >= minNameLength) {
            gameState.start(inputPlayerName.first.value, firstPlayer, inputPlayerName.second.value, secondPlayer);            
            gameBoard.setListener(gameState, firstPlayer,secondPlayer, message)
            setButtonState(gameButton, "OFF")
            inputPlayerName.hide()
        }
        else {
            message.nameError()
            message.close()
        }
    })
    gameButton.end.addEventListener("click", function() {
        message.summary(gameState, firstPlayer, secondPlayer)
        message.close()
        setButtonState(gameButton, "OFF")
    })
      
}


// (Button, Button, State) -> ()
// To Activate or deactivate button according to the State data
function setButtonState(gameButton, state) {
    switch(state) {
        case "ON" :
            gameButton.start.disabled = false;
            gameButton.start.style.backgroundColor = "green" ;           
            gameButton.end.disabled = true;  
            gameButton.end.style.backgroundColor = "gray"                   
            break;
        case "OFF" :
            gameButton.start.disabled = true;  
            gameButton.start.style.backgroundColor = "gray"                    
            gameButton.end.disabled = false;   
            gameButton.end.style.backgroundColor = "green" 
            break;
    }
}





//module.exports = {}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        createRecord, createPlayer, createBoard,GameState, GameBoard, gamePlay, Message, InputPlayerName, GameButton
    };
  }