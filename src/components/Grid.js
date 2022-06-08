import styled, {keyframes} from 'styled-components';
import React, {useEffect,useRef} from "react";

const slamAnimation = keyframes`
    0% {
        opacity: 0;
        transform: translateY(-10rem) scale(2.0);
    }
    50% {
        opacity: 1;
        transform: translateY(-10rem) scale(2.1);
    }
    55% {
        transform: translateY(-1.0rem) scale(1.5, 2.0);
    }
    60% {
        transform: translateY(0) scale(0.9);
    }
`

const shakeAnimation = keyframes`
    0% { transform: translate(1px, 1px) rotate(0deg); }
    10% { transform: translate(-1px, -2px) rotate(-1deg); }
    20% { transform: translate(-3px, 0px) rotate(1deg); }
    30% { transform: translate(3px, 2px) rotate(0deg); }
    40% { transform: translate(1px, -1px) rotate(1deg); }
    50% { transform: translate(-1px, 2px) rotate(-1deg); }
    60% { transform: translate(-3px, 1px) rotate(0deg); }
    70% { transform: translate(3px, 1px) rotate(-1deg); }
    80% { transform: translate(-1px, -1px) rotate(1deg); }
    90% { transform: translate(1px, 2px) rotate(0deg); }
    100% { transform: translate(1px, -2px) rotate(-1deg); }
`

const floatingAnimation = keyframes`
    0%   { transform: translate(0,  5px); }
    50%  { transform: translate(15px, 10px); }
    75%  { transform: translate(5px, 0px); }   
    100% { transform: translate(0,  5px); }
`

const Container = styled.div`
    display: grid;
    grid-template-columns: repeat(10, 2rem);
    grid-template-rows: repeat(10, 2rem);
    border: 2px solid rgb(0, 0, 0, 0.35);
    z-index: 1;
    transition: all .2s;
    //animation: ${floatingAnimation} 3s infinite ease-in-out;
`

const Square = styled.div`
    position: relative;
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: -1;
    border: 1px solid rgb(0, 0, 0, 0.2);
`

const X = styled.span`
    color: red;
    position: absolute;
    top: -1.4rem;
    font-size: 4rem;
    margin: 0;
    line-height: 4rem;
    animation: ${slamAnimation} 1s both;
    z-index: 100;
`

function Grid({board}) {
    var squaresDivs = [];
    board.forEach((square, index) => {
        squaresDivs.push(
            <Square
                style={{backgroundColor: square.filled ? "black" : ""}}
                key={index}
            >
                    {square.attacked ? <X>&times;</X> : ""}
            </Square>
        );
    });

    return (
        <Container>
            {squaresDivs}
        </Container>
    );
  }
  
  export default Grid;

