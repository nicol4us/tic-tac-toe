
// TIC TAC TOE Game


// Constant Declarations
// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
const startButton = document.querySelector("#startButton");
const endButton = document.querySelector("#endButton");


// Data Definition
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


// GridRecord is { number: Marker }
// interp. Object to record index of board with Marker data
/*
function funForGridRecord(gridRecord) {
    ... funFormarker(gridRecord[number]) 
}
*/
// Template rule used:
//  - Compound data
//  - Reference: Marker data


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


// Index is Natural number
// interp. to record index number of Board from ListOfBoard
/*
function funForIndex(index) {
    ... index ;
}
*/
// Template rule used:
//  - Atomic non distinct: Natural number



function createPlayer(marker,playerName, idName, idPlayerState, idLightState, idWin) {
    let name  = playerName;
    let state = "OFF";
    let light = "red";
    let win = 0;
    let recordMarker = {};
    const winList =[
        {1:marker, 2:marker, 3:marker},
        {4:marker, 5:marker, 6:marker},
        {7:marker, 8:marker, 9:marker},
        {1:marker, 4:marker, 7:marker},
        {2:marker, 5:marker, 8:marker},
        {3:marker, 6:marker, 9:marker},
        {1:marker, 5:marker, 9:marker},
        {3:marker, 5:marker, 7:marker}
    ]
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
    const setLight = function(newLight) {
        light = newLight;
        lightEl.style.backgroundColor = newLight;
    };   
    const setWin = function() {
        win++;
        winEl.textContent = win;
    };
    const getWin = () => win;
    
    
    return {marker, nameEl, stateEl, lightEl, winEl,recordMarker,winList, setName, getName , changeState, setLight, setWin, getWin}
}
// interp. player who run the game either with "X" mark or "O" mark
// Example
const playerOne = createPlayer("X", "", "playerOneName", "playerOneState", "playerOneLight", "playerOneWin");
const playerTwo = createPlayer("O", "", "playerTwoName", "playerTwoState", "playerTwoLight", "playerTwoWin");
/*
function funForPlayer(player) {
    ...funForMarker(player.marker);
    ...funForName(player.name);
    ...player.nameEl;
    ...player.stateEl;
    ...player.lightEl;
    ...player.setState(PlayerState);
    ...player.setLight(LightState);
    ...player.setWin();
    ...player.get();
    ...player.getLight();
    ...player.getWin();
}
*/
// Template rule used:
//  - Compound data
//  - reference : Marker
//  - reference : Name
//  - reference : PlayerState
//  - reference : LightState 