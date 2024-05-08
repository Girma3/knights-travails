// Graph to draw the chess board that contain only knight moves
// function to give legal moves for a given coordinate return possible move as hashmap
function legalMove(array){
    if(array.length != 2) return 
    //represent side move as x coordinate and up and down as y coordintae
    let x = array[0];
    let y = array[1];
    //there are eight legal move for knight
    //case 1: 2 moves to the side 1 move up (x+2, y+1);
    let moveOne = [x+2, y+1];
    //case 2: 2 moves to the right right side 1 move down (x+2, y-1);
    let moveTwo = [x+2, y-1];
    //case 3: 2 moves to the left side 1 move up (x-2, y+1);
    let moveThree = [x-2, y+1];
    //case 4: 2 moves to the left side 1 move down (x-2, y-1);
    let moveFour = [x-2, y-1];
    //case 5: 1 move to the left side 2 moves down (x-1, y-2);
    let moveFive = [x-1, y-2];
    //case 6: 1 move to the right side 2 moves down (x+1, y-2);
    let moveSix = [x+1, y-2];
     //case 7: 1 move to the left side 2 moves up (x-1, y+2);
    let moveSeven = [x-1, y+2]
    //case 8: 1 move to the right side 2 moves up (x+1, y+2);
    let moveEight = [x+1, y+2]
    //put all possible moves in array check the legal one and put it in hashmap
    let allMove = [moveOne, moveTwo, moveThree, moveFour, moveFive, moveSix, moveSeven, moveEight ];
    //function to chek the move 
    let check = function(item){
        return item >= 0 && item <= 7
    }
    let posibleMove = new Map();
    for(let i = 0; i < allMove.length; i++){
       if(allMove[i].every(check) === true){
         posibleMove.set(i, allMove[i])
       }
    };
    return posibleMove
};
//adjecent list  to create knight move graph
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
    function addEdge(v ,w){
        //get the vertex from adjecent list then put it's neighbour vertex
        adjList.get(v).push(w)
        adjList.get(w).push(v);
    };
    //method to print the graph by showing  vertex and it's edges
    function printGraph(){
        let s = '';
        for(let i = 0; i < vertices.length; i++){
            s += vertices[i] + " ->"
            let neighbours = adjList.get(vertices[i]);
            for(let j = 0; j < neighbours.length; j ++){
                s += neighbours[j] + ' ';
            }
            s += '\n';
        }
        return s
    };
    return{
        addVertex, addEdge, printGraph, vertices
    }
}
//chess board has 8 X 8
let board = [

    [ [0, 7], [1, 7], [2, 7], [3, 7], [4, 7], [5, 7], [6, 7], [7, 7] ],
    [ [0, 6], [1, 6], [2, 6], [3, 6], [4, 6], [5, 6], [6, 6], [7, 6] ],
    [ [0, 5], [1, 5], [2, 5], [3, 5], [4, 5], [5, 5], [6, 5], [7, 5] ],
    [ [0, 4], [1, 4], [2, 4], [3, 4], [4, 4], [5, 4], [6, 4], [7, 4] ],
    [ [0, 3], [1, 3], [2, 3], [3, 3], [4, 3], [5, 3], [6, 3], [7, 3] ],
    [ [0, 2], [1, 2], [2, 2], [3, 2], [4, 2], [5, 2], [6, 2], [7, 2] ],
    [ [0, 1], [1, 1], [2, 1], [3, 1], [4, 1], [5, 1], [6, 1], [7, 1] ],
    [ [0, 0], [1, 0], [2, 0], [3, 0], [4, 0], [5, 0], [6, 0], [7, 0] ],
];
let knightBoard = Graph();
// function that draw knight graph using the board given and graph
function drawGraph(){
    // add vertices first

    for(let i = 0; i < board.length; i++){
        for(let j = 0; j < board[i].length; j++){
            knightBoard.addVertex(board[i][j].toString());
        }
    };
     // add edge using vertex and it's legal moves eg  [0, 0] has [1,2] and  [ 2,1] legal move 
    for(let i = 0; i < board.length; i++){
        for(let j = 0; j < board[i].length; j++){
            let moves = legalMove(board[i][j]);
            for(let move of moves){
            knightBoard.addEdge(board[i][j].toString(), move[1].toString());
            }
        }
    };
};
drawGraph()
//console.log(knightBoard.vertices)
let m = legalMove([0, 0])
console.log(m)