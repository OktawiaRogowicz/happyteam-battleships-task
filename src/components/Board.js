import React, {useEffect,useRef} from "react";
import styled from 'styled-components';
import {WIDTH, HEIGHT, DIRECTIONS, SHIPS} from "./boardConfigElements";


function fillBoardWithShips(board) {
    for(let i = 0; i < SHIPS.length; i++) 
        for(let j = 0; j < SHIPS[i].amount; j++)
            while(!createShip(SHIPS[i].length, board));
}

function getCell(x, y) {
    if(x < 0 || x >= WIDTH) {
        return false;
    }
    if(y < 0 || y >= HEIGHT) {
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
    if(direction === DIRECTIONS.down) {
        for(let i = 0; i < length; i++) {
            if(!isFillingShipCellPossible(board, x, y + i)) return false;
        }
    } else if(direction === DIRECTIONS.right) {
        for(let i = 0; i < length; i++) {
            if(!isFillingShipCellPossible(board, x + i, y)) return false;
        }
    }
    return true;
}

function fillShipCells(board, length, x, y, direction) {
    if(direction === DIRECTIONS.down) {
        for(let i = 0; i < length; i++) {
            var p = (y + i) * HEIGHT + (x);
            board[p].filled = true;
            changeSiblingCells(board, x, y+i);
        }
    } else if(direction === DIRECTIONS.right) {
        for(let i = 0; i < length; i++) {
            var p = (y) * HEIGHT + (x + i);
            board[p].filled = true;
            changeSiblingCells(board, x+i, y);
        }
    }
}

function createShip(length, board) {  
    const keys = Object.keys(DIRECTIONS)
    const direction = keys[Math.floor(Math.random() * keys.length)]
    console.log(direction);
    var x = 0, y = 0;
    if(direction === DIRECTIONS.down) {
        y = Math.floor(Math.random() * (HEIGHT - (length - 1)));
        x = Math.floor(Math.random() * (WIDTH));
    } else if(direction === DIRECTIONS.right) {
        y = Math.floor(Math.random() * (HEIGHT));
        x = Math.floor(Math.random() * (WIDTH - (length - 1)));
    }

    if(!isFillingShipCellsPossible(board, length, x, y, direction))
        return false;
    fillShipCells(board, length, x, y, direction);

    return true;
    
}

function createBoard() {
    var squares = new Array(100).fill(null).map((e, index)=> ({
        "id": index,
        "filled": false,
        "isSibling": false,
        "attacked": false
    }));
    fillBoardWithShips(squares);
    return squares;
}

function Board() {
  return createBoard();
}

export default Board;
