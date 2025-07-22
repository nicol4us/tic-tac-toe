
// TIC TAC TOE Game


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


// Result is one of :
//  - "Win"
//  - "Draw"
//  - "PlayOn"
// interp. the result of the game
/*
function funForResult(result) {
    switch(result) {
        case "Win" :
            ... ;
            break;
        case "Draw" :
            ... ;
            break;
        case "PlayOn" :
            ... ;
            break
    }
}
*/
// Template rule used:
//  - One of : 3 cases
//  - Atomic distinct : "Win"
//  - Atomic distinct : "Draw"
//  - Atomic distinct : "PlayOn"


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

    // (Array, Number) -> ()
    // Add index for each of element of Array
    const addIndexToRecord = function (array, index) {
        array.forEach(element => {        
            element.push(index)
        });
    }

    // (Index) -> ()
    // To set index into Record
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

    // () -> ()
    // To clear all record
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



// Player Data & Method Definition 
function createPlayer(color) {
    let name            = ""
    let marker          = "";    
    let state           = "OFF"
    let light           = "red";
    let win             = 0;
    let record          = createRecord();    

    // (Name) -> ()
    // To set new name for Player
    const setName       = function(newName) {
        name = newName
    }

    // () -> Name
    // Return Name of Player
    const getName = () => name;

    // Marker -> ()
    // To set new Marker for Player
    const setMarker     = function(newMarker) { 
        marker          = newMarker           
    }  

    // () -> Marker
    // To return Marker of Player
    const getMarker = () => marker
    
    // () -> ()
    // To swap state from ON to OFF or vice versa
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

    // () -> State
    // To return State of Player
    const getState = () => state;

    // () -> ()
    // To swap light from red to green or vice versa
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
    
    // () -> Light
    // To return light of Player
    const getLight  = () => light;

    // () -> ()
    // To increase win by 1
    const setWin    = function() {
        win++;        
    }; 

    // () -> Win
    // To return Win
    const getWin    = () => win;  
    const setToDefault = function() {    
        name                = ""
        marker              = "" ;        
        state               = "OFF"   
        light               = "red"
        win                 = 0;
        record.clear();

    }        

    return {record,color, setName, getName,
        setMarker, getMarker,changeState, getState,changeLight, getLight,setWin, getWin, setToDefault}
}
// Example
//const firstPlayer = createPlayer("cyan")
//const secondPlayer = createPlayer("blue") 
/*
function funForPlayer(player) {
    ... funForRecord(player.record);
    ... player.color;
    ... player.setName(name);
    ... player.getName();
    ... player.setMarker(name);
    ... player.getMarker()
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



// GameState data & method definition 
 const GameState = function(firstPlayer, secondPlayer) {    
    let playerON                = firstPlayer
    let flag                    = false;
    let round                   = 0;
    let draw                    = 0;
    let boardRecord             = []; 
    let result ;
    const maxBoard              = 9 
    const lengthRecordToWin     = 3;   
    
    // () -> ()
    // To swap state and light between both player
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

    // (Player) -> ()
    // Change State & Light of Player
    function changeStateAndLight(player) {   
        player.changeState();
        player.changeLight();       
    }

    // () -> Player
    // To get Player who is currently play
    const getPlayerON = () => playerON;  
    
    // () -> ()
    // To increase Round by 1
    const setRound = function() {
        round = round + 1;        
    }

    // () -> Round
    // To return Round data
    const getRound = () => round;

    // () -> ()
    // To increase draw data by 1
    const setDraw = function() {    
        draw++;          
    };

    // () -> Draw
    // To return Draw data
    const getDraw = () => draw;

    // () -> Boolean
    // Return true if player win games, false otherwise
    const isPlayerOnWin = function() {  
        for(let i=0; i < playerON.record.listRecord.length; i++) {
            if(playerON.record.listRecord[i].length === lengthRecordToWin) {
                return true
            }
        } 
        return false;     
    }    

    // () -> Boolean
    // Return true if there empty board left to play, false otherwise
    const hasEmptyBoard = function() {    
        return boardRecord.length < maxBoard
    }

    // () -> ()
    // To set initial state for game to play
    const start         = function() {
        firstPlayer.setMarker("X")
        changeStateAndLight(firstPlayer)
        secondPlayer.setMarker("O")
        this.flag = true;  
        this.result = "PlayOn"
              
    }

    // (Result) -> ()
    // To set state of round result data
    const setResult    = function(newResult) {
        result  = newResult
    }

    // () -> Result
    // Return Result data
    const getResult    = () => result 

    // () -> String
    // Return message if RoundResult is Win
    const messageForWin     = () =>  "Congratulations " + playerON.getName() + ", you are the winner!!!"

    // () -> String
    // Return message if RoundResult is Draw
    const messageForDraw    = () =>  "You both get draw result"  

    // () -> String
    // Return summary for the games
    const messageForSummary = () =>  "Summary\n" 
        + firstPlayer.getName() + " get win : " + firstPlayer.getWin() + " times.\n"
        + secondPlayer.getName() +" get win : " + secondPlayer.getWin() + " times.\n"
        + "Total draw : " + draw + " times.\n" 
        + "Total round : " + round + " times."

    return {flag, boardRecord, firstPlayer, secondPlayer,
        swapPlayer, getPlayerON,setRound, getRound, setDraw, getDraw, isPlayerOnWin, hasEmptyBoard, start, setResult, getResult,messageForWin, messageForDraw, messageForSummary};
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
        for(let i=0; i < listMarker.length; i++) {
            listMarker[i] = ""
        }
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
        firstPlayerName.textContent             = gameState.firstPlayer.getName()
        firstPlayerState.textContent            = gameState.firstPlayer.getState()
        firstPlayerLight.style.backgroundColor  = gameState.firstPlayer.getLight()
        firstPlayerWin.textContent              = gameState.firstPlayer.getWin()
        secondPlayerMarker.textContent          = gameState.secondPlayer.getMarker()
        secondPlayerMarker.style.color          = gameState.secondPlayer.color
        secondPlayerName.textContent            = gameState.secondPlayer.getName()
        secondPlayerState.textContent           = gameState.secondPlayer.getState()
        secondPlayerLight.style.backgroundColor = gameState.secondPlayer.getLight()
        secondPlayerWin.textContent             = gameState.secondPlayer.getWin()
        boardContainer.childNodes.forEach((element, index) => element.textContent = gameBoard.listMarker[index])
    }

    const renderMessage     = function(text) {
        message.textContent = text
        dialog.showModal()       
    }      
    const getGameBoardElement = () => boardContainer.childNodes 
    const setStartButton = function() {
        startButton.style.backgroundColor = "green"
        endButton.disabled = true
        endButton.style.backgroundColor = "gray"
    }
    const setEndButton = function() {
        endButton.disabled = false
        endButton.style.backgroundColor = "green"
        startButton.disabled = true
        startButton.style.backgroundColor = "gray"
    }

    return {inputFirstPlayerName,inputSecondPlayerName,startButton, endButton, dialogCloseButton,dialog ,
        setGameBoardElement, render, renderMessage, getGameBoardElement, setStartButton, setEndButton}
}
// interp. to display the state and board of the game
/*
function funForGameDisplay(gameDisplay) {
    ... gameDisplay.startButton
    ... gameDisplay.endButton
    ... gameDisplay.setGameBoardElement()
    ... gameDisplay.render(funForGameState(gameState), funForGameBoard(gameBoard))
    ... gameDisplay.renderMessage(text)   
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
                gameState.setResult("Win") 
                break;             
        
        case (gameState.boardRecord.length === maxBoard) : 
            gameState.setResult("Draw") 
            break ;         
            
        case (gameState.hasEmptyBoard()) :
            gameState.setResult("PlayOn") 
            break;      
                                   
        } 
        return gameState 
    }

    // (GameBoard, GameState, Player, Player, Result) -> ()
    // To update state of Player and Game
    function updateState(gameBoard,gameDisplay,gameState) {
        switch (gameState.getResult()) {
            case "Win" :
                gameState.getPlayerON().setWin();;
                gameState.flag = false
                gameDisplay.renderMessage(gameState.messageForWin())               
                break;
            case "Draw" :
                gameState.setDraw();
                gameState.flag = false
                gameDisplay.renderMessage(gameState.messageForDraw())   
                          
                break;
            case "PlayOn" :
                gameState.swapPlayer()               
                break;
        } 
        gameDisplay.render(gameState, gameBoard)   
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
        gameState.flag = true               
        gameBoard.clearMarker()
    }
    
    const play = function() {
        listBoard.forEach(board => 
            board.addEventListener("click", function() {
                const index = parseInt(board.dataset.index)
                if(gameState.flag && (gameBoard.listMarker[index] === "")) {                       
                    const success = gameBoard.insertMarker(gameState, index)                             
                    if(success) {
                        board.style.color = gameState.getPlayerON().color             
                        updateState(gameBoard, gameDisplay, checkGameState(gameState))
                    }
                    else {
                        console.log("Error insert marker")
                    }
                }
                else {
                    console.log("Board already occupied")
                }
            })
        )
        gameDisplay.dialogCloseButton.addEventListener("click", function() {
            gameDisplay.dialog.close() 
            setPlayerForNext(gameState)
            setNextRound(gameState, gameBoard)               
            gameDisplay.render(gameState, gameBoard)                              
        })
    }   
    return {play}      
}


// Function Declarations
// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++


// () -> ()
// To running the game
function init() {                       
        const gameDisplay             = GameDisplay() 
        gameDisplay.setGameBoardElement()
        const firstPlayer = createPlayer("cyan")
        const   secondPlayer = createPlayer("blue")
        let gameState     
        const gameBoard               = GameBoard()
        let gameController 
        gameDisplay.setStartButton()      
        gameDisplay.startButton.addEventListener("click", function() {
            const minLengthName = 2;
            const firstPlayerName = gameDisplay.inputFirstPlayerName.value            
            const secondPlayerName = gameDisplay.inputSecondPlayerName.value            
            if(firstPlayerName.length >= minLengthName && secondPlayerName.length >= minLengthName) {                 
                gameState = GameState(firstPlayer,  secondPlayer)     
                gameState.firstPlayer.setName(firstPlayerName)
                gameState.secondPlayer.setName(secondPlayerName)
                gameState.start()  
                gameController = GameController(gameState, gameBoard, gameDisplay)              
                gameDisplay.render(gameState, gameBoard)
                gameController.play()
                gameDisplay.inputFirstPlayerName.hidden = true
                gameDisplay.inputSecondPlayerName.hidden = true
                gameDisplay.setEndButton()
            }
            else {
                alert("Please input correct name of yours")
            }         
            
        })
        gameDisplay.endButton.addEventListener("click", function() {            
            gameDisplay.renderMessage(gameState.messageForSummary())
            alert(gameState.messageForSummary())  
            location.reload()    
        })
}

// Function Execution
// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

init()

//module.exports = {}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        createRecord, createPlayer,GameState, GameBoard, GameDisplay, GameController, init
    };
  }