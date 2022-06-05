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

let squareType = {
    "filled": false,
    "isSibling": false
}



function createBoard(board) {

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
