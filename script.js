
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
    let roundResult;
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
        this.roundResult = "PlayOn"
              
    }
    const setRoundResult    = function(newRoundResult) {
        roundResult = newRoundResult
    }
    const getRoundResult    = () => roundResult
    const messageForWin     = () =>  "Congratulations " + playerON.name + ", you are the winner!!!"
    const messageForDraw    = () =>  "You both get draw result"  
    const messageForSummary = () =>  "Summary:\n" 
        + firstPlayer.name + " get win : " + firstPlayer.getWin() + " times.\n"
        + secondPlayer.name +" get win : " + secondPlayer.getWin() + " times.\n"
        + "Total draw : " + draw + " times.\n" 
        + "Total round : " + round + " times."
    return {flag, boardRecord, firstPlayer, secondPlayer,
        swapPlayer, getPlayerON,setRound, getRound, setDraw, getDraw, isPlayerOnWin, 
        setToInitial, hasEmptyBoard, start, setRoundResult, getRoundResult,messageForWin, messageForDraw, messageForSummary};
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



// RoundResult is one of:
//  - "Win"
//  - "Draw"
//  - "PlayOn"
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
        case "PlayOn" :
            ...;
            break;
    }
}
*/
// Template rule used:
//  - One of: 3 cases
   

// GameBoard Data & Method definition
const GameBoard = function() {        
    let listMarker = ["","","","","","","","",""];
    const insertMarker = function(gameState, index) {
        if(!(Number.isInteger(index))) {
            console.log("Your input index is not Integer number")
        }
        if((listMarker[index] === "") && index >= 0 && index <= 8) {
            listMarker[index] = gameState.getPlayerON().getMarker()
            gameState.getPlayerON().record.set(index)
            gameState.boardRecord.push(index)
            return true
        }
        else return false
    } 
    const clearMarker = function() {
        this.listMarker = ["","","","","","","","",""]        
    } 
   
    return {listMarker, insertMarker, clearMarker}    
}; 
// interp. 9 square box to play Tic TacToe Game
/*
function forGameBoard(gameBoard) {
    ... gameBoard.listMarker;
    ... gameBoard.insertMarker(gameState, indexSelected);
    ... gameBoard.clearMarker()
    }
*/
// Template rule used:
//  - Compound data


// GameDisplay is
const GameDisplay = function() {
    const round                 = document.querySelector("#round")
    const draw                  = document.querySelector("#draw")
    const inputFirstPlayerName  = document.querySelector("#inputPlayerOne")
    const inputSecondPlayerName = document.querySelector("#inputPlayerTwo")
    const firstPlayerMarker     = document.querySelector("#playerOneMarker")
    const firstPlayerName       = document.querySelector("#playerOneName")
    const firstPlayerState      = document.querySelector("#playerOneState")
    const firstPlayerLight      = document.querySelector("#playerOneLight")
    const firstPlayerWin        = document.querySelector("#playerOneWin")
    const secondPlayerMarker    = document.querySelector("#playerTwoMarker")
    const secondPlayerName      = document.querySelector("#playerTwoName")
    const secondPlayerState     = document.querySelector("#playerTwoState")
    const secondPlayerLight     = document.querySelector("#playerTwoLight")
    const secondPlayerWin       = document.querySelector("#playerTwoWin")  
    const boardContainer        = document.querySelector(".game-board")               
    const dialog                = document.querySelector("dialog")
    const message               = document.querySelector("#message")
    const dialogCloseButton     = document.querySelector("#close-dialog-button")
    const startButton           = document.querySelector("#startButton")
    const endButton             = document.querySelector("#endButton") 


    const setGameBoardElement = function() {       
        const totalBoard = 9;
        for(let i= 0; i < totalBoard; i++) {
            const board = document.createElement("div")
            board.classList.add("board")
            board.dataset.index = i
            boardContainer.appendChild(board)
        }       
    }
    const render                                = function(gameState, gameBoard) {
        round.textContent                       = gameState.getRound()
        draw.textContent                        = gameState.getDraw()
        firstPlayerMarker.textContent           = gameState.firstPlayer.getMarker()
        firstPlayerMarker.style.color           = gameState.firstPlayer.color
        firstPlayerName.textContent             = gameState.firstPlayer.name
        firstPlayerState.textContent            = gameState.firstPlayer.getState()
        firstPlayerLight.style.backgroundColor  = gameState.firstPlayer.getLight()
        firstPlayerWin.textContent              = gameState.firstPlayer.getWin()
        secondPlayerMarker.textContent          = gameState.secondPlayer.getMarker()
        secondPlayerMarker.style.color          = gameState.secondPlayer.color
        secondPlayerName.textContent            = gameState.secondPlayer.name
        secondPlayerState.textContent           = gameState.secondPlayer.getState()
        secondPlayerLight.style.backgroundColor = gameState.secondPlayer.getLight()
        secondPlayerWin.textContent             = gameState.secondPlayer.getWin()
        boardContainer.childNodes.forEach((element, index) => element.textContent = gameBoard.listMarker[index])
    }

    const renderMessage     = function(text) {
        message.textContent = text
        dialog.showModal()
        dialogCloseButton.addEventListener("click", function() {
            dialog.close()
        })
    }

    const getFirstPlayerName    = function() {
        return inputFirstPlayerName.value
    }
    const getSecondPlayerName   = function() {
        return inputSecondPlayerName.value
    }
    const getGameBoardElement = () => boardContainer.childNodes

    return {startButton, endButton, setGameBoardElement, render, renderMessage, getFirstPlayerName, getSecondPlayerName, getGameBoardElement}
}
// interp. to display the state and board of the game
/*
function funForGameDisplay(gameDisplay) {
    ... gameDisplay.startButton
    ... gameDisplay.endButton
    ... gameDisplay.setGameBoardElement()
    ... gameDisplay.render(funForGameState(gameState), funForGameBoard(gameBoard))
    ... gameDisplay.renderMessage(text)
    ... gameDisplay.getFirstPlayerName()
    ... gameDisplay.getSecondPlayerName()
    ... gameDisplay.getGameBoardElement()
}
*/
// Template rule used:
//  - Compound data
//  - Reference : GameState
//  - Reference : GameBoard











// (GameState, GameBoard, GameDisplay) -> ()
// To control logic of the Game
const GameController =   function (gameState, gameBoard, gameDisplay) {
    const listBoard = gameDisplay.getGameBoardElement()

    // (GameState) -> ()
    // To check if Player win, if false change the player
    function checkGameState(gameState) { 
        const maxBoard = 9; 
        switch (true) {
            case (gameState.isPlayerOnWin()) :       
                gameState.setRoundResult("Win") 
                break;             
        
        case (gameState.boardRecord.length === maxBoard) : 
            gameState.setRoundResult("Draw") 
            break ;         
            
        case (gameState.hasEmptyBoard()) :
            gameState.setRoundResult("PlayOn") 
            break;      
                                   
        } 
        return gameState 
    }

    // (GameBoard, GameState, Player, Player, Result) -> ()
    // To update state of Player and Game
    function updateState(gameBoard,gameDisplay,gameState) {
        switch (gameState.getRoundResult()) {
            case "Win" :
                gameState.getPlayerON().setWin();;
                gameDisplay.renderMessage(gameState.messageForWin())
                setPlayerForNext(gameState)
                setNextRound(gameState, gameBoard)               
                gameDisplay.render(gameState, gameBoard)
                break;
            case "Draw" :
                gameState.setDraw();
                gameDisplay.renderMessage(gameState.messageForDraw())                
                setPlayerForNext(gameState)
                setNextRound(gameState, gameBoard)
                gameDisplay.render(gameState, gameBoard)             
                break;
            case "PlayOn" :
                gameState.swapPlayer()
                gameDisplay.render(gameState, gameBoard)
                break;
        }    
    }

    // (GameState, Player, Player) -> ()
    // To swap marker between player
    function setPlayerForNext(gameState) {
        const playerWin = gameState.getPlayerON() 
        switch(true)      { 
            case (playerWin == gameState.firstPlayer && gameState.firstPlayer.getMarker() === "X"):           
                gameState.firstPlayer.setMarker("O");
                gameState.secondPlayer.setMarker("X");            
                break;
            case (playerWin == gameState.secondPlayer && gameState.secondPlayer.getMarker() === "X"):            
                gameState.firstPlayer.setMarker("X");
                gameState.secondPlayer.setMarker("O");                       
                break;        
        }
        gameState.swapPlayer()
        gameState.firstPlayer.record.clear();        
        gameState.secondPlayer.record.clear(); 
    }

    //(GameState, GameBoard) -> ()
    // To set state for next round
    function setNextRound(gameState, gameBoard) {
        gameState.setRound()            
        gameState.boardRecord.length = 0;         
        gameBoard.clearMarker()
    }

    // (GameBoard, GameState, Index) -> GameState
    // To put marker by Player On into Board
    function setMarkerToBoard(gameBoard, gameState, index) {
        const success = gameBoard.insertMarker(gameState, index)
        if(success) {
            return gameState
        }
        else {
            console.log("Error insert marker")
        }        
    }

    const play = function() {
        listBoard.forEach(board => 
            board.addEventListener("click", function() {
                if(board.textContent === "") {
                    const index = parseInt(board.dataset.index)                    
                    updateState(gameBoard, gameDisplay, checkGameState(setMarkerToBoard(gameBoard, gameState, index)))
                }
            })
        )
    }   
    return {play}
      
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


function init() {
        firstPlayer             = createPlayer("Evan", "cyan")
        secondPlayer            = createPlayer("Dhika", "blue") 
        gameState               = GameState(firstPlayer, secondPlayer) 
        gameBoard               = GameBoard()                  
        gameDisplay             = GameDisplay() 
        gameDisplay.setGameBoardElement()
        gameState.start()
        gameController = GameController(gameState, gameBoard, gameDisplay)
        gameController.play()

}

init()


//module.exports = {}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        createRecord, createPlayer,GameState, GameBoard, GameDisplay, GameController
    };
  }