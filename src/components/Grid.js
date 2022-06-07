import React from "react";
import styled from 'styled-components';

const WIDTH = 10;
const HEIGHT = 10;

const Container = styled.div`
    display: grid;
    background-color: aliceblue;
    grid-template-columns: repeat(10, 2rem);
    grid-template-rows: repeat(10, 2rem);
    border: 2px solid black;
    margin: 2rem;

    div {
        border: 0.03rem solid grey;
    }
`

function fillBoardWithShips(board) {
    for(let i = 0; i < 1; i++)
        while(!createShip(4, board));
    for(let i = 0; i < 2; i++)
        while(!createShip(3, board));
    for(let i = 0; i < 3; i++)
        while(!createShip(2, board));
    for(let i = 0; i < 4; i++)
        while(!createShip(1, board)); 
}

function getCell(x, y) {
    if(x < 0 || x > 9) {
        return false;
    }
    if(y < 0 || y > 9) {
        return false;
    }
    return true;
}

function changeCell(board, x, y){
    if(getCell(x, y)) {
        board[x + y * HEIGHT].isSibling = true;
    }
}

function changeSiblingCells(board, x, y){
    changeCell(board, x+1, y);
    changeCell(board, x-1, y);
    changeCell(board, x+1, y+1);
    changeCell(board, x, y+1);
    changeCell(board, x-1, y+1);
    changeCell(board, x+1, y-1);
    changeCell(board, x, y-1);
    changeCell(board, x-1, y-1);
}

function fillShipCell(board, x, y) {
    var p = (y) * HEIGHT + x;
    if(!board[p].filled && !board[p].isSibling) {
        return true;
    }
    return false;
}

function fillShipCells(board, length, x, y, direction) {
    if(direction == 0) {
        for(let i = 0; i < length; i++) {
            if(!fillShipCell(board, x, y + i)) return false;
        }
    } else if(direction == 1) {
        for(let i = 0; i < length; i++) {
            if(!fillShipCell(board, x + i, y)) return false;
        }
    }
    return true;
}

function createShip(length, board) {
    var x = Math.floor(Math.random() * (WIDTH - (length - 1)));
    var y = Math.floor(Math.random() * (HEIGHT - (length - 1)));
    var direction = Math.floor(Math.random() * 2);
    console.log("LEN", length, x, y, direction);
    if(!fillShipCells(board, length, x, y, direction))
        return false;

    if(direction == 0) {
        for(let i = 0; i < length; i++) {
            var p = (y + i) * HEIGHT + (x);
            board[p].filled = true;
            changeSiblingCells(board, x, y+i);
        }
    } else if(direction == 1) {
        for(let i = 0; i < length; i++) {
            var p = (y) * HEIGHT + (x + i);
            board[p].filled = true;
            changeSiblingCells(board, x+i, y);
        }
    }
    return true;
    
}

function createBoard(board) {
    var squares = new Array(100).fill(null).map(()=> ({"filled": false, "isSibling": false}))
    fillBoardWithShips(squares);

    var squaresDivs = [];
    squares.forEach((square, index) => {
        squaresDivs.push(<div style={{backgroundColor: square.filled ? "black" : square.isSibling ? "lightgrey" : ""}} key={index}></div>);
    });

    return squaresDivs;
}

const shipsTypes = [
    {
        amount: 1,
        width: 4
    },
    {
        amount: 2,
        width: 3
    },
    {
        amount: 3,
        width: 2
    },
    {
        amount: 4,
        width: 1
    }
]

function Grid() {
  var boardContext = React.createRef();


  return (
    <Container ref={boardContext}>
        {createBoard(boardContext)}
    </Container>
  );
}

export default Grid;
