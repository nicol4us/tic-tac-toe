

const { TextEncoder, TextDecoder } = require('util');
global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;

const jsdom = require('jsdom')
const {JSDOM} = jsdom;
const dom       = new JSDOM('<!DOCTYPE html><body><div class="container"><h1>Tic Tac Toe Game</h1><div class="game-info"><div class="info-section"><div>Round</div><div>:</div><div id="round"></div></div><div class="info-section"><div>Draw</div><div>:</div><div id="draw"></div></div></div><div class="player-container"><div class="player-one-container"><div class="header">Player 1 ( <span id="playerOneMarker"></span> )</div><div class="player-section"><div class="name">Name</div><div>:</div><input id="inputPlayerOne" type="text" placeholder="Enter your name" required><div id="playerOneName"></div></div> <div class="player-section"><div class="name">Play</div><div>:</div><div id="playerOneState"></div><div id="playerOneLight"></div></div><div class="player-section"><div class="name">Win</div><div>:</div><div id="playerOneWin"></div></div></div><div class="player-two-container"><div class="header">Player 2 ( <span id="playerTwoMarker"></span> )</div><div class="player-section"><div class="name">Name</div><div>:</div><input id="inputPlayerTwo" type="text" placeholder="Enter your name" required><div id="playerTwoName"></div></div><div class="player-section"><div class="name">Play</div><div>:</div><div id="playerTwoState"></div><div id="playerTwoLight"></div></div><div class="player-section"><div class="name">Win</div><div>:</div><div id="playerTwoWin"></div></div></div></div><div class="board-container"><div class="game-board"></div></div><div class="footer"><button id="startButton">Start</button><button id="endButton">End</button></div><dialog><div id="message"></div><button id="close-dialog-button">Close</button></dialog></div></body>');
global.document = dom.window.document;
global.window   = dom.window;

