// function to give legal moves for a given coordinate return possible move in array
//there are eight legal move for knight
function legalMove(array){
    if(array.length != 2) return 
    //represent side move as x coordinate and up and down as y coordintae
    let x = array[0];
    let y = array[1];
    //case 1: 2 moves to the side 1 move up (x+2, y+1);
    let moveOne = [x+2, y+1];
    //case 2: 2 moves to the right right side, 1 move down (x+2, y-1);
    let moveTwo = [x+2, y-1];
    //case 3: 2 moves to the left side, 1 move up (x-2, y+1);
    let moveThree = [x-2, y+1];
    //case 4: 2 moves to the left side, 1 move down (x-2, y-1);
    let moveFour = [x-2, y-1];
    //case 5: 1 move to the left side, 2 moves down (x-1, y-2);
    let moveFive = [x-1, y-2];
    //case 6: 1 move to the right side, 2 moves down (x+1, y-2);
    let moveSix = [x+1, y-2];
     //case 7: 1 move to the left side, 2 moves up (x-1, y+2);
    let moveSeven = [x-1, y+2]
    //case 8: 1 move to the right side, 2 moves up (x+1, y+2);
    let moveEight = [x+1, y+2]
    //put all possible moves in array check the legal one and put it in array
    let allMove = [moveOne, moveTwo, moveThree, moveFour, moveFive, moveSix, moveSeven, moveEight ];
    let posibleMove = [];
    for(let i = 0; i < allMove.length; i++){
       if(allMove[i].every(isValid) === true){
         posibleMove.push(allMove[i])
       }
    };
    return posibleMove   
};
//function to check coordinate not to go over the board for 8 x 8 
function isValid(item){
    return item >= 0 && item <= 7
};
//adjecent list graph  to create knight move  board
function Graph(){
    //store all vertices in array 
    let vertices = [];
    let adjList = new Map();
     //method to  add vertex for each vertex we create array to store it's neigbours 
    function addVertex(v){
        vertices.push(v);
        adjList.set(v, []);
    };
    //method that accept two vertices to draw unweighted graph
    function addEdge(v,w){
        adjList.get(v).push(w)
     };
    //method to print the graph by showing  vertex and it's edges
    function printGraph(){
        let s = '';
        for(let i = 0; i < vertices.length; i++){
            s += vertices[i] + " -> "
            let neighbours = adjList.get(vertices[i]);
            for(let j = 0; j < neighbours.length; j++){
               s += neighbours[j] + ' ';
            }
            s += '\n';
        }
        return s
    };
    //function that mark vertex as white to help on visit using bfs and dfs
    function initializeColor(){
        let color = [];
        for(let i = 0; i < vertices.length; i++){
            color[vertices[i]] = 'white';
        }
        return color
    };
        //breadth first search that return distance and path between 2 vertices
    function bfsShortesPath(startVertex, endVertex){
        let color = initializeColor();
        let queue = [];
        //distance and predessor of vertex store as an array
        let pred = [];
        let d = []
        for(let i = 0; i < vertices.length; i++){
            d[vertices[i]] = 0;
            pred[vertices[i]] = null;
        }
        queue.push(startVertex);
        while(queue.length !== 0){
            let vertex = queue.shift();
            let neigbours = adjList.get(vertex);
            for(let i = 0; i < neigbours.length; i++){
                let neighbor = neigbours[i];
                if(color[neighbor] === 'white'){
                    //vertex discovered
                    color[neighbor] = 'grey';
                    pred[neighbor] = vertex;
                    d[neighbor] = d[vertex] + 1;
                    queue.push(neighbor);
                    //if the shortest path found break the loop
                    if(neighbor === endVertex){
                        break;
                    }
                }
            }
            //vertex explored
            color[vertex] = 'black'
        }
        //back track and construct path
        let path = [];
        let currentVertex = endVertex;
        while(currentVertex !== startVertex){
            path.unshift(currentVertex);
            currentVertex = pred[currentVertex]
        }
        //add starting vertex
        path.unshift(startVertex)
        return{
             distance:d[endVertex],
             path: path
            }
    };

    return{
        addVertex, addEdge, printGraph, bfsShortesPath
    }
};

let knightBoard = Graph();
let board= [
    [ [0, 7], [1, 7], [2, 7], [3, 7], [4, 7], [5, 7], [6, 7], [7, 7] ],
    [ [0, 6], [1, 6], [2, 6], [3, 6], [4, 6], [5, 6], [6, 6], [7, 6] ],
    [ [0, 5], [1, 5], [2, 5], [3, 5], [4, 5], [5, 5], [6, 5], [7, 5] ],
    [ [0, 4], [1, 4], [2, 4], [3, 4], [4, 4], [5, 4], [6, 4], [7, 4] ],
    [ [0, 3], [1, 3], [2, 3], [3, 3], [4, 3], [5, 3], [6, 3], [7, 3] ],
    [ [0, 2], [1, 2], [2, 2], [3, 2], [4, 2], [5, 2], [6, 2], [7, 2] ],
    [ [0, 1], [1, 1], [2, 1], [3, 1], [4, 1], [5, 1], [6, 1], [7, 1] ],
    [ [0, 0], [1, 0], [2, 0], [3, 0], [4, 0], [5, 0], [6, 0], [7, 0] ],
];
//add vertices from the 2d array
for(let row = 0; row < board.length; row++){
    for(let col = 0; col < board[row].length;col++){
        knightBoard.addVertex(board[row][col].toString());
    }
};
//add edge with the legal move 
for(let i = 0; i < board.length; i++){
    for(let j = 0; j < board[i].length; j++){
        let moves = legalMove(board[i][j]);
        let currentPos = board[i][j];
        for(let k = 0; k < moves.length ; k++){
            knightBoard.addEdge(moves[k].toString(), currentPos.toString());
        }
    }
};
//function that accept 2 coordinate as an array return shortest path and the distance between them
function knightMove(start, destination){
   if(start.length !== 2 || destination.length !== 2){
     throw new Error( "enter proper coordinate as an arry [0,0]");
   }
   if(start.every(isValid) === false || destination.every(isValid) === false){
    throw new Error ("coordinate is out of the board [x,y] x and y should be between 1-8")
   } 
   let coordinateStart = start.toString();
   let coordinateDestination = destination.toString();
   const result = knightBoard.bfsShortesPath(coordinateStart, coordinateDestination);
   console.log(`You made it in ${result.distance} moves! Here's your path` );
   for(let i = 0; i < result.path.length; i++){
    console.log(`[${result.path[i]}]`)
   }
   console.log('Shortest path:', result.path.join(' -> '));
};

export { knightMove}






