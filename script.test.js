/**
 * @jest-environment jsdom
 */

import { getByTestId } from '@testing-library/dom';
import {render, screen} from '@testing-library/jest-dom'

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



describe('Record data & method testing', () => {
    beforeEach(() => {
        document.body.innerHTML = htmlContent;
        
    });
    jest.resetModules()
    const {createRecord} = require('./script')
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
    let playerTester;

    // Set up the DOM before each test
    beforeEach(() => {
        // 1. Clear the DOM and load the HTML content
        document.body.innerHTML = htmlContent;

        // 2. IMPORTANT: Reset module cache and re-import/require your JS
        // This ensures the factory function runs against the newly loaded DOM
        jest.resetModules();
        const { createPlayer: reLoadedCreateMyPlayer } = require('./script');
        playerTester = reLoadedCreateMyPlayer("playerOneMarker", "Tester", "playerOneName", "playerOneState", "playerOneLight", "playerOneWin", "cyan"); // Re-create the object with the new DOM context
    });

    afterEach(() => {
        // Clean up the DOM after each test (optional but good practice)
        document.body.innerHTML = '';
    });

    describe("Testing Create Player factory method", () => {    

        test("Check if initial mark is  empty using getMarker method", () => {
            expect(playerTester.getMarker()).toBe("")
        })
        test("Check setMarker  and getMarker method with X mark", () => {
            playerTester.setMarker("X")
            expect(playerTester.getMarker()).toBe("X");
        })
        test('Check if getName method return "Tester"', () => {
            expect(playerTester.getName()).toBe("Tester")
        })
        test('Check setName method', () => {
            playerTester.setName("Trial");
            expect(playerTester.getName()).toBe("Trial")
        })
        test("Check getState method, initial value is OFF", () => {
            expect(playerTester.getState()).toBe("OFF")
    })
        test("Check changeState method, from OFF become ON", () => {
            playerTester.changeState();
            expect(playerTester.getState()).toBe("ON")
            playerTester.changeState();
            expect(playerTester.getState()).toBe("OFF")
        })    
        test("Check getLight method, initial value should be red", () => {
            expect(playerTester.getLight()).toBe("red")
        })
        test("Check changeLight method, from red become green and then from green to red", () => {
            expect(playerTester.getLight()).toBe("red");
            playerTester.changeLight();        
            expect(playerTester.getLight()).toBe("green")
            playerTester.changeLight();
            expect(playerTester.getLight()).toBe("red");
        })    
        test("Check getWin method, initial value should be 0", () => {
            expect(playerTester.getWin()).toBe(0);
        })
        test("Check setWin method, it should increase 1 from previous value", () => {
            playerTester.setWin();
            expect(playerTester.getWin()).toBe(1)
            playerTester.setWin()
            expect(playerTester.getWin()).toBe(2)
        })    
        test("Check record.set(index) method with index 4 then record become [[],[4],[],[],[4],[],[4],[4]]", () => {
            playerTester.record.set(4);
            expect(playerTester.record.listRecord).toEqual([[],[4],[],[],[4],[],[4],[4]])
        })
        test("Check setToDefault method, marker & name is empty, state is OFF, light is red, win is 0, record all is empty", () => {
            playerTester.setMarker("X") // Initialiaze marker
            expect(playerTester.getMarker()).toBe("X")
            playerTester.setName("TrialName") // Initialize name
            expect(playerTester.getName()).toBe("TrialName")
            playerTester.changeState(); // Change state from OFF to ON
            expect(playerTester.getState()).toBe("ON")
            playerTester.changeLight(); // Change light from red to green
            expect(playerTester.getLight()).toBe("green")
            playerTester.setWin() // Increase win count
            expect(playerTester.getWin()).toBe(1)
            playerTester.record.set(0) // Input index 0 into record
            expect(playerTester.record.listRecord).toEqual([[0],[],[],[0],[],[],[0],[]])
            playerTester.setToDefault()
            expect(playerTester.getMarker()).toBe("")
            expect(playerTester.getName()).toBe("")
            expect(playerTester.getState()).toBe("OFF")
            expect(playerTester.getLight()).toBe("red")
            expect(playerTester.getWin()).toBe(0)
            expect(playerTester.record.listRecord).toEqual([[],[],[],[],[],[],[],[]]);
        })
    }) 
} )


describe("GameState data & method testing", () => {
    let GameStateTester;
    let playerTester;
    let playerTesterTwo;

    // Set up the DOM before each test
    beforeEach(() => {
        // 1. Clear the DOM and load the HTML content
        document.body.innerHTML = htmlContent;

        // 2. IMPORTANT: Reset module cache and re-import/require your JS
        // This ensures the factory function runs against the newly loaded DOM
        jest.resetModules();
        const {GameState: reLoadedGameState, createPlayer: reLoadedCreateMyPlayer } = require('./script');
        GameStateTester = reLoadedGameState()// Re-create the object with the new DOM context
        playerTester = reLoadedCreateMyPlayer("playerOneMarker", "Tester", "playerOneName", "playerOneState", "playerOneLight", "playerOneWin", "cyan"); // Re-create the object with the new DOM context
        playerTesterTwo = reLoadedCreateMyPlayer("playerTwoMarker", "Tester Two", "playerTwoName", "playerTwoState", "playerTwoLight", "playerTwoWin", "blue")
    });

    afterEach(() => {
        // Clean up the DOM after each test (optional but good practice)
        document.body.innerHTML = '';
    });

    test("Check if GameState flag is false", () => {
        expect(GameStateTester.flag).toBeFalsy();
    })
    test("Check if GameState become true after new declaration", () => {
        GameStateTester.flag = true;
        expect(GameStateTester.flag).toBeTruthy()
    })
    test("Check setPlayerON & getPlayerON method, Player will start with X marker", () => {
        playerTester.setMarker("X")
        GameStateTester.setPlayerON(playerTester)
        expect(GameStateTester.getPlayerON().getMarker()).toBe("X")
        expect(GameStateTester.getPlayerON().getName()).toBe("Tester")        
    })
    test("Check setPlayerChange method", () => {
        GameStateTester.setPlayerON(playerTester); 
        expect(playerTester.getState()).toBe("ON")
        expect(playerTester.getLight()).toBe("green")
        GameStateTester.setPlayerChange(playerTesterTwo);
        expect(playerTesterTwo.getState()).toBe("ON")
        expect(playerTesterTwo.getLight()).toBe("green")
        expect(playerTester.getState()).toBe("OFF")
        expect(playerTester.getLight()).toBe("red")
    })
    test("Check setRound & getRound method", () => {
        expect(GameStateTester.getRound()).toBe(0);
        GameStateTester.setRound();
        expect(GameStateTester.getRound()).toBe(1);
        GameStateTester.setRound();
        expect(GameStateTester.getRound()).toBe(2)
    })
    test("Check setDraw & getDraw method", () => {
        expect(GameStateTester.getDraw()).toBe(0);
        GameStateTester.setDraw();
        expect(GameStateTester.getDraw()).toBe(1);        
        GameStateTester.setDraw();
        expect(GameStateTester.getDraw()).toBe(2)
    })
    test("Check isPlayerOnWin method", () => {
        GameStateTester.setPlayerON(playerTester);
        GameStateTester.getPlayerON().record.set(4);
        expect(GameStateTester.isPlayerOnWin()).toBeFalsy()
        GameStateTester.getPlayerON().record.set(1);
        expect(GameStateTester.isPlayerOnWin()).toBeFalsy()
        GameStateTester.getPlayerON().record.set(8);
        expect(GameStateTester.isPlayerOnWin()).toBeFalsy();
        GameStateTester.getPlayerON().record.set(7);
        expect(GameStateTester.isPlayerOnWin()).toBeTruthy();        
    })
    test("Check if there is available board to play", () => {
        GameStateTester.boardRecord.push(0) 
        expect(GameStateTester.hasEmptyBoard()).toBeTruthy()
        GameStateTester.boardRecord.push(1) 
        expect(GameStateTester.hasEmptyBoard()).toBeTruthy()
        GameStateTester.boardRecord.push(2)
        expect(GameStateTester.hasEmptyBoard()).toBeTruthy()
        GameStateTester.boardRecord.push(3)
        expect(GameStateTester.hasEmptyBoard()).toBeTruthy()
        GameStateTester.boardRecord.push(4);
        expect(GameStateTester.hasEmptyBoard()).toBeTruthy()
        GameStateTester.boardRecord.push(5) 
        expect(GameStateTester.hasEmptyBoard()).toBeTruthy()
        GameStateTester.boardRecord.push(6)
        expect(GameStateTester.hasEmptyBoard()).toBeTruthy()
        GameStateTester.boardRecord.push(7)
        expect(GameStateTester.hasEmptyBoard()).toBeTruthy()
        GameStateTester.boardRecord.push(8);
        expect(GameStateTester.hasEmptyBoard()).toBeFalsy()
    })
    test("Ceck setToInitial method, playerON is undefined, round and draw is both 0, flag is false, boardRecord is empty", () => {
        GameStateTester.setPlayerON(playerTester);
        expect(GameStateTester.getPlayerON()).toBeDefined()
        GameStateTester.flag = true;
        expect(GameStateTester.flag).toBeTruthy()
        GameStateTester.setRound();
        expect(GameStateTester.getRound()).toBe(1)
        GameStateTester.setDraw()
        expect(GameStateTester.getDraw()).toBe(1)
        GameStateTester.boardRecord.push(0)
        expect(GameStateTester.boardRecord.length).toBe(1)
        GameStateTester.setToInitial()
        expect(GameStateTester.getPlayerON()).toBeUndefined()        
        expect(GameStateTester.getRound()).toBe(0)
        expect(GameStateTester.getDraw()).toBe(0)
        expect(GameStateTester.flag).toBeFalsy()
        expect(GameStateTester.boardRecord.length).toBe(0)
    })
})


describe("GameBoard testing", () => {
    let gameBoardTester;

    // Set up the DOM before each test
    beforeEach(() => {
        // 1. Clear the DOM and load the HTML content
        document.body.innerHTML = htmlContent;

        // 2. IMPORTANT: Reset module cache and re-import/require your JS
        // This ensures the factory function runs against the newly loaded DOM
        jest.resetModules();
        const { GameBoard: reLoadedGameBoard } = require('./script');
        const gameBoardEl = document.querySelector(".game-board")
        gameBoardTester = reLoadedGameBoard(gameBoardEl); // Re-create the object with the new DOM context
    });

    afterEach(() => {
        // Clean up the DOM after each test (optional but good practice)
        document.body.innerHTML = '';
    });

    describe("Test listOfBoard attribute of GameBoard", () => {
        test("Check if there is 9 board available", () => {           
            expect(gameBoardTester.listOfBoard.length).toBe(9);
        })
        test("Check if we can put some marker into one of the board", () => {
            gameBoardTester.listOfBoard[0].boardEl.textContent = "O";
            expect(gameBoardTester.listOfBoard[0].boardEl.textContent).toBe("O")
        })
    })
    describe("Test clear method of GameBoard", () => {
        test("Check if we can erase all marker after we put all mark into GameBoard", () => {
            gameBoardTester.listOfBoard[0].boardEl.textContent = "X"
            expect(gameBoardTester.listOfBoard[0].boardEl.textContent).toBe("X")            
            gameBoardTester.listOfBoard[1].boardEl.textContent = "O"
            expect(gameBoardTester.listOfBoard[1].boardEl.textContent).toBe("O")
            gameBoardTester.listOfBoard[2].boardEl.textContent = "X"
            expect(gameBoardTester.listOfBoard[2].boardEl.textContent).toBe("X")
            gameBoardTester.listOfBoard[3].boardEl.textContent = "O"
            expect(gameBoardTester.listOfBoard[3].boardEl.textContent).toBe("O")
            gameBoardTester.listOfBoard[4].boardEl.textContent = "X"
            expect(gameBoardTester.listOfBoard[4].boardEl.textContent).toBe("X")
            gameBoardTester.listOfBoard[5].boardEl.textContent = "O"
            expect(gameBoardTester.listOfBoard[5].boardEl.textContent).toBe("O")
            gameBoardTester.listOfBoard[6].boardEl.textContent = "X"
            expect(gameBoardTester.listOfBoard[6].boardEl.textContent).toBe("X")
            gameBoardTester.listOfBoard[7].boardEl.textContent = "O"
            expect(gameBoardTester.listOfBoard[7].boardEl.textContent).toBe("O")
            gameBoardTester.listOfBoard[8].boardEl.textContent = "X"
            expect(gameBoardTester.listOfBoard[8].boardEl.textContent).toBe("X")            
            gameBoardTester.clear();
            expect(gameBoardTester.listOfBoard[0].boardEl.textContent).toBe("")
            expect(gameBoardTester.listOfBoard[1].boardEl.textContent).toBe("")
            expect(gameBoardTester.listOfBoard[2].boardEl.textContent).toBe("")
            expect(gameBoardTester.listOfBoard[3].boardEl.textContent).toBe("")
            expect(gameBoardTester.listOfBoard[4].boardEl.textContent).toBe("")
            expect(gameBoardTester.listOfBoard[5].boardEl.textContent).toBe("")
            expect(gameBoardTester.listOfBoard[6].boardEl.textContent).toBe("")
            expect(gameBoardTester.listOfBoard[7].boardEl.textContent).toBe("")
            expect(gameBoardTester.listOfBoard[8].boardEl.textContent).toBe("")
            
        })
    })
})


describe("init function testing", () => {
    let round;
    let draw;
    let inputFirstPlayerName;
    let firstPlayerMarker;
    let firstPlayerName;    
    let firstPlayerState;
    let firstPlayerLight;
    let inputSecondPlayerName;
    let secondPlayerMarker;
    let secondPlayerName;
    let secondPlayerState;
    let secondPlayerLight;   
    let dialog; 
    let messageElement;
    let startButton;
    let endButton;
    let firstInputName;
    let secondInputName;
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

        const {init} = require('./script')             
        round               = document.querySelector("#round")
        draw                = document.querySelector("#draw")
        inputFirstPlayerName= document.querySelector("#inputPlayerOne")
        firstPlayerMarker   = document.querySelector("#playerOneMarker")
        firstPlayerName     = document.querySelector("#playerOneName")
        firstPlayerState    = document.querySelector("#playerOneState")
        firstPlayerLight    = document.querySelector("#playerOneLight")
        inputSecondPlayerName = document.querySelector("#inputPlayerTwo")
        secondPlayerMarker  = document.querySelector("#playerTwoMarker")
        secondPlayerName    = document.querySelector("#playerTwoName")
        secondPlayerState   = document.querySelector("#playerTwoState")
        secondPlayerLight   = document.querySelector("#playerTwoLight")
        dialog              = document.querySelector("dialog")
        messageElement      = document.querySelector("#message")
        startButton         = document.querySelector("#startButton")
        endButton           = document.querySelector("#endButton")
        firstInputName      = "Evan"
        secondInputName     = "Dhika"
        init(startButton, endButton);
        
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

    describe("Check Game Info section for Round and Draw", () => {
        test("Check initial value of round must be 0", () => {
            expect(round.textContent).toBe("0")
        })
        test("Check initial value draw must be 0", () => {
            expect(draw.textContent).toBe("0")
        })
    })

    describe("Check First Player section", () => {
        test("Check initial marker must be empty", () => {
            expect(firstPlayerMarker.textContent).toBe("")
        })
        test("Check inital name must be empty", () => {
            expect(firstPlayerName.textContent).toBe("")
        })
        test("Check initial state must be OFF", () => {
            expect(firstPlayerState.textContent).toBe("OFF")
        })
        test("Check inital color must be red", () => {
            const computeStyle = window.getComputedStyle(firstPlayerLight)
            expect(computeStyle.backgroundColor).toBe('red')
        })
    })

    describe("Check Second Player section", () => {
        test("Check initial marker must be empty", () => {
            expect(secondPlayerMarker.textContent).toBe("")
        })
        test("Check inital name must be empty", () => {
            expect(secondPlayerName.textContent).toBe("")
        })
        test("Check initial state must be OFF", () => {
            expect(secondPlayerState.textContent).toBe("OFF")
        })
        test("Check inital color must be red", () => {
            const computeStyle = window.getComputedStyle(secondPlayerLight)
            expect(computeStyle.backgroundColor).toBe('red')
        })
    })

    describe("Check Start button section", () => {
        test("Check if Start button enable to be click", () => {
            expect(startButton).not.toBeDisabled()            
        })
        test("Check if background Start button is green", () => {
            const computeStyle = window.getComputedStyle(startButton)
            expect(computeStyle.backgroundColor).toBe("green")
        })
    })

    describe("Check End button section", () => {
        test("Check if Start button enable to be click", () => {
            expect(endButton).toBeDisabled()            
        })
        test("Check if background End button is gray", () => {
            const computeStyle = window.getComputedStyle(endButton)
            expect(computeStyle.backgroundColor).toBe("gray")
        })
    })

    describe("Check Start Button get clicked", () => {
        test("Check input when Start Button get clicked", () => {     

            inputFirstPlayerName.value = firstInputName            
            inputSecondPlayerName.value = secondInputName      
            startButton.click()
            expect(firstPlayerName.textContent).toBe("Evan")
            expect(secondPlayerName.textContent).toBe("Dhika")            
        })
        test("Check empty input when Start button get clicked", () => {
            startButton.click()
            expect(messageElement.textContent).toBe("Please insert your name properly!!")
            expect(HTMLDialogElement.prototype.showModal).toHaveBeenCalledTimes(1);
        })
        test("Check first Player state when Start Button get clicked", () => {             
            inputFirstPlayerName.value = firstInputName            
            inputSecondPlayerName.value = secondInputName            
            startButton.click()
            const computeStyle = window.getComputedStyle(firstPlayerLight)
            expect(firstPlayerMarker.textContent).toBe("X")
            expect(firstPlayerState.textContent).toBe("ON")
            expect(computeStyle.backgroundColor).toBe("green")
        })
        test("Check second player state when Start button get clicked", () => {
            inputFirstPlayerName.value = firstInputName            
            inputSecondPlayerName.value = secondInputName            
            startButton.click()
            const computeStyle = window.getComputedStyle(secondPlayerLight)
            expect(secondPlayerMarker.textContent).toBe("O")
            expect(secondPlayerState.textContent).toBe("OFF")
            expect(computeStyle.backgroundColor).toBe("red")
        })
    })

    
})
