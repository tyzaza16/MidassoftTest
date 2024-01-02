class Vertex {

  constructor(
    public no: number,
    public val: number,
    public prev: number | null,
    public neighbours: number[][] = [],
  ) {}

}

export function minEnergy(start: number, shops: number[], stations: number[], target: number): number {

  let startToAll: Vertex[] = [];
  let shopToAll: { [key:string]: Vertex[] }[] = [];
  let targetToAll: Vertex[] = [];
  const shopObj: { [key:string]: Vertex[] } = {};

  // find the last vertex 
  let lastVertex: number = Math.max(start, ...shops, ...stations, target);

  // find shortest path begin with start vertex
  startToAll = dijkstraAlgorithms(start, start, stations, target, lastVertex);


  if(
    start > target || 
    start === null || 
    target === null || 
    !validateShops(start, shops, target)) {
    throw new Error('start and target format not correctly');
  }

  // handling error for no shops
  if(!shops.length) {
    const vertex = startToAll.find((elem) => elem.no === target);

    if(!vertex) {
      throw new Error('can not find target');
    }

    return vertex.val;

  }

  // find shortest path of shops vertex to every path
  for( let i = 0 ; i < shops.length; i++ ) {
    const shopVertex: Vertex[] = dijkstraAlgorithms(shops[i], start, stations, target, lastVertex);
    shopObj[`${shops[i]}`] = shopVertex;
    shopToAll.push(shopObj);
  }

  //calculated possible permutation
  let pattern: number[][] = permutation(shops); 

  // mapping with start and end
  pattern = pattern.map((elem) => [start, ...elem, target]);

  let minEnergy: number = Infinity;

  for(let i = 0 ; i < pattern.length ; i++) {

    let vertex: Vertex | undefined;
    let min: number = 0;

    // calculated 0 => 1 index
    vertex = startToAll.find((elem) => elem.no === pattern[i][1]);

    if(!vertex) {
      throw new Error('vertex not found!');
    }   
    
    // then update min value
    min += vertex.val;

    for(let j = 1 ; j < pattern[i].length - 1 ; j++) {
      
      vertex = shopObj[pattern[i][j]].find((elem) => elem.no === pattern[i][j+1]);

      if(!vertex) {
        throw new Error('vertex not found!');
      }

      min += vertex.val;
    }

    minEnergy = Math.min(minEnergy, min); 
    min = 0;

  } 

  return minEnergy;

}


function dijkstraAlgorithms(initValue: number, start: number, stations: number[], target: number, lastVertex: number): Vertex[] {
    /* create all vertex and at it into unvisited list */

  // create unvisited
  let unvisited: Vertex[] = [];
  // create visited and list to store all of vertex
  const visited: Vertex[] = [];
  let listOfVertex: Vertex[] = []
  
  // create first vertex 
  let vertex: Vertex = new Vertex(start, initValue === 0 ? 0 : Infinity ,null, [ [1, 1] ]);
  unvisited.push(vertex);

  for(let i = 1; i <= lastVertex ; i++) {
    vertex = new Vertex(
      i, 
      initValue === i ? 0 : Infinity , 
      null, 
      i === lastVertex ? [ [i-1,1] ] : [ [i-1,1], [i+1,1] ]);
    unvisited.push(vertex);
  }
  
  // mapping weight beetween neighbours
  for(let i = 0; i < stations.length ; i++ ){
    for(let j = 0; j < stations.length ; j++) {
      if(j !== i) {
        unvisited[stations[i]].neighbours.push([stations[j], 0]);
      }
    }
  }

  listOfVertex = [...unvisited];
  

  // checking if initValue === lastVertex
  if(initValue === lastVertex) {
    listOfVertex = unvisited.reverse();
    // copy from lsitOfVertex
    unvisited = [...listOfVertex];
  }
  // checking if initValue !== start && initValue !== lastVertex
  if(initValue !== start && initValue !== lastVertex) {

    for(let i = 0 ; i <= initValue ; i++ ) {
      listOfVertex[i] = unvisited[initValue - i]; // [4] = [4] | [0] [4], [1] [3], [2] [2] 
    }

    for(let i = initValue+1 ; i < unvisited.length ; i++ ) {
      listOfVertex[i] = unvisited[i]; 
    }

    // copy from lsitOfVertex
    unvisited = [...listOfVertex];

  }

  /* find shortest way of each vertex */
  let minValue: number = Infinity;

  while(unvisited.length) {

    let currentVertex: Vertex | undefined = unvisited.shift();
    
    if(!currentVertex) {
      break;
    }

    for(let i = 0; i < currentVertex.neighbours.length; i++) {
      // calculate the distance from start vertex
      let neighboursVertex: Vertex | undefined  = listOfVertex.find((vertex: Vertex) => vertex.no === currentVertex?.neighbours[i][0]);

      if(!neighboursVertex) {
        break;
      }
      
      if(visited.indexOf(neighboursVertex) === -1) {

        let distanceToNextVertex = currentVertex.neighbours[i][1] + currentVertex.val; // vertex distance: 1, 1

        // if calculated distance less than dist object value in that key
        if(distanceToNextVertex < neighboursVertex.val) { // 1 < Infinity ?
          // updated shortest distance
          neighboursVertex.val = distanceToNextVertex;
          // update previous vertex with the current vertex
          neighboursVertex.prev = currentVertex.no;
        }

        if(distanceToNextVertex < minValue) {
          minValue = distanceToNextVertex;
          // minVertexIndex = unvisited.indexOf(neighboursVertex);
        }
        
      }

    } 
    minValue = Infinity;

    visited.push(currentVertex);

  }

  return listOfVertex;
}

function swap(arr: number[], indexOne: number, indexTwo: number): void {
  let temp = arr[indexOne];
  arr[indexOne] = arr[indexTwo];
  arr[indexTwo] = temp;
}

function generate(arrLength: number, arr: number[], output: number[][]): void {
  
  if(arrLength === 1) {
    output.push(arr.slice());
    return;
  }

  generate(arrLength - 1, arr, output);

  for(let i = 0 ; i < arrLength - 1 ; i ++) {

    if( arrLength % 2 === 0 ) { // even
      swap(arr, i, arrLength - 1);
    }else { // odd
      swap(arr, 0, arrLength - 1);
    }

    generate(arrLength-1, arr, output);
  } 
  
}

function permutation(array: number[]): number[][] {
  let output: number[][] = [];

  generate(array.length, array.slice(), output);

  return output;
}

function validateShops(start: number, shops: number[], target: number): boolean {


  for(let i = 0 ; i < shops.length ; i++) {
    if(shops[i] < start ) {
      return false;
    }
  }
  return true;
}
