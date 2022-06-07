import styled from 'styled-components';
import React, {useEffect,useRef} from "react";

const Container = styled.div`
    display: grid;
    grid-template-columns: repeat(10, 2rem);
    grid-template-rows: repeat(10, 2rem);
    background-color: white;
    border: 2px solid black;

    div {
        position: relative;
        border: 0.03rem solid grey;
        overflow: hidden;
        text-align: center;
        display: flex;
        justify-content: center;
        align-items: center;

        span {
            color: red;
            position: absolute;
            top: -1.4rem;
            font-size: 4rem;
            margin: 0;
            line-height: 4rem;
        }
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
                    {square.attacked ? <span>&times;</span> : ""}
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

