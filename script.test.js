/**
 * @jest-environment jsdom
 */

import { screen, render } from '@testing-library/dom'; // For querying the DOM
import '@testing-library/jest-dom'; // For extended matchers like .toBeInTheDocument()

const fs = require('fs');
const path = require('path');
const { library } = require('webpack');

// 1. Define the path to your index.html file
const htmlFilePath = path.resolve(__dirname, 'index.html');

// 2. Read the HTML file content as a string
let htmlContent;
try {
    htmlContent = fs.readFileSync(htmlFilePath, 'utf8');
} catch (error) {
    console.error(`Error reading HTML file: ${error.message}`);
    process.exit(1); // Exit if file cannot be read
}

// 3. Import function from script.js
const {createRecord,createPlayer, GameState, GameBoard, GameDisplay, GameController, init} = require('./script')

// 4. Initialize variable
let gameState;   
let gameBoard;
let firstPlayer;
let secondPlayer;           
let gameDisplay;
let listBoard;
let gameButton;   

beforeEach(() => {
    document.body.innerHTML = htmlContent
    jest.resetModules()

    // Mock the dialog methods for JSDOM
    // Check if the prototype exists before mocking
    if (HTMLDialogElement && HTMLDialogElement.prototype) {
        HTMLDialogElement.prototype.showModal = jest.fn();
        HTMLDialogElement.prototype.close = jest.fn();
    } else {
        // Fallback for environments where HTMLDialogElement might not be defined
        // This might happen if your JSDOM version is very old or configured differently.
        // In a typical Jest setup with JSDOM, it should be defined.
        console.warn("HTMLDialogElement.prototype not found. Dialog methods will not be mocked.");
    }         
      
    //board               = createBoard(4,"board")        
    firstPlayer             = createPlayer("Evan", "cyan")
    secondPlayer            = createPlayer("Dhika", "blue") 
    gameState               = GameState(firstPlayer, secondPlayer) 
    gameBoard               = GameBoard()                  
    gameDisplay             = GameDisplay()    
     
    //inputPlayerName     = InputPlayerName()    
    //gameButton          = GameButton()               
})
  
afterEach(() => {
    // Clean up the DOM after each test (optional but good practice)
    document.body.innerHTML = '';
    // Clear mocks after each test
    if (HTMLDialogElement && HTMLDialogElement.prototype.showModal) {
        HTMLDialogElement.prototype.showModal.mockRestore();
        HTMLDialogElement.prototype.close.mockRestore();
    }
});


describe('Record data & method testing', () => {    
    const record = createRecord();
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


describe("Player data & method testing", () => { 
    describe("Testing Create Player factory method", () => {
        test("Check if initial mark is  empty using getMarker method", () => {
            expect(firstPlayer.getMarker()).toBe("")
        })
        test("Check setMarker  and getMarker method with X mark", () => {
            firstPlayer.setMarker("X")
            expect(firstPlayer.getMarker()).toBe("X");
        })        
        test('Check name attritube first player', () => {
            expect(firstPlayer.name).toBe("Evan")
        })
        test('Check name attribute second player"', () => {                    
            expect(secondPlayer.name).toBe("Dhika")
        })
        test("Check getState method, initial value is OFF", () => {
            expect(firstPlayer.getState()).toBe("OFF")
    })
        test("Check changeState method, from OFF become ON", () => {
            firstPlayer.changeState();
            expect(firstPlayer.getState()).toBe("ON")
            firstPlayer.changeState();
            expect(firstPlayer.getState()).toBe("OFF")
        })    
        test("Check getLight method, initial value should be red", () => {
            expect(firstPlayer.getLight()).toBe("red")
        })
        test("Check changeLight method, from red become green and then from green to red", () => {
            expect(firstPlayer.getLight()).toBe("red");
            firstPlayer.changeLight();        
            expect(firstPlayer.getLight()).toBe("green")
            firstPlayer.changeLight();
            expect(firstPlayer.getLight()).toBe("red");
        })    
        test("Check getWin method, initial value should be 0", () => {
            expect(firstPlayer.getWin()).toBe(0);
        })
        test("Check setWin method, it should increase 1 from previous value", () => {
            firstPlayer.setWin();
            expect(firstPlayer.getWin()).toBe(1)
            firstPlayer.setWin()
            expect(firstPlayer.getWin()).toBe(2)
        })    
        test("Check record.set(index) method with index 4 then record become [[],[4],[],[],[4],[],[4],[4]]", () => {
            firstPlayer.record.set(4);
            expect(firstPlayer.record.listRecord).toEqual([[],[4],[],[],[4],[],[4],[4]])
        })
        test("Check setToDefault method, marker is empty, state is OFF, light is red, win is 0, record all is empty", () => {
            firstPlayer.setMarker("X") // Initialiaze marker
            expect(firstPlayer.getMarker()).toBe("X")             
            firstPlayer.changeState(); // Change state from OFF to ON
            expect(firstPlayer.getState()).toBe("ON")
            firstPlayer.changeLight(); // Change light from red to green
            expect(firstPlayer.getLight()).toBe("green")
            firstPlayer.setWin() // Increase win count
            expect(firstPlayer.getWin()).toBe(1)
            firstPlayer.record.set(0) // Input index 0 into record
            expect(firstPlayer.record.listRecord).toEqual([[0],[],[],[0],[],[],[0],[]])
            firstPlayer.setToDefault()
            expect(firstPlayer.getMarker()).toBe("")
            expect(firstPlayer.name).toBe("Evan")
            expect(firstPlayer.getState()).toBe("OFF")
            expect(firstPlayer.getLight()).toBe("red")
            expect(firstPlayer.getWin()).toBe(0)
            expect(firstPlayer.record.listRecord).toEqual([[],[],[],[],[],[],[],[]]);
        })
    }) 
} )


describe("GameState data & method testing", () => {
    test("Check if GameState flag is false", () => {
        expect(gameState.flag).toBeFalsy();
    })
    test("Check if GameState become true after start declaration", () => {
        gameState.start();
        expect(gameState.flag).toBeTruthy()
    })
    test("Check Marker, name & state after start First Player will start with X marker, second player with O", () => {
        gameState.start()
        expect(gameState.getPlayerON().getMarker()).toBe("X")
        expect(gameState.getPlayerON().name).toBe("Evan")  
        expect(firstPlayer.getState()).toBe("ON")
        expect(firstPlayer.getLight()).toBe("green")
        expect(secondPlayer.getMarker()).toBe("O")
        expect(secondPlayer.name).toBe("Dhika")      
        expect(secondPlayer.getState()).toBe("OFF")
        expect(secondPlayer.getLight()).toBe("red")
    })
    test("Check swapPlayer method", () => {
        gameState.start(); 
        gameState.swapPlayer();
        expect(firstPlayer.getState()).toBe("OFF")
        expect(firstPlayer.getLight()).toBe("red")        
        expect(secondPlayer.getState()).toBe("ON")
        expect(secondPlayer.getLight()).toBe("green")       
    })
    test("Check setRound & getRound method", () => {
        expect(gameState.getRound()).toBe(0);
        gameState.setRound();
        expect(gameState.getRound()).toBe(1);
        gameState.setRound();
        expect(gameState.getRound()).toBe(2)
    })
    test("Check setDraw & getDraw method", () => {
        expect(gameState.getDraw()).toBe(0);
        gameState.setDraw();
        expect(gameState.getDraw()).toBe(1);        
        gameState.setDraw();
        expect(gameState.getDraw()).toBe(2)
    })
    test("Check isPlayerOnWin method", () => {        
        gameState.getPlayerON().record.set(4);
        expect(gameState.isPlayerOnWin()).toBeFalsy()
        gameState.getPlayerON().record.set(1);
        expect(gameState.isPlayerOnWin()).toBeFalsy()
        gameState.getPlayerON().record.set(8);
        expect(gameState.isPlayerOnWin()).toBeFalsy();
        gameState.getPlayerON().record.set(7);
        expect(gameState.isPlayerOnWin()).toBeTruthy();        
    })
    test("Check if there is available board to play", () => {
        gameState.boardRecord.push(0) 
        expect(gameState.hasEmptyBoard()).toBeTruthy()
        gameState.boardRecord.push(1) 
        expect(gameState.hasEmptyBoard()).toBeTruthy()
        gameState.boardRecord.push(2)
        expect(gameState.hasEmptyBoard()).toBeTruthy()
        gameState.boardRecord.push(3)
        expect(gameState.hasEmptyBoard()).toBeTruthy()
        gameState.boardRecord.push(4);
        expect(gameState.hasEmptyBoard()).toBeTruthy()
        gameState.boardRecord.push(5) 
        expect(gameState.hasEmptyBoard()).toBeTruthy()
        gameState.boardRecord.push(6)
        expect(gameState.hasEmptyBoard()).toBeTruthy()
        gameState.boardRecord.push(7)
        expect(gameState.hasEmptyBoard()).toBeTruthy()
        gameState.boardRecord.push(8);
        expect(gameState.hasEmptyBoard()).toBeFalsy()
    })
    test("Ceck setToInitial method, playerON is undefined, round and draw is both 0, flag is false, boardRecord is empty", () => { 
        gameState.start()       
        expect(gameState.getPlayerON()).toBeDefined()
        gameState.flag = true;
        expect(gameState.flag).toBeTruthy()
        gameState.setRound();
        expect(gameState.getRound()).toBe(1)
        gameState.setDraw()
        expect(gameState.getDraw()).toBe(1)
        gameState.boardRecord.push(0)
        expect(gameState.boardRecord.length).toBe(1)
        gameState.setToInitial()
        expect(gameState.getPlayerON()).toBe(firstPlayer)       
        expect(gameState.getRound()).toBe(0)
        expect(gameState.getDraw()).toBe(0)
        expect(gameState.flag).toBeFalsy()
        expect(gameState.boardRecord.length).toBe(0)
    })
    test("Check win method", () => {        
        expect(gameState.messageForWin()).toBe("Congratulations Evan, you are the winner!!!")
    })
    test("Check draw method", () => {       
        expect(gameState.messageForDraw()).toBe("You both get draw result")
    })    
    test("Check summary method", () => {  
        expect(gameState.messageForSummary()).toBe("Summary:\nEvan get win : 0 times.\nDhika get win : 0 times.\nTotal draw : 0 times.\nTotal round : 0 times.")
    })
})


describe("GameBoard Testing", () => {
    beforeEach(() => {
        gameState.start()
    })
    test("Check insertMarker method using integer  number 4", () => {
        gameBoard.insertMarker(gameState, 4)
        expect(gameBoard.listMarker).toEqual(["","","","","X","","","",""])
    })
    test("Check insertMarker method for index 0 and 8", () => {
        gameBoard.insertMarker(gameState, 0)
        gameBoard.insertMarker(gameState, 8)
        expect(gameBoard.listMarker).toEqual(["X","","","","","","","","X"])
    })
    test("Check if insertMarker method return true", () => {
        expect(gameBoard.insertMarker(gameState, 2)).toBeTruthy()
    })
    test("Check insertMarker method using index -1 and 9, result must be false", () => {
        expect(gameBoard.insertMarker(gameState, -1)).toBeFalsy()
        expect(gameBoard.insertMarker(gameState, 9)).toBeFalsy()
    })
    test("Check insertMarker method using String or float data", () => {
        expect(gameBoard.insertMarker(gameState, "9")).toBeFalsy()
        expect(gameBoard.insertMarker(gameState, 4.1)).toBeFalsy()
    })
    test("Check insertMarker method if second player play", () => {
        gameBoard.insertMarker(gameState, 4)
        gameState.swapPlayer()
        gameBoard.insertMarker(gameState, 0)
        expect(gameBoard.listMarker).toEqual(["O","","","","X","","","",""])
    })
    test("Check clearMarker method", () => {
        gameBoard.insertMarker(gameState, 4)
        gameState.swapPlayer()
        gameBoard.insertMarker(gameState, 0)
        gameBoard.clearMarker()        
        expect(gameBoard.listMarker).toEqual(["","","","","","","","",""])
    })
})

describe("Game Display Testing", () => {
    describe("gameBoardElement testing", () => {
        beforeEach(() => {
            gameDisplay.setGameBoardElement()
            listBoard = document.querySelectorAll(".board")
        })
        test("Total board quantity must be 9", () => {
            expect(listBoard.length).toBe(9)
        })  
        test("Check if one of board has board class", () => {
            expect(listBoard[0].className).toBe("board")
        })      
        test("Board element for first row(0,1,2) must be present and in order", () => {                       
            expect(listBoard[0].dataset.index).toBe("0")
            expect(listBoard[1].dataset.index).toBe("1")
            expect(listBoard[2].dataset.index).toBe("2")
        })
        test("Board element for second row(3,4,5) must be present and in order", () => {                       
            expect(listBoard[3].dataset.index).toBe("3")
            expect(listBoard[4].dataset.index).toBe("4")
            expect(listBoard[5].dataset.index).toBe("5")
        })
        test("Board element for third row(6,7,8) must be present and in order", () => {                       
            expect(listBoard[6].dataset.index).toBe("6")
            expect(listBoard[7].dataset.index).toBe("7")
            expect(listBoard[8].dataset.index).toBe("8")
        })
    })

    describe("render method testing", () => {
        beforeEach(() => {
            gameState.start()
            gameDisplay.setGameBoardElement() 
            gameDisplay.render(gameState, gameBoard)           
        })
        describe("Check initial state", () => {
            test("Round value must be 0", () => {
                const round = document.querySelector("#round")
                expect(round.textContent).toBe("0")
            })
            test("Draw value must be 0", () => {
                const draw = document.querySelector("#draw")
                expect(draw.textContent).toBe("0")
            })
            test("First player marker must be X and font color is cyan", () => {
                const firstPlayerMarker = document.querySelector("#playerOneMarker")
                expect(firstPlayerMarker.textContent).toBe("X")
                expect(firstPlayerMarker.style.color).toBe("cyan")
            })
            test("First player name must be Evan", () => {
                const firstPlayerName = document.querySelector("#playerOneName")
                expect(firstPlayerName.textContent).toBe("Evan")
            })
            test("First player state must be ON", () => {
                const firstPlayerState = document.querySelector("#playerOneState")
                expect(firstPlayerState.textContent).toBe("ON")
            })
            test("First player light must be green", () => {
                const firstPlayerLight = document.querySelector("#playerOneLight")
                expect(firstPlayerLight.style.backgroundColor).toBe("green")
            })
            test("First player win must be 0", () => {
                const firstPlayerWin = document.querySelector("#playerOneWin")
                expect(firstPlayerWin.textContent).toBe("0")
            })
            test("Second player marker must be O and font color is blue", () => {
                const secondPlayerMarker = document.querySelector("#playerTwoMarker")
                expect(secondPlayerMarker.textContent).toBe("O")
                expect(secondPlayerMarker.style.color).toBe("blue")
            })
            test("Second player name must be Dhika", () => {
                const secondPlayerName = document.querySelector("#playerTwoName")
                expect(secondPlayerName.textContent).toBe("Dhika")
            })
            test("Second player state must be OFF", () => {
                const secondPlayerState = document.querySelector("#playerTwoState")
                expect(secondPlayerState.textContent).toBe("OFF")
            })
            test("Second player light must be red", () => {
                const secondPlayerLight = document.querySelector("#playerTwoLight")
                expect(secondPlayerLight.style.backgroundColor).toBe("red")
            })
            test("Second player win must be 0", () => {
                const secondPlayerWin = document.querySelector("#playerTwoWin")
                expect(secondPlayerWin.textContent).toBe("0")
            })
            test("All board element must be empty", () => {
                const allBoard = document.querySelectorAll(".board")
                expect(allBoard[0].textContent).toBe("") 
                expect(allBoard[1].textContent).toBe("")
                expect(allBoard[2].textContent).toBe("")
                expect(allBoard[3].textContent).toBe("")
                expect(allBoard[4].textContent).toBe("")
                expect(allBoard[5].textContent).toBe("")
                expect(allBoard[6].textContent).toBe("")
                expect(allBoard[7].textContent).toBe("")
                expect(allBoard[8].textContent).toBe("")
            })
        })
        describe("Check second state after first player select  board", () => {
            beforeEach(() => {
                gameBoard.insertMarker(gameState, 4)
                gameState.swapPlayer()
                gameDisplay.render(gameState, gameBoard)
            })
            test("First player state must be OFF", () => {                
                const firstPlayerState = document.querySelector("#playerOneState")
                expect(firstPlayerState.textContent).toBe("OFF")
            })
            test("First player light must be red", () => {                
                const firstPlayerLight = document.querySelector("#playerOneLight")
                expect(firstPlayerLight.style.backgroundColor).toBe("red")
            })
            test("First player win must be 0", () => {
                gameBoard.insertMarker(gameState, 4)
                gameState.swapPlayer()
                const firstPlayerWin = document.querySelector("#playerOneWin")
                expect(firstPlayerWin.textContent).toBe("0")
            })
            
            test("Second player state must be ON", () => {                
                const secondPlayerState = document.querySelector("#playerTwoState")
                expect(secondPlayerState.textContent).toBe("ON")
            })
            test("Second player light must be green", () => {                
                const secondPlayerLight = document.querySelector("#playerTwoLight")
                expect(secondPlayerLight.style.backgroundColor).toBe("green")
            })
            test("Second player win must be 0", () => {                
                const secondPlayerWin = document.querySelector("#playerTwoWin")
                expect(secondPlayerWin.textContent).toBe("0")
            })
            test("Board number 4th must have X marker", () => {                
                const allBoard = document.querySelectorAll(".board")
                expect(allBoard[0].textContent).toBe("") 
                expect(allBoard[1].textContent).toBe("")
                expect(allBoard[2].textContent).toBe("")
                expect(allBoard[3].textContent).toBe("")
                expect(allBoard[4].textContent).toBe("X")
                expect(allBoard[5].textContent).toBe("")
                expect(allBoard[6].textContent).toBe("")
                expect(allBoard[7].textContent).toBe("")
                expect(allBoard[8].textContent).toBe("")
            })
        })
        describe("Check state if First Player win using first row", () => {
            beforeEach(() => {
                gameBoard.insertMarker(gameState, 4)
                gameState.swapPlayer()                
                gameBoard.insertMarker(gameState, 3)
                gameState.swapPlayer()                
                gameBoard.insertMarker(gameState, 0)
                gameState.swapPlayer()                
                gameBoard.insertMarker(gameState, 8)
                gameState.swapPlayer()                
                gameBoard.insertMarker(gameState, 2)
                gameState.swapPlayer()                
                gameBoard.insertMarker(gameState, 6)
                gameState.swapPlayer()                
                gameBoard.insertMarker(gameState, 1)                
                gameState.getPlayerON().setWin()
                gameState.setRound()
                gameDisplay.render(gameState, gameBoard)                
            })
            test("Player ON is First Player, so it must have win", () => {
                expect(gameState.isPlayerOnWin()).toBeTruthy()
                expect(gameState.getPlayerON()).toBe(firstPlayer)
            })
            test("Round value must be 1", () => {
                const round = document.querySelector("#round")
                expect(round.textContent).toBe("1")
            })
            test("Draw value must be 0", () => {
                const draw = document.querySelector("#draw")
                expect(draw.textContent).toBe("0")
            })
            test("First player state must be ON", () => {                
                const firstPlayerState = document.querySelector("#playerOneState")
                expect(firstPlayerState.textContent).toBe("ON")
            })
            test("First player light must be green", () => {                
                const firstPlayerLight = document.querySelector("#playerOneLight")
                expect(firstPlayerLight.style.backgroundColor).toBe("green")
            })
            test("First player win must be 1", () => {
                gameBoard.insertMarker(gameState, 4)
                gameState.swapPlayer()
                const firstPlayerWin = document.querySelector("#playerOneWin")
                expect(firstPlayerWin.textContent).toBe("1")
            })
            
            test("Second player state must be OFF", () => {                
                const secondPlayerState = document.querySelector("#playerTwoState")
                expect(secondPlayerState.textContent).toBe("OFF")
            })
            test("Second player light must be red", () => {                
                const secondPlayerLight = document.querySelector("#playerTwoLight")
                expect(secondPlayerLight.style.backgroundColor).toBe("red")
            })
            test("Second player win must be 0", () => {                
                const secondPlayerWin = document.querySelector("#playerTwoWin")
                expect(secondPlayerWin.textContent).toBe("0")
            })
            test("Board first row must have X marker and also 4th, for O marker must be at 3rd, 6th and 8th", () => {                
                const allBoard = document.querySelectorAll(".board")
                expect(allBoard[0].textContent).toBe("X") 
                expect(allBoard[1].textContent).toBe("X")
                expect(allBoard[2].textContent).toBe("X")
                expect(allBoard[3].textContent).toBe("O")
                expect(allBoard[4].textContent).toBe("X")
                expect(allBoard[5].textContent).toBe("")
                expect(allBoard[6].textContent).toBe("O")
                expect(allBoard[7].textContent).toBe("")
                expect(allBoard[8].textContent).toBe("O")
            })
        })
        describe("Check state if Second player win using first column", () => {
            beforeEach(() => {
                gameBoard.insertMarker(gameState, 4)
                gameState.swapPlayer()
                gameBoard.insertMarker(gameState, 0)
                gameState.swapPlayer()
                gameBoard.insertMarker(gameState, 2)
                gameState.swapPlayer()
                gameBoard.insertMarker(gameState, 6)
                gameState.swapPlayer()
                gameBoard.insertMarker(gameState, 5)
                gameState.swapPlayer()
                gameBoard.insertMarker(gameState, 3)
                gameState.getPlayerON().setWin()
                gameState.setRound()
                gameDisplay.render(gameState, gameBoard) 
            })
            test("Player ON is Second Player, so it must have win", () => {
                expect(gameState.isPlayerOnWin()).toBeTruthy()
                expect(gameState.getPlayerON()).toBe(secondPlayer)
            })
            test("Round value must be 1", () => {
                const round = document.querySelector("#round")
                expect(round.textContent).toBe("1")
            })
            test("Draw value must be 0", () => {
                const draw = document.querySelector("#draw")
                expect(draw.textContent).toBe("0")
            })
            test("Second player state must be ON", () => {                
                const secondPlayerState = document.querySelector("#playerTwoState")
                expect(secondPlayerState.textContent).toBe("ON")
            })
            test("Second player light must be green", () => {                
                const secondPlayerLight = document.querySelector("#playerTwoLight")
                expect(secondPlayerLight.style.backgroundColor).toBe("green")
            })
            test("Second player win must be 1", () => {
               
                const secondPlayerWin = document.querySelector("#playerTwoWin")
                expect(secondPlayerWin.textContent).toBe("1")
            })
            
            test("First player state must be OFF", () => {                
                const firstPlayerState = document.querySelector("#playerOneState")
                expect(firstPlayerState.textContent).toBe("OFF")
            })
            test("First player light must be red", () => {                
                const firstPlayerLight = document.querySelector("#playerOneLight")
                expect(firstPlayerLight.style.backgroundColor).toBe("red")
            })
            test("First player win must be 0", () => {                
                const firstPlayerWin = document.querySelector("#playerOneWin")
                expect(firstPlayerWin.textContent).toBe("0")
            })
            test("Board first column must have O marker, for X marker must be at 2nd, 4rd, 5th", () => {                
                const allBoard = document.querySelectorAll(".board")
                expect(allBoard[0].textContent).toBe("O") 
                expect(allBoard[1].textContent).toBe("")
                expect(allBoard[2].textContent).toBe("X")
                expect(allBoard[3].textContent).toBe("O")
                expect(allBoard[4].textContent).toBe("X")
                expect(allBoard[5].textContent).toBe("X")
                expect(allBoard[6].textContent).toBe("O")
                expect(allBoard[7].textContent).toBe("")
                expect(allBoard[8].textContent).toBe("")
            })
        })
        describe("Check state if there is draw result", () => {
            beforeEach(() => {
                gameBoard.insertMarker(gameState, 4)
                gameState.swapPlayer()
                gameBoard.insertMarker(gameState, 0)
                gameState.swapPlayer()
                gameBoard.insertMarker(gameState, 2)
                gameState.swapPlayer()
                gameBoard.insertMarker(gameState, 6)
                gameState.swapPlayer()
                gameBoard.insertMarker(gameState, 3)
                gameState.swapPlayer()
                gameBoard.insertMarker(gameState, 5)
                gameState.swapPlayer()
                gameBoard.insertMarker(gameState, 1)
                gameState.swapPlayer()
                gameBoard.insertMarker(gameState, 7 )
                gameState.swapPlayer()
                gameBoard.insertMarker(gameState,8)
                gameState.setRound()
                gameState.setDraw()   
                gameDisplay.render(gameState, gameBoard)             
            })
            test("Player ON is First Player, so it must not win but the GameBoard must be full with marker", () => {
                expect(gameState.isPlayerOnWin()).toBeFalsy()
                expect(gameState.getPlayerON()).toBe(firstPlayer)
                expect(gameState.hasEmptyBoard()).toBeFalsy()
            })
            test("Round value must be 1", () => {
                const round = document.querySelector("#round")
                expect(round.textContent).toBe("1")
            })
            test("Draw value must be 1", () => {
                const draw = document.querySelector("#draw")
                expect(draw.textContent).toBe("1")
            })
            test("First player state must be ON", () => {                
                const firstPlayerState = document.querySelector("#playerOneState")
                expect(firstPlayerState.textContent).toBe("ON")
            })
            test("First player light must be green", () => {                
                const firstPlayerLight = document.querySelector("#playerOneLight")
                expect(firstPlayerLight.style.backgroundColor).toBe("green")
            })
            test("First player win must be 0", () => {
                gameBoard.insertMarker(gameState, 4)
                gameState.swapPlayer()
                const firstPlayerWin = document.querySelector("#playerOneWin")
                expect(firstPlayerWin.textContent).toBe("0")
            })
            
            test("Second player state must be OFF", () => {                
                const secondPlayerState = document.querySelector("#playerTwoState")
                expect(secondPlayerState.textContent).toBe("OFF")
            })
            test("Second player light must be red", () => {                
                const secondPlayerLight = document.querySelector("#playerTwoLight")
                expect(secondPlayerLight.style.backgroundColor).toBe("red")
            })
            test("Second player win must be 0", () => {                
                const secondPlayerWin = document.querySelector("#playerTwoWin")
                expect(secondPlayerWin.textContent).toBe("0")
            })
            test("All board must full with marker", () => {                
                const allBoard = document.querySelectorAll(".board")
                expect(allBoard[0].textContent).toBe("O") 
                expect(allBoard[1].textContent).toBe("X")
                expect(allBoard[2].textContent).toBe("X")
                expect(allBoard[3].textContent).toBe("X")
                expect(allBoard[4].textContent).toBe("X")
                expect(allBoard[5].textContent).toBe("O")
                expect(allBoard[6].textContent).toBe("O")
                expect(allBoard[7].textContent).toBe("O")
                expect(allBoard[8].textContent).toBe("X")
            })
        })
    })

    describe("setMessage method testing", () => {
        let mockDialog;
        let mockMessage;
         

        beforeEach(() => {
            mockDialog = document.querySelector('dialog');
            mockMessage = document.querySelector('#message');
           

            // Spy on dialog's showModal and close methods
            jest.spyOn(mockDialog, 'showModal').mockImplementation(() => {});
            
        })

        afterEach(() => {
            jest.restoreAllMocks(); // Clean up spies after each test
        });

        test('setMessage opens the dialog and sets the message text', () => {
            const testMessage = 'Hello, Test!';
            gameDisplay.renderMessage(testMessage);
    
            // Expect the message text to be set
            expect(mockMessage.textContent).toBe(testMessage);
            // Expect showModal to have been called
            expect(mockDialog.showModal).toHaveBeenCalledTimes(1);
        });
    
        
    })

    describe("getFirstPlayerName & getSecondPlayerName testing", () => {
        let mockInputFirstPlayerName;
        let mockInputSecondPlayerName;

        beforeEach(() => {
            mockInputFirstPlayerName = document.querySelector("#inputPlayerOne")
            mockInputSecondPlayerName= document.querySelector("#inputPlayerTwo")
        })

        test("First player name must be Evan", () => {
            mockInputFirstPlayerName.value = "Evan";
            expect(gameDisplay.getFirstPlayerName()).toBe("Evan")
        })
        test("Second player name must be Dhika", () => {
            mockInputSecondPlayerName.value = "Dhika"
            expect(gameDisplay.getSecondPlayerName()).toBe("Dhika")
        })

    })
})

describe("GameController testing", () => {
    let gameControler;
    let listBoard;
    let closeDialogButton;

    beforeEach(() => {
        gameDisplay.setGameBoardElement()
        gameState.start()
        listBoard = document.querySelectorAll(".board")
        closeDialogButton = document.querySelector("#close-dialog-button")
        gameControler = GameController(gameState, gameBoard, gameDisplay)
        gameControler.play()        
    })

    describe("Test click event each of board", () => {
        test("Check if board index 0 got click, must appear X marker", () => {
            listBoard[0].click()
            expect(listBoard[0].textContent).toBe("X")
        })
        test("Board[0] get click twice but the marker still X", () => {
            listBoard[0].click()
            listBoard[0].click()
            expect(listBoard[0].textContent).toBe("X")
        })
        test("Board[0] get click first, bord[1] get click so the marker board[1] will be O", () => {
            listBoard[0].click()
            listBoard[1].click()
            expect(listBoard[1].textContent).toBe("O")
        })
        test("Board index 2 to 3 will get click", () => {
            listBoard[2].click()
            expect(listBoard[2].textContent).toBe("X")
            listBoard[3].click()
            expect(listBoard[3].textContent).toBe("O")                       
                        
        })
        test("Board index 4 & 5 get clicked", () => {
            listBoard[4].click()
            expect(listBoard[4].textContent).toBe("X")
            listBoard[5].click()
            expect(listBoard[5].textContent).toBe("O")
        })
        test("Board index 6, 7 & 8 get clicked", () => {
            listBoard[6].click()
            expect(listBoard[6].textContent).toBe("X")
            listBoard[7].click()
            expect(listBoard[7].textContent).toBe("O")
            listBoard[8].click()        
            expect(listBoard[8].textContent).toBe("X") 
        })
    })
    describe("Simulate game when first player win using second row", () => {
        beforeEach(() => {
            listBoard[4].click()
            listBoard[1].click()
            listBoard[0].click()
            listBoard[8].click()
            listBoard[3].click()
            listBoard[6].click()
            listBoard[5].click()
            closeDialogButton.click()
        })
        test("Round must be 1", () => {
            const round = document.querySelector("#round")
            expect(round.textContent).toBe("1")
        })
        test("Draw must be 0", () => {
            const draw = document.querySelector("#draw")
            expect(draw.textContent).toBe("0")
        })
        test("Check First Player state, the marker must be replace with O", () => {
            const firstPlayerMarker = document.querySelector("#playerOneMarker")
            const firstPlayerState  = document.querySelector("#playerOneState")
            const firstPlayerLight  = document.querySelector("#playerOneLight")
            const firstPlayerWin    = document.querySelector("#playerOneWin")
            expect(firstPlayerMarker.textContent).toBe("O")
            expect(firstPlayerState.textContent).toBe("OFF")
            expect(firstPlayerLight.style.backgroundColor).toBe("red")
            expect(firstPlayerWin.textContent).toBe("1")
        })
        test("Check Second Player state, the marker must be replace with X because second player will start first", () => {
            const secondPlayerMarker = document.querySelector("#playerTwoMarker")
            const secondPlayerState  = document.querySelector("#playerTwoState")
            const secondPlayerLight  = document.querySelector("#playerTwoLight")
            const secondPlayerWin    = document.querySelector("#playerTwoWin")
            expect(secondPlayerMarker.textContent).toBe("X")
            expect(secondPlayerState.textContent).toBe("ON")
            expect(secondPlayerLight.style.backgroundColor).toBe("green")
            expect(secondPlayerWin.textContent).toBe("0")
        })
        test("Check message, congratulations for first player", () => {
            const message   = document.querySelector("#message")
            expect(message.textContent).toBe("Congratulations Evan, you are the winner!!!")
        })        
    })

    describe("Simulate game when second player win using third row", () => {
        beforeEach(() => {
            listBoard[4].click()
            listBoard[6].click()
            listBoard[0].click()
            listBoard[8].click()
            listBoard[1].click()            
            listBoard[7].click()
            closeDialogButton.click()
        })
        test("Round must be 1", () => {
            const round = document.querySelector("#round")
            expect(round.textContent).toBe("1")
        })
        test("Draw must be 0", () => {
            const draw = document.querySelector("#draw")
            expect(draw.textContent).toBe("0")
        })
        test("Check First Player state, the marker will still X because first player lost", () => {
            const firstPlayerMarker = document.querySelector("#playerOneMarker")
            const firstPlayerState  = document.querySelector("#playerOneState")
            const firstPlayerLight  = document.querySelector("#playerOneLight")
            const firstPlayerWin    = document.querySelector("#playerOneWin")
            expect(firstPlayerMarker.textContent).toBe("X")
            expect(firstPlayerState.textContent).toBe("ON")
            expect(firstPlayerLight.style.backgroundColor).toBe("green")
            expect(firstPlayerWin.textContent).toBe("0")
        })
        test("Check Second Player state, marker will still O", () => {
            const secondPlayerMarker = document.querySelector("#playerTwoMarker")
            const secondPlayerState  = document.querySelector("#playerTwoState")
            const secondPlayerLight  = document.querySelector("#playerTwoLight")
            const secondPlayerWin    = document.querySelector("#playerTwoWin")
            expect(secondPlayerMarker.textContent).toBe("O")
            expect(secondPlayerState.textContent).toBe("OFF")
            expect(secondPlayerLight.style.backgroundColor).toBe("red")
            expect(secondPlayerWin.textContent).toBe("1")
        })
        test("Check message, congratulations for first player", () => {
            const message   = document.querySelector("#message")
            expect(message.textContent).toBe("Congratulations Dhika, you are the winner!!!")
        })
    })

    describe("Simulate game when there is draw", () => {
        beforeEach(() => {
            listBoard[4].click()
            listBoard[6].click()
            listBoard[0].click()
            listBoard[8].click()
            listBoard[7].click()            
            listBoard[1].click()
            listBoard[5].click()
            listBoard[3].click()
            listBoard[2].click()
            closeDialogButton.click()
        })
        test("Round must be 1", () => {
            const round = document.querySelector("#round")
            expect(round.textContent).toBe("1")
        })
        test("Draw must be 1", () => {
            const draw = document.querySelector("#draw")
            expect(draw.textContent).toBe("1")
        })
        test("Check First Player state, the marker will become O", () => {
            const firstPlayerMarker = document.querySelector("#playerOneMarker")
            const firstPlayerState  = document.querySelector("#playerOneState")
            const firstPlayerLight  = document.querySelector("#playerOneLight")
            const firstPlayerWin    = document.querySelector("#playerOneWin")
            expect(firstPlayerMarker.textContent).toBe("O")
            expect(firstPlayerState.textContent).toBe("OFF")
            expect(firstPlayerLight.style.backgroundColor).toBe("red")
            expect(firstPlayerWin.textContent).toBe("0")
        })
        test("Check Second Player state, marker will become X", () => {
            const secondPlayerMarker = document.querySelector("#playerTwoMarker")
            const secondPlayerState  = document.querySelector("#playerTwoState")
            const secondPlayerLight  = document.querySelector("#playerTwoLight")
            const secondPlayerWin    = document.querySelector("#playerTwoWin")
            expect(secondPlayerMarker.textContent).toBe("X")
            expect(secondPlayerState.textContent).toBe("ON")
            expect(secondPlayerLight.style.backgroundColor).toBe("green")
            expect(secondPlayerWin.textContent).toBe("0")
        })
        test("Check message, there is draw result", () => {
            const message   = document.querySelector("#message")
            expect(message.textContent).toBe("You both get draw result")
        })
    })
    
    describe("Simulate game when first player win using second column, then second player win using first diagonal row", () => {
        beforeEach(() => {
            listBoard[4].click()
            listBoard[3].click()
            listBoard[0].click()
            listBoard[8].click()
            listBoard[1].click()
            listBoard[2].click()
            listBoard[7].click()            
            closeDialogButton.click()            
            listBoard[4].click()                       
            listBoard[7].click()
            listBoard[5].click()
            listBoard[3].click()
            listBoard[8].click()
            listBoard[2].click()            
            listBoard[0].click()
            closeDialogButton.click()
        })      
        
        test("Round must be 2", () => {
            const round = document.querySelector("#round")
            expect(round.textContent).toBe("2")
        })
        test("Draw must be 0", () => {
            const draw = document.querySelector("#draw")
            expect(draw.textContent).toBe("0")
        })
        test("Check First Player state, marker still X", () => {
            const firstPlayerMarker = document.querySelector("#playerOneMarker")
            const firstPlayerState  = document.querySelector("#playerOneState")
            const firstPlayerLight  = document.querySelector("#playerOneLight")
            const firstPlayerWin    = document.querySelector("#playerOneWin")
            expect(firstPlayerMarker.textContent).toBe("X")
            expect(firstPlayerState.textContent).toBe("ON")
            expect(firstPlayerLight.style.backgroundColor).toBe("green")
            expect(firstPlayerWin.textContent).toBe("1")
        })
        test("Check Second Player state, the marker will become O again", () => {
            const secondPlayerMarker = document.querySelector("#playerTwoMarker")
            const secondPlayerState  = document.querySelector("#playerTwoState")
            const secondPlayerLight  = document.querySelector("#playerTwoLight")
            const secondPlayerWin    = document.querySelector("#playerTwoWin")
            expect(secondPlayerMarker.textContent).toBe("O")
            expect(secondPlayerState.textContent).toBe("OFF")
            expect(secondPlayerLight.style.backgroundColor).toBe("red")
            expect(secondPlayerWin.textContent).toBe("1")
        })
        test("Check message, congratulations for second player", () => {
            const message   = document.querySelector("#message")
            expect(message.textContent).toBe("Congratulations Dhika, you are the winner!!!")
        })
              
    })

    describe("First Player win 2 times using second diagonal row & third column", () => {
        beforeEach(() => {
            listBoard[4].click()
            listBoard[1].click()
            listBoard[3].click()
            listBoard[5].click()
            listBoard[6].click()
            listBoard[0].click()
            listBoard[2].click()            
            closeDialogButton.click()            
            listBoard[4].click()                       
            listBoard[2].click()
            listBoard[0].click()
            listBoard[8].click()
            listBoard[3].click()
            listBoard[5].click()             
            closeDialogButton.click()
        })      
        
        test("Round must be 2", () => {
            const round = document.querySelector("#round")
            expect(round.textContent).toBe("2")
        })
        test("Draw must be 0", () => {
            const draw = document.querySelector("#draw")
            expect(draw.textContent).toBe("0")
        })
        test("Check First Player state, marker will be O", () => {
            const firstPlayerMarker = document.querySelector("#playerOneMarker")
            const firstPlayerState  = document.querySelector("#playerOneState")
            const firstPlayerLight  = document.querySelector("#playerOneLight")
            const firstPlayerWin    = document.querySelector("#playerOneWin")
            expect(firstPlayerMarker.textContent).toBe("O")
            expect(firstPlayerState.textContent).toBe("OFF")
            expect(firstPlayerLight.style.backgroundColor).toBe("red")
            expect(firstPlayerWin.textContent).toBe("2")
        })
        test("Check Second Player state, the marker will become O again", () => {
            const secondPlayerMarker = document.querySelector("#playerTwoMarker")
            const secondPlayerState  = document.querySelector("#playerTwoState")
            const secondPlayerLight  = document.querySelector("#playerTwoLight")
            const secondPlayerWin    = document.querySelector("#playerTwoWin")
            expect(secondPlayerMarker.textContent).toBe("X")
            expect(secondPlayerState.textContent).toBe("ON")
            expect(secondPlayerLight.style.backgroundColor).toBe("green")
            expect(secondPlayerWin.textContent).toBe("0")
        })
        test("Check message, congratulations for first player", () => {
            const message   = document.querySelector("#message")
            expect(message.textContent).toBe("Congratulations Evan, you are the winner!!!")
        })
    })
        
}) 

describe("init function testing", () => {
    beforeEach(() => {
        init()
    })
    describe("Test start and end button", () => {
        test("Start button must be enable to click")
    })
})