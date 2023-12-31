"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.quickestPath = void 0;
class Queue {
    constructor() {
        this.items = [];
    }
    push(item) {
        this.items.push(item);
    }
    pop() {
        return this.items.shift();
    }
    isEmpty() {
        return this.items.length === 0;
    }
    size() {
        return this.items.length;
    }
}
class Cell {
    constructor(value, rollTime, rollDiceValue) {
        this.value = value;
        this.rollTime = rollTime;
        this.rollDiceValue = rollDiceValue;
    }
    addRollDiceValue(value) {
        this.rollDiceValue.push(value);
    }
    getRollDiceValue() {
        return this.rollDiceValue;
    }
}
function quickestPath(board) {
    const boardLength = 100;
    /* find moveBoard */
    let moveBoard = [];
    for (let i = 0; i < boardLength; i++) {
        moveBoard[i] = -1;
    }
    // add ladders
    board.ladders.forEach((element) => {
        moveBoard[element[0] - 1] = element[1] - 1;
    });
    // add snakes
    board.snakes.forEach((element) => {
        moveBoard[element[0] - 1] = element[1] - 1;
    });
    /* set tool to find shortest path */
    // we need queue
    const queue = new Queue();
    // create first cell(1)
    const cell = new Cell(0, 0, []);
    // we need array of visited for blocking repetition
    const visited = Array(boardLength).fill(false);
    visited[0] = true;
    // add start cell
    queue.push(cell);
    let cellTemp;
    while (!queue.isEmpty()) {
        cellTemp = queue.pop();
        if (!cellTemp) {
            break;
        }
        if (cellTemp.value === boardLength - 1) {
            break;
        }
        for (let i = cellTemp.value + 1; i <= cellTemp.value + 6 && i < boardLength; i++) {
            // check we process that cell yet ? 
            // if not just process
            if (!visited[i]) {
                const newCell = new Cell(i, cellTemp.rollTime + 1, [...cellTemp.getRollDiceValue(), i - cellTemp.value]);
                if (moveBoard[i] !== -1) {
                    newCell.value = moveBoard[i];
                }
                visited[i] = true;
                queue.push(newCell);
            }
        }
    }
    if (!cellTemp) {
        return [];
    }
    return cellTemp.getRollDiceValue();
}
exports.quickestPath = quickestPath;
