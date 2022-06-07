import React, {useEffect,useRef} from "react";
import styled from 'styled-components';

const WIDTH = 10;
const HEIGHT = 10;

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

function changeSiblingCell(board, x, y){
    if(getCell(x, y)) {
        board[x + y * HEIGHT].isSibling = true;
    }
}

function changeSiblingCells(board, x, y){
    changeSiblingCell(board, x+1, y);
    changeSiblingCell(board, x-1, y);
    changeSiblingCell(board, x+1, y+1);
    changeSiblingCell(board, x, y+1);
    changeSiblingCell(board, x-1, y+1);
    changeSiblingCell(board, x+1, y-1);
    changeSiblingCell(board, x, y-1);
    changeSiblingCell(board, x-1, y-1);
}

function isFillingShipCellPossible(board, x, y) {
    var p = y * HEIGHT + x;
    if(!board[p].filled && !board[p].isSibling) {
        return true;
    }
    return false;
}

function isFillingShipCellsPossible(board, length, x, y, direction) {
    if(direction == 0) {
        for(let i = 0; i < length; i++) {
            if(!isFillingShipCellPossible(board, x, y + i)) return false;
        }
    } else if(direction == 1) {
        for(let i = 0; i < length; i++) {
            if(!isFillingShipCellPossible(board, x + i, y)) return false;
        }
    }
    return true;
}

function fillShipCells(board, length, x, y, direction) {
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
}

function createShip(length, board) {
    var x = Math.floor(Math.random() * (WIDTH - (length - 1)));
    var y = Math.floor(Math.random() * (HEIGHT - (length - 1)));
    var direction = Math.floor(Math.random() * 2);

    if(!isFillingShipCellsPossible(board, length, x, y, direction))
        return false;
    fillShipCells(board, length, x, y, direction);

    return true;
    
}

function createBoard() {
    var squares = new Array(100).fill(null).map((e, index)=> ({"id": index, "filled": false, "isSibling": false, "attacked": false}))
    fillBoardWithShips(squares);
    return squares;
}

function Board() {
  return createBoard();
}

export default Board;
