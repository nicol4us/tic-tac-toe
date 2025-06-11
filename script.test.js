/**
 * @jest-environment jsdom
 */

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
const {createRecord,gamePlay, GameState, GameBoard,createPlayer ,Message, InputPlayerName} = require('./script')

// 4. Initialize variable
let gameState;    
let gameBoard;
let firstPlayer;
let secondPlayer;           
let message;
let inputPlayerName;    

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
    gameState           = GameState()    
    gameBoard           = GameBoard()    
    firstPlayer         = createPlayer("playerOneMarker", "", "playerOneName", "playerOneState", "playerOneLight", "playerOneWin", "cyan")
    secondPlayer        = createPlayer("playerTwoMarker", "", "playerTwoName", "playerTwoState", "playerTwoLight", "playerTwoWin", "blue")                    
    message             = Message()
    startButton         = document.querySelector("#startButton")
    endButton           = document.querySelector("#endButton")    
    inputPlayerName     = InputPlayerName()                   
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
        test('Check setName method', () => {
            firstPlayer.setName("Trial");
            expect(firstPlayer.getName()).toBe("Trial")
        })
        test('Check if getName method return "Tester"', () => { 
            firstPlayer.setName("Tester")           
            expect(firstPlayer.getName()).toBe("Tester")
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
        test("Check setToDefault method, marker & name is empty, state is OFF, light is red, win is 0, record all is empty", () => {
            firstPlayer.setMarker("X") // Initialiaze marker
            expect(firstPlayer.getMarker()).toBe("X")
            firstPlayer.setName("TrialName") // Initialize name
            expect(firstPlayer.getName()).toBe("TrialName")
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
            expect(firstPlayer.getName()).toBe("")
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
    test("Check if GameState become true after new declaration", () => {
        gameState.flag = true;
        expect(gameState.flag).toBeTruthy()
    })
    test("Check setPlayerON & getPlayerON method, Player will start with X marker", () => {
        firstPlayer.setMarker("X")
        firstPlayer.setName("Tester")
        gameState.setPlayerON(firstPlayer)
        expect(gameState.getPlayerON().getMarker()).toBe("X")
        expect(gameState.getPlayerON().getName()).toBe("Tester")        
    })
    test("Check setPlayerChange method", () => {
        gameState.setPlayerON(firstPlayer); 
        expect(firstPlayer.getState()).toBe("ON")
        expect(firstPlayer.getLight()).toBe("green")
        gameState.setPlayerChange(secondPlayer);
        expect(secondPlayer.getState()).toBe("ON")
        expect(secondPlayer.getLight()).toBe("green")
        expect(firstPlayer.getState()).toBe("OFF")
        expect(firstPlayer.getLight()).toBe("red")
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
        gameState.setPlayerON(firstPlayer);
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
        gameState.setPlayerON(firstPlayer);
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
        expect(gameState.getPlayerON()).toBeUndefined()        
        expect(gameState.getRound()).toBe(0)
        expect(gameState.getDraw()).toBe(0)
        expect(gameState.flag).toBeFalsy()
        expect(gameState.boardRecord.length).toBe(0)
    })
})


describe("GameBoard testing", () => {
    describe("Test listOfBoard attribute of GameBoard", () => {
        test("Check if there is 9 board available", () => {           
            expect(gameBoard.listOfBoard.length).toBe(9);
        })
        test("Check if we can put some marker into one of the board", () => {
            gameBoard.listOfBoard[0].boardElement.textContent = "O";
            expect(gameBoard.listOfBoard[0].boardElement.textContent).toBe("O")
        })
    })
    describe("Test clear method of GameBoard", () => {
        test("Check if we can erase all marker after we put all mark into GameBoard", () => {
            gameBoard.listOfBoard[0].boardElement.textContent = "X"
            expect(gameBoard.listOfBoard[0].boardElement.textContent).toBe("X")            
            gameBoard.listOfBoard[1].boardElement.textContent = "O"
            expect(gameBoard.listOfBoard[1].boardElement.textContent).toBe("O")
            gameBoard.listOfBoard[2].boardElement.textContent = "X"
            expect(gameBoard.listOfBoard[2].boardElement.textContent).toBe("X")
            gameBoard.listOfBoard[3].boardElement.textContent = "O"
            expect(gameBoard.listOfBoard[3].boardElement.textContent).toBe("O")
            gameBoard.listOfBoard[4].boardElement.textContent = "X"
            expect(gameBoard.listOfBoard[4].boardElement.textContent).toBe("X")
            gameBoard.listOfBoard[5].boardElement.textContent = "O"
            expect(gameBoard.listOfBoard[5].boardElement.textContent).toBe("O")
            gameBoard.listOfBoard[6].boardElement.textContent = "X"
            expect(gameBoard.listOfBoard[6].boardElement.textContent).toBe("X")
            gameBoard.listOfBoard[7].boardElement.textContent = "O"
            expect(gameBoard.listOfBoard[7].boardElement.textContent).toBe("O")
            gameBoard.listOfBoard[8].boardElement.textContent = "X"
            expect(gameBoard.listOfBoard[8].boardElement.textContent).toBe("X")            
            gameBoard.clear();
            expect(gameBoard.listOfBoard[0].boardElement.textContent).toBe("")
            expect(gameBoard.listOfBoard[1].boardElement.textContent).toBe("")
            expect(gameBoard.listOfBoard[2].boardElement.textContent).toBe("")
            expect(gameBoard.listOfBoard[3].boardElement.textContent).toBe("")
            expect(gameBoard.listOfBoard[4].boardElement.textContent).toBe("")
            expect(gameBoard.listOfBoard[5].boardElement.textContent).toBe("")
            expect(gameBoard.listOfBoard[6].boardElement.textContent).toBe("")
            expect(gameBoard.listOfBoard[7].boardElement.textContent).toBe("")
            expect(gameBoard.listOfBoard[8].boardElement.textContent).toBe("")            
        })
    })
})


describe("gamePlay function testing initial state", () => {        
    beforeEach(() => {               
        gamePlay(startButton, endButton, gameState, GameBoard(), firstPlayer, secondPlayer,message, inputPlayerName);        
    })   
    describe("Check Game Info section for Round and Draw", () => {
        test("Check initial value of round must be 0", () => {
            expect(gameState.roundElement.textContent).toBe("0")
        })
        test("Check initial value draw must be 0", () => {
            expect(gameState.drawElement.textContent).toBe("0")
        })
    })
    describe("Check First Player section", () => {
        test("Check initial marker must be empty", () => {
            expect(firstPlayer.getMarker()).toBe("")
        })
        test("Check inital name must be empty", () => {
            expect(firstPlayer.getName()).toBe("")
        })
        test("Check initial state must be OFF", () => {
            expect(firstPlayer.getState()).toBe("OFF")
        })
        test("Check inital color must be red", () => {
            const computeStyle = window.getComputedStyle(firstPlayer.lightElement)
            expect(computeStyle.backgroundColor).toBe('red')
        })
        test("Check initial win value must be zero", () => {
            expect(firstPlayer.winElement.textContent).toBe("0")
        })
    })
    describe("Check Second Player section", () => {
        test("Check initial marker must be empty", () => {
            expect(secondPlayer.getMarker()).toBe("")
        })
        test("Check inital name must be empty", () => {
            expect(secondPlayer.getName()).toBe("")
        })
        test("Check initial state must be OFF", () => {
            expect(secondPlayer.getState()).toBe("OFF")
        })
        test("Check initial color must be red", () => {
            const computeStyle = window.getComputedStyle(secondPlayer.lightElement)
            expect(computeStyle.backgroundColor).toBe('red')
        })
        test("Check initial win value must be zero", () => {
            expect(secondPlayer.winElement.textContent).toBe("0")
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
        test("Check if End button not enable to be click", () => {
            expect(endButton).toBeDisabled()            
        })
        test("Check if background End button is gray", () => {
            const computeStyle = window.getComputedStyle(endButton)
            expect(computeStyle.backgroundColor).toBe("gray")
        })
    })
    describe("Check Start Button get clicked", () => {        
        test("Check empty input when Start button get clicked", () => {
            startButton.click()
            expect(message.text.textContent).toBe("Please insert your name properly!!")
            expect(HTMLDialogElement.prototype.showModal).toHaveBeenCalledTimes(1);
        })                
    })    
})


describe("gamePlay testing state after Start button get clicked", () => {     
    beforeEach(() => {        
        inputPlayerName.first.value    = "Evan"            
        inputPlayerName.second.value   = "Dhika"
        gamePlay(startButton, endButton, gameState, gameBoard, firstPlayer, secondPlayer,message, inputPlayerName);
        startButton.click()        
    })    
    describe("Check Start and End Button state", () => {
        test("Check if Start button get disable & End button get enable when Start button got clicked", () => {            
            const computeStyleStartButton = window.getComputedStyle(startButton)
            const computeStyleEndButton     = window.getComputedStyle(endButton)
            expect(startButton).toBeDisabled()
            expect(computeStyleStartButton.backgroundColor).toBe("gray")
            expect(endButton).not.toBeDisabled()
            expect(computeStyleEndButton.backgroundColor).toBe("green")
        })        
    })
    describe("Check Input state after Start got clicked", () => {
        test("Check if both input element get hidden when Start Button got clicked", () => {            
            expect(inputPlayerName.first.hidden).toBeTruthy()
            expect(inputPlayerName.second.hidden).toBeTruthy()
        })        
    })
    describe("Check First Player state", () => {
        test("First player name must be Evan", () => {
            expect(firstPlayer.getName()).toBe("Evan")
        })
        test("First player marker must be X", () => {
            expect(firstPlayer.getMarker()).toBe("X")
        })
        test("First player state must be ON", () => {
            expect(firstPlayer.getState()).toBe("ON")
        })
        test("First player light must turn green", () => {
            const firstPlayerLight = window.getComputedStyle(firstPlayer.lightElement)
            expect(firstPlayerLight.backgroundColor).toBe("green")
        })
    })
    describe("Check Second Player state", () => {
        test("Second player name must be Dhika", () => {
            expect(secondPlayer.getName()).toBe("Dhika")
        })
        test("First player marker must be X", () => {
            expect(secondPlayer.getMarker()).toBe("O")
        })
        test("Second player state must be OFF", () => {
            expect(secondPlayer.getState()).toBe("OFF")
        })
        test("Second player light must turn red", () => {
            const secondPlayerLight = window.getComputedStyle(secondPlayer.lightElement)
            expect(secondPlayerLight.backgroundColor).toBe("red")
        })
    })
})

describe("gamePlay testing when first GameBoard index 4 got clicked", () => {      
    beforeEach(() => {              
        inputPlayerName.first.value    = "Evan"            
        inputPlayerName.second.value   = "Dhika"
        gamePlay(startButton, endButton, gameState, gameBoard, firstPlayer, secondPlayer,message, inputPlayerName);
        startButton.click()  
        gameBoard.listOfBoard[4].boardElement.click()      
    })
    describe("Check first player state", () => {
        test("First player state must be off", () => {
            expect(firstPlayer.getState()).toBe("OFF")
        })
        test("First player light must be red", () => {
            const firstPlayerLight = window.getComputedStyle(firstPlayer.lightElement)
            expect(firstPlayerLight.backgroundColor).toBe("red")
        })
    })
    describe("Check Second Player state", () => {        
        test("Second player state must be ON", () => {
            expect(secondPlayer.getState()).toBe("ON")
        })
        test("Second player light must turn green", () => {
            const secondPlayerLight = window.getComputedStyle(secondPlayer.lightElement)
            expect(secondPlayerLight.backgroundColor).toBe("green")
        })
    })    
    describe("Check Gameboard state", () => {
        test("GameBoard index 4 must have X marker", () => {
            expect(gameBoard.listOfBoard[4].boardElement.textContent).toBe("X")
        })
    })
    describe("Check  state if GameBoard index 1 got clicked", () => {
        test("Check first, second player & gameboard state", () => {
            gameBoard.listOfBoard[1].boardElement.click()
            const firstPlayerLight = window.getComputedStyle(firstPlayer.lightElement)
            const secondPlayerLight = window.getComputedStyle(secondPlayer.lightElement)
            expect(firstPlayer.getState()).toBe("ON")
            expect(firstPlayerLight.backgroundColor).toBe("green")
            expect(secondPlayer.getState()).toBe("OFF")
            expect(secondPlayerLight.backgroundColor).toBe("red")
            expect(gameBoard.listOfBoard[1].boardElement.textContent).toBe("O")
        })        
    })
})

describe("Game play simulation", () => {      
    beforeEach(() => {         
        inputPlayerName.first.value    = "Evan"            
        inputPlayerName.second.value   = "Dhika"
        gamePlay(startButton, endButton, gameState, gameBoard, firstPlayer, secondPlayer,message, inputPlayerName);
        startButton.click()               
    })     
    

    
    describe("Check state if First Player win using first diagonal row", () => {
        test("Second player get X marker after loose and play first  for next , first player get win become 1, round also 1", () => {
            gameBoard.listOfBoard[4].boardElement.click()
            gameBoard.listOfBoard[1].boardElement.click()
            gameBoard.listOfBoard[0].boardElement.click()
            gameBoard.listOfBoard[6].boardElement.click()
            gameBoard.listOfBoard[8].boardElement.click()
            const firstPlayerLight = window.getComputedStyle(firstPlayer.lightElement)
            const secondPlayerLight = window.getComputedStyle(secondPlayer.lightElement)
            expect(firstPlayer.getMarker()).toBe("O")
            expect(firstPlayer.getState()).toBe("OFF")
            expect(firstPlayerLight.backgroundColor).toBe("red")
            expect(firstPlayer.winElement.textContent).toBe("1")
            expect(secondPlayer.getMarker()).toBe("X")
            expect(secondPlayer.getState()).toBe("ON")
            expect(secondPlayerLight.backgroundColor).toBe("green")
            expect(secondPlayer.winElement.textContent).toBe("0")
            expect(gameState.roundElement.textContent).toBe("1")
        })
    })
    describe("Check state if Second Player win using first row", () => {
        test("Second player still get O marker after win, second player get win become 1, round also 1", () => {
            gameBoard.listOfBoard[4].boardElement.click()
            gameBoard.listOfBoard[1].boardElement.click()
            gameBoard.listOfBoard[8].boardElement.click()
            gameBoard.listOfBoard[0].boardElement.click()
            gameBoard.listOfBoard[5].boardElement.click()
            gameBoard.listOfBoard[2].boardElement.click()
            const firstPlayerLight = window.getComputedStyle(firstPlayer.lightElement)
            const secondPlayerLight = window.getComputedStyle(secondPlayer.lightElement)
            expect(firstPlayer.getMarker()).toBe("X")
            expect(firstPlayer.getState()).toBe("ON")
            expect(firstPlayerLight.backgroundColor).toBe("green")
            expect(firstPlayer.winElement.textContent).toBe("0")
            expect(secondPlayer.getMarker()).toBe("O")
            expect(secondPlayer.getState()).toBe("OFF")
            expect(secondPlayerLight.backgroundColor).toBe("red")
            expect(secondPlayer.winElement.textContent).toBe("1")
        })
    })
    describe("Check message if first Player win using third column", () => {
        test("Message to congratulate First player has to appear", () => {
            gameBoard.listOfBoard[4].boardElement.click()
            gameBoard.listOfBoard[1].boardElement.click()
            gameBoard.listOfBoard[8].boardElement.click()
            gameBoard.listOfBoard[0].boardElement.click()
            gameBoard.listOfBoard[2].boardElement.click()
            gameBoard.listOfBoard[6].boardElement.click()
            gameBoard.listOfBoard[5].boardElement.click()
            expect(message.text.textContent).toBe("Congratulations " + firstPlayer.getName() + ", you are the winner!!!")            
        })
    })
    describe("Check message if second Player win using first column", () => {
        test("Message to congratulate First player has to appear", () => {
            gameBoard.listOfBoard[4].boardElement.click()
            gameBoard.listOfBoard[0].boardElement.click()
            gameBoard.listOfBoard[2].boardElement.click()
            gameBoard.listOfBoard[6].boardElement.click()
            gameBoard.listOfBoard[8].boardElement.click()
            gameBoard.listOfBoard[3].boardElement.click()            
            expect(message.text.textContent).toBe("Congratulations " + secondPlayer.getName() + ", you are the winner!!!")            
        })
    })
    describe("Check state when First Player win two times a row using secondDiagonal and third row", () => {
        test("Expect first player has win 2 against 0 with last marker is O, state is OFF and light is red", () => {
            gameBoard.listOfBoard[4].boardElement.click()
            gameBoard.listOfBoard[1].boardElement.click()
            gameBoard.listOfBoard[3].boardElement.click()
            gameBoard.listOfBoard[5].boardElement.click()
            gameBoard.listOfBoard[6].boardElement.click()
            gameBoard.listOfBoard[0].boardElement.click()
            gameBoard.listOfBoard[2].boardElement.click()
            message.close()           
            gameBoard.listOfBoard[4].boardElement.click()
            gameBoard.listOfBoard[6].boardElement.click()
            gameBoard.listOfBoard[0].boardElement.click()
            gameBoard.listOfBoard[8].boardElement.click()
            gameBoard.listOfBoard[3].boardElement.click()
            gameBoard.listOfBoard[7].boardElement.click()                       
            const firstPlayerLight = window.getComputedStyle(firstPlayer.lightElement)
            const secondPlayerLight = window.getComputedStyle(secondPlayer.lightElement)
            expect(firstPlayer.getMarker()).toBe("O")
            expect(firstPlayer.getState()).toBe("OFF")
            expect(firstPlayerLight.backgroundColor).toBe("red")
            expect(firstPlayer.winElement.textContent).toBe("2")
            expect(secondPlayer.getMarker()).toBe("X")
            expect(secondPlayer.getState()).toBe("ON")
            expect(secondPlayerLight.backgroundColor).toBe("green")
            expect(secondPlayer.winElement.textContent).toBe("0")
            expect(gameState.roundElement.textContent).toBe("2")
        })
    })
    describe("Check state when First Player 1 times second column and Second player win 1 times using second row", () => {
        test("Expect first player & second player has win 1  each. with First player last marker is X, state is ON and light is green", () => {
            gameBoard.listOfBoard[4].boardElement.click()
            gameBoard.listOfBoard[3].boardElement.click()
            gameBoard.listOfBoard[0].boardElement.click()
            gameBoard.listOfBoard[8].boardElement.click()
            gameBoard.listOfBoard[1].boardElement.click()
            gameBoard.listOfBoard[2].boardElement.click()
            gameBoard.listOfBoard[7].boardElement.click()
            message.close()           
            gameBoard.listOfBoard[4].boardElement.click()
            gameBoard.listOfBoard[1].boardElement.click()
            gameBoard.listOfBoard[0].boardElement.click()
            gameBoard.listOfBoard[8].boardElement.click()
            gameBoard.listOfBoard[3].boardElement.click()
            gameBoard.listOfBoard[7].boardElement.click()   
            gameBoard.listOfBoard[5].boardElement.click()                    
            const firstPlayerLight = window.getComputedStyle(firstPlayer.lightElement)
            const secondPlayerLight = window.getComputedStyle(secondPlayer.lightElement)
            expect(firstPlayer.getMarker()).toBe("X")
            expect(firstPlayer.getState()).toBe("ON")
            expect(firstPlayerLight.backgroundColor).toBe("green")
            expect(firstPlayer.winElement.textContent).toBe("1")
            expect(secondPlayer.getMarker()).toBe("O")
            expect(secondPlayer.getState()).toBe("OFF")
            expect(secondPlayerLight.backgroundColor).toBe("red")
            expect(secondPlayer.winElement.textContent).toBe("1")
            expect(gameState.roundElement.textContent).toBe("2")
        })
    })
    describe("Check for draw result", () => {
        test("Expect message for draw, second player change marker to X and get ON and green after draw result", () => {
            gameBoard.listOfBoard[4].boardElement.click()
            gameBoard.listOfBoard[0].boardElement.click()
            gameBoard.listOfBoard[2].boardElement.click()
            gameBoard.listOfBoard[6].boardElement.click()
            gameBoard.listOfBoard[1].boardElement.click()
            gameBoard.listOfBoard[7].boardElement.click()  
            gameBoard.listOfBoard[3].boardElement.click()
            gameBoard.listOfBoard[5].boardElement.click()
            gameBoard.listOfBoard[8].boardElement.click()
            const firstPlayerLight = window.getComputedStyle(firstPlayer.lightElement)
            const secondPlayerLight = window.getComputedStyle(secondPlayer.lightElement)
            expect(message.text.textContent).toBe("You both get draw result")
            expect(firstPlayer.getMarker()).toBe("O")
            expect(firstPlayer.getState()).toBe("OFF")
            expect(firstPlayerLight.backgroundColor).toBe("red")
            expect(firstPlayer.winElement.textContent).toBe("0")
            expect(secondPlayer.getMarker()).toBe("X")
            expect(secondPlayer.getState()).toBe("ON")
            expect(secondPlayerLight.backgroundColor).toBe("green")
            expect(secondPlayer.winElement.textContent).toBe("0")
            expect(gameState.drawElement.textContent).toBe("1")
        })
    })
    describe("Check message if Game is finish", () => {
        test("Message summary when first player win 2 times a row for 2 round and end the game", () => {
            gameBoard.listOfBoard[4].boardElement.click()
            gameBoard.listOfBoard[1].boardElement.click()
            gameBoard.listOfBoard[3].boardElement.click()
            gameBoard.listOfBoard[5].boardElement.click()
            gameBoard.listOfBoard[6].boardElement.click()
            gameBoard.listOfBoard[0].boardElement.click()
            gameBoard.listOfBoard[2].boardElement.click()
            message.close()           
            gameBoard.listOfBoard[4].boardElement.click()
            gameBoard.listOfBoard[6].boardElement.click()
            gameBoard.listOfBoard[0].boardElement.click()
            gameBoard.listOfBoard[8].boardElement.click()
            gameBoard.listOfBoard[3].boardElement.click()
            gameBoard.listOfBoard[7].boardElement.click() 
            message.close()
            endButton.click()
            expect(message.text.textContent).toBe(
                "Summary:\nEvan get win : 2 times.\nDhika get win : 0 times.\nTotal draw : 0 times.\nTotal round : 2 times.")
        })
    })
    describe("Check Message after click End button ", () => {
        test("Total round 3, draw 1, and each player get 1 win", () => {
            gameBoard.listOfBoard[4].boardElement.click()
            gameBoard.listOfBoard[3].boardElement.click()
            gameBoard.listOfBoard[0].boardElement.click()
            gameBoard.listOfBoard[8].boardElement.click()
            gameBoard.listOfBoard[1].boardElement.click()
            gameBoard.listOfBoard[2].boardElement.click()
            gameBoard.listOfBoard[7].boardElement.click()
            message.close()           
            gameBoard.listOfBoard[4].boardElement.click()
            gameBoard.listOfBoard[1].boardElement.click()
            gameBoard.listOfBoard[0].boardElement.click()
            gameBoard.listOfBoard[8].boardElement.click()
            gameBoard.listOfBoard[3].boardElement.click()
            gameBoard.listOfBoard[7].boardElement.click()   
            gameBoard.listOfBoard[5].boardElement.click() 
            message.close()
            gameBoard.listOfBoard[4].boardElement.click()
            gameBoard.listOfBoard[0].boardElement.click()
            gameBoard.listOfBoard[2].boardElement.click()
            gameBoard.listOfBoard[6].boardElement.click()
            gameBoard.listOfBoard[1].boardElement.click()
            gameBoard.listOfBoard[7].boardElement.click()  
            gameBoard.listOfBoard[3].boardElement.click()
            gameBoard.listOfBoard[5].boardElement.click()
            gameBoard.listOfBoard[8].boardElement.click()
            message.close()
            endButton.click()
            expect(message.text.textContent).toBe(
                "Summary:\nEvan get win : 1 times.\nDhika get win : 1 times.\nTotal draw : 1 times.\nTotal round : 3 times.")
        })
    })
})