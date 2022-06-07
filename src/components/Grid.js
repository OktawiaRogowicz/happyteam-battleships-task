import styled from 'styled-components';
import React, {useEffect,useRef} from "react";

const Container = styled.div`
    display: grid;
    grid-template-columns: repeat(10, 2rem);
    grid-template-rows: repeat(10, 2rem);
    background-color: white;
    border: 2px solid black;

    div {
        border: 0.03rem solid grey;
    }
`

function Grid({board}) {
    var squaresDivs = [];
    board.forEach((square, index) => {
        squaresDivs.push(
            <div
                style={{backgroundColor: square.filled ? "black" : square.isSibling ? "lightgrey" : ""}}
                key={index}
            >
                {square.attacked ? "x" : ""}
            </div>
        );
    });

    return (
        <Container>
            {squaresDivs}
        </Container>
    );
  }
  
  export default Grid;

