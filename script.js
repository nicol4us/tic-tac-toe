
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


// PlayerState is one of:
//  - "ON"
//  - "OFF"
// interp. state of player to turn to play
/*
function funForPlayerState(playerState) {
    switch(playerState) {
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


// LightState is one of:
//  - "red"
//  - "green"
// interp. state of player to turn to play, red cant play while green is turn to play
/*
function funForLightState(lightState) {
    switch(lightState) {
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



function createPlayer(marker,name, playerState, lightState, idName, idPlayerState, idLightState, idWin) {
    let state = playerState;
    let light = lightState;
    let win = 0;
    const nameEl = document.querySelector("#" + idName);
    const StateEl = document.querySelector("#" + idPlayerState);
    const lightEl = document.querySelector("#"+ idLightState);
    const winEl = document.querySelector("#" + idWin) ; 
    const setState = (newState) => state = newState;
    const getState = () => state;
    const setLight = (newLight) => light = newLight;
    const getLight = () => light;
    const setWin = () => win++;
    const getWin = () => win;
    return {marker, name, nameEl, stateEl, lightEl, winEl, setState, setLight, setWin, getState, getLight, getWin}
}
// interp. player who run the game either with "X" mark or "O" mark
// Example
const playerOne = createPlayer("X", "Nicolaus", "ON", "green", "playerOneName", "playerOneState", "playerOneLight", "playerOneWin");
const playerTwo = createPlayer("O", "Dwi", "OFF", "red", "playerTwoName", "playerTwoState", "playerTwoLight", "playerTwoWin");
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