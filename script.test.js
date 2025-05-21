/**
 * @jest-environment jsdom
 */
const jsdom = require("jsdom")
const {JSDOM} = jsdom;
const dom       = new JSDOM('<!DOCTYPE html><body><div class="container"><h1>Tic Tac Toe Game</h1><div class="game-info"><div class="info-section"><div>Round</div><div>:</div><div id="round"></div></div><div class="info-section"><div>Draw</div><div>:</div><div id="draw"></div></div></div><div class="player-container"><div class="player-one-container"><div class="header">Player 1 ( <span id="playerOneMarker"></span> )</div><div class="player-section"><div class="name">Name</div><div>:</div><input id="inputPlayerOne" type="text" placeholder="Enter your name" required><div id="playerOneName"></div></div> <div class="player-section"><div class="name">Play</div><div>:</div><div id="playerOneState"></div><div id="playerOneLight"></div></div><div class="player-section"><div class="name">Win</div><div>:</div><div id="playerOneWin"></div></div></div><div class="player-two-container"><div class="header">Player 2 ( <span id="playerTwoMarker"></span> )</div><div class="player-section"><div class="name">Name</div><div>:</div><input id="inputPlayerTwo" type="text" placeholder="Enter your name" required><div id="playerTwoName"></div></div><div class="player-section"><div class="name">Play</div><div>:</div><div id="playerTwoState"></div><div id="playerTwoLight"></div></div><div class="player-section"><div class="name">Win</div><div>:</div><div id="playerTwoWin"></div></div></div></div><div class="board-container"><div class="game-board"></div></div><div class="footer"><button id="startButton">Start</button><button id="endButton">End</button></div><dialog><div id="message"></div><button id="close-dialog-button">Close</button></dialog></div></body>');


const {createRecord} = require('./script')

const record = createRecord();

describe('record', () => {
    test("input 0 for set method should should save index into listRecord of index 0, 3, 6", () => {
        record.set(0);
        expect(record.listRecord).toEqual([[0], [], [], [0], [], [], [0], []])
    })
    test("input 1 for set method should save index into listRecord of index 0, 4", () => {
        record.set(1);
        expect(record.listRecord).toEqual([[0,1], [], [], [0], [1], [], [0], []])
    })
    test("input 2 for set method should save index into listRecord of index 0,5,7", () => {
        record.set(2);
        expect(record.listRecord).toEqual([[0,1,2], [], [], [0], [1], [2], [0], [2]]);
    })
    test("input 3 for set method should save index into listRecord of index 1,3", () => {
        record.set(3);
        expect(record.listRecord).toEqual([[0,1,2], [3], [], [0, 3], [1], [2], [0], [2]]);
    })
    test("input 4 for set method should save index into listRecord of index 1,4,6,7", () => {
        record.set(4);
        expect(record.listRecord).toEqual([[0,1,2], [3,4], [], [0, 3], [1,4], [2], [0,4], [2,4]]);
    })
    test("input 5 for set method should save index into listRecord of index 1,5", () => {
        record.set(5);
        expect(record.listRecord).toEqual([[0,1,2], [3,4,5], [], [0,3], [1,4], [2,5], [0,4], [2,4]]);
    })
    test("input 6 for set method should save index into listRecord of index 2,3,7", () => {
        record.set(6);
        expect(record.listRecord).toEqual([[0,1,2], [3,4,5], [6], [0,3,6], [1,4], [2,5], [0,4], [2,4,6]]);
    })
    test("input 7 for set method should save index into listRecord of index 2,4", () => {
        record.set(7);
        expect(record.listRecord).toEqual([[0,1,2], [3,4,5], [6,7], [0,3,6], [1,4,7], [2,5], [0,4], [2,4,6]]);
    })
    test("input 8 for set method should save index into listRecord of index 2,5,6", () => {
        record.set(8);
        expect(record.listRecord).toEqual([[0,1,2], [3,4,5], [6,7,8], [0,3,6], [1,4,7], [2,5,8], [0,4, 8], [2,4,6]]);
    })
    test("input 9 for set method should add nothing", () => {
        record.set(9);
        expect(record.listRecord).toEqual([[0,1,2], [3,4,5], [6,7,8], [0,3,6], [1,4,7], [2,5,8], [0,4, 8], [2,4,6]]);
    })
    test("clear method will clear all element inside listRecord", () => {
        record.clear();
        expect(record.listRecord).toEqual([[], [], [], [], [], [], [], []]);
    })
})