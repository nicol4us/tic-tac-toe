/**
 * @jest-environment jsdom
 */
const fs = require('fs');
const path = require('path');

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





const {createRecord} = require('./script')



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
        playerTester.seName("Trial");
        expect(playerTester.getName()).toBe("Trial")
    })
    test("Check getState method, initial value is OFF", () => {
        expect(playerTester.getState()).toBe("OFF")
    })
    test("Check changeState method, from OFF become ON", () => {
        playerTester.changeState();
        expect(playerTester.getState()).toBe("ON")
    })
    test("Check changeState method, from ON become OFF", () => {
        playerTester.changeState();
        expect(playerTester.getState()).toBe("OFF")
    })
    test("Check getLight method, initial value should be red", () => {
        expect(playerTester.getLight()).toBe("red")
    })
    test("Check changeLight method, from red become green", () => {
        playerTester.changeLight();
        expect(playerTester.getLight).toBe("green")
    })
    test("Check changeLight method, from green become red", () => {
        playerTester.changeLight();
        expect(playerTester.getLight()).toBe("red")
    })
    test("Check getWin method, initial value should be 0", () => {
        expect(playerTester.getWin()).toBe(0);
    })
    test("Check setWin method, it should increase 1 from previous value  become 1", () => {
        playerTester.setWin();
        expect(playerTester.getWin()).toBe(1)
    })
    test("Check setWin method, it should increase from previous value become 2", () => {
        playerTester.setWin()
        expect(playerTester.getWin()).toBe(2);
    })
    test("Check record.set(index) method with index 4 then record become [[],[4],[],[],[4],[],[4],[4]]", () => {
        playerTester.record.set(4);
        expect(playerTester.record.listRecord).toEqual([[],[4],[],[],[4],[],[4],[4]])
    })
    test("Check setToDefault method, marker & name is empty, state is OFF, light is red, win is 0, record all is empty", () => {
        playerTester.setToDefault()
        expect(playerTester.getMarker()).toBe("")
        expect(playerTester.getState()).toBe("OFF")
        expect(playerTester.getLight()).toBe("red")
        expect(playerTester.getWin()).toBe(0)
        expect(playerTester.record.listRecord).toEqual([[],[],[],[],[],[],[],[]]);
    })
   

} )


