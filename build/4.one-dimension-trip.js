"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.minEnergy = void 0;
class Vertex {
    constructor(no, val, prev, neighbours = []) {
        this.no = no;
        this.val = val;
        this.prev = prev;
        this.neighbours = neighbours;
    }
}
function minEnergy(start, shops, stations, target) {
    let startToAll = [];
    let shopToAll = [];
    let targetToAll = [];
    const shopObj = {};
    // find the last vertex 
    const lastVertex = Math.max(start, ...shops, ...stations, target);
    const firstVertex = Math.min(start, ...shops, ...stations, target);
    // find shortest path begin with start vertex
    startToAll = dijkstraAlgorithms(start, firstVertex, stations, target, lastVertex);
    if (start < 0 ||
        target < 0 ||
        start === null ||
        target === null ||
        !validateMinusValueArray(shops) ||
        !validateMinusValueArray(stations)) {
        throw new Error('start and target format not correctly');
    }
    // handling error for no shops
    if (!shops.length) {
        const vertex = startToAll.find((elem) => elem.no === target);
        if (!vertex) {
            throw new Error('can not find target');
        }
        return vertex.val;
    }
    // find shortest path of shops vertex to every path
    for (let i = 0; i < shops.length; i++) {
        const shopVertex = dijkstraAlgorithms(shops[i], firstVertex, stations, target, lastVertex);
        shopObj[`${shops[i]}`] = shopVertex;
        shopToAll.push(shopObj);
    }
    //calculated possible permutation
    let pattern = permutation(shops);
    // mapping with start and end
    pattern = pattern.map((elem) => [start, ...elem, target]);
    let minEnergy = Infinity;
    for (let i = 0; i < pattern.length; i++) {
        let vertex;
        let min = 0;
        // calculated 0 => 1 index
        vertex = startToAll.find((elem) => elem.no === pattern[i][1]);
        if (!vertex) {
            throw new Error('vertex not found!');
        }
        // then update min value
        min += vertex.val;
        for (let j = 1; j < pattern[i].length - 1; j++) {
            vertex = shopObj[pattern[i][j]].find((elem) => elem.no === pattern[i][j + 1]);
            if (!vertex) {
                throw new Error('vertex not found!');
            }
            min += vertex.val;
        }
        minEnergy = Math.min(minEnergy, min);
        min = 0;
    }
    return minEnergy;
}
exports.minEnergy = minEnergy;
function dijkstraAlgorithms(initValue, firstVertex, stations, target, lastVertex) {
    /* create all vertex and at it into unvisited list */
    /* now */
    // initValue => vertex that we want to find shortest path 
    // start => first vertex of road not nesccessary to be 0
    // lastVertex => last vertex of road
    // create unvisited
    let unvisited = [];
    // create visited and list to store all of vertex
    const visited = [];
    let listOfVertex = [];
    // create first vertex to ness
    // let vertex: Vertex = new Vertex(
    //   start, 
    //   initValue === 0 ? 0 : Infinity,
    //   null,
    //   [ [1, 1] ]);
    // now we don't care vetex at 0
    // just start with first vetex until lastvertex
    // unvisited.push(vertex);
    // for(let i = 1; i <= lastVertex ; i++) {
    //   vertex = new Vertex(
    //     i, 
    //     initValue === i ? 0 : Infinity , 
    //     null, 
    //     i === lastVertex ? [ [i-1,1] ] : [ [i-1,1], [i+1,1] ]);
    //   unvisited.push(vertex);
    // }
    let vertex;
    for (let i = firstVertex; i <= lastVertex; i++) {
        // check if initValue === first vertex
        if (i === firstVertex) {
            vertex = new Vertex(i, initValue === firstVertex ? 0 : Infinity, null, [[i + 1, 1]]);
        }
        else if (i === lastVertex) { // check if initValue === last vertex
            vertex = new Vertex(i, initValue === lastVertex ? 0 : Infinity, null, [[i - 1, 1]]);
        }
        else { // check if intiValue is between first and the lastvertext
            vertex = new Vertex(i, initValue === i ? 0 : Infinity, null, [[i - 1, 1], [i + 1, 1]]);
        }
        unvisited.push(vertex);
    }
    // mapping weight beetween neighbours
    for (let i = 0; i < stations.length; i++) {
        let stationVertex = unvisited.find((elem) => elem.no === stations[i]);
        for (let j = 0; j < stations.length; j++) {
            if (j !== i) { // station is on the left
                if (!stationVertex)
                    throw new Error('stations not found!');
                stationVertex.neighbours.push([stations[j], 0]);
                // unvisited[stations[i]].neighbours.push([stations[j], 0]); // not start from 0 now
            }
        }
    }
    listOfVertex = [...unvisited];
    // checking if initValue === lastVertex
    if (initValue === lastVertex) {
        listOfVertex = unvisited.reverse();
        // copy from lsitOfVertex
        unvisited = [...listOfVertex];
    }
    // checking if initValue !== start && initValue !== lastVertex
    if (initValue !== firstVertex && initValue !== lastVertex) {
        // 0, 1, 2, 3, 4, 5 : 0,1,2,3,4,5 -> 
        for (let i = firstVertex; i <= initValue; i++) {
            listOfVertex[i - firstVertex] = unvisited[initValue - i]; // [4] = [4] | [0] [4], [1] [3], [2] [2] , [3], [1] , [4], [0]
        }
        for (let i = initValue + 1; i <= lastVertex; i++) {
            listOfVertex[i - firstVertex] = unvisited[i - firstVertex]; // [5] [5] | [6] [6] 
        }
        // copy from lsitOfVertex
        unvisited = [...listOfVertex];
    }
    /* find shortest way of each vertex */
    let minValue = Infinity;
    while (unvisited.length) {
        let currentVertex = unvisited.shift();
        if (!currentVertex) {
            break;
        }
        for (let i = 0; i < currentVertex.neighbours.length; i++) {
            // calculate the distance from start vertex
            let neighboursVertex = listOfVertex.find((vertex) => vertex.no === (currentVertex === null || currentVertex === void 0 ? void 0 : currentVertex.neighbours[i][0]));
            if (!neighboursVertex) {
                break;
            }
            let distanceToNextVertex = currentVertex.neighbours[i][1] + currentVertex.val; // vertex distance: 1, 1
            // if calculated distance less than dist object value in that key
            if (distanceToNextVertex < neighboursVertex.val) { // 1 < Infinity ?
                // updated shortest distance
                neighboursVertex.val = distanceToNextVertex;
                // update previous vertex with the current vertex
                neighboursVertex.prev = currentVertex.no;
            }
            if (distanceToNextVertex < minValue) {
                minValue = distanceToNextVertex;
                // minVertexIndex = unvisited.indexOf(neighboursVertex);
            }
        }
        minValue = Infinity;
        visited.push(currentVertex);
    }
    return listOfVertex;
}
function swap(arr, indexOne, indexTwo) {
    let temp = arr[indexOne];
    arr[indexOne] = arr[indexTwo];
    arr[indexTwo] = temp;
}
function generate(arrLength, arr, output) {
    if (arrLength === 1) {
        output.push(arr.slice());
        return;
    }
    generate(arrLength - 1, arr, output);
    for (let i = 0; i < arrLength - 1; i++) {
        if (arrLength % 2 === 0) { // even
            swap(arr, i, arrLength - 1);
        }
        else { // odd
            swap(arr, 0, arrLength - 1);
        }
        generate(arrLength - 1, arr, output);
    }
}
function permutation(array) {
    let output = [];
    generate(array.length, array.slice(), output);
    return output;
}
function validateMinusValueArray(array) {
    for (let i = 0; i < array.length; i++) {
        if (array[i] < 0)
            return false;
    }
    return true;
}
