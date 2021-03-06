import styled, {keyframes} from 'styled-components';
import Grid from './components/Grid';
import React, {useEffect, useRef, useState} from "react";
import Board from './components/Board';

const waveAnimation = keyframes`
  0% {
    background-position-x: 0;
  }
  100% {
    background-position-x: 1000px;
  }
`

const Container = styled.div`
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  width: 100vw;
  height: 100vh;
  padding: 2rem 10rem 2rem 10rem;
  justify-content: center;
  align-items: center;
  position: relative;

  background: -webkit-linear-gradient(90deg, #BBF0F3 0%, #DEEBDD 100%);

  h1 {
    font-size: 7rem;
    text-transform: uppercase;
    margin: 15% 0 0 0;
    font-family: 'Squada One', cursive;
    color: #dee5ec;
    background: -webkit-linear-gradient(90deg, rgba(3,89,112,1) 0%, rgba(54,131,148,1) 100%);
    opacity: 0.5;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    letter-spacing: 1rem;

    @media (max-width: 768px) {
      font-size: 4rem;
      letter-spacing: 0.7rem;
    }

    @media (max-width: 425px) {
      font-size: 2rem;
      letter-spacing: 0.5rem;
    }
  }

  h2 {
    font-size: 2rem;
    text-transform: uppercase;
    font-family: 'Squada One', cursive;
    letter-spacing: 0.5rem;
    opacity: 0.35;
    color: #BBF0F3;

    @media (max-width: 768px) {
      font-size: 1.5rem;
      letter-spacing: 0.4rem;
    }

    @media (max-width: 425px) {
      font-size: 1.3rem;
      letter-spacing: 0.3rem;
    }
  }
`

const Ocean = styled.div`
  height: 40%;
  width: 100%;
  position: absolute;
  bottom: 0;
  left: 0;
  background: rgb(3,89,112);
  background: linear-gradient(180deg, rgba(3,89,112,1) 0%, rgba(54,131,148,1) 100%);
`

const Wave = styled.div`
  height: 100px;
  width: 100%;
  position: absolute;
  top: -100px;
  left: 0;
  background: url("https://s3-us-west-2.amazonaws.com/s.cdpn.io/85486/wave.svg") repeat-x;
  background-size: 1000px 100px;
  animation: ${waveAnimation} 7s cubic-bezier(0.36, 0.45, 0.63, 0.53) infinite;
  transform: translate3d(0, 0, 0);

  :nth-child(1) {
    opacity: 0.5;
    animation-delay: 1s;
    animation-duration: 6s;
  }

  :nth-child(2) {
    opacity: 0.2;
    animation-delay: -2s;
    animation-duration: 8s;
  }

  :nth-child(4) {
    opacity: 0.7;
    animation-delay: 3s;
    animation-duration: 6s;
  }

  :nth-child(4) {
    opacity: 0.3;
    animation-delay: -1s;
  }
`

const BoardsContainer = styled.div`
  display: flex;
  flex-direction: row;
  perspective: 800px;
`

const BoardContainer = styled.div`
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  justify-content: center;
  align-items: center;
  padding: 0 2rem 0 2rem;
  transform-style: preserve-3d;
  transform: rotateX(60deg);

  @media (max-width: 425px) {
    padding: 0 1rem 0 1rem;
  }

  :nth-child(1) {
    & > * {
      animation-delay: 1s;
    }
  }
`

const StartButton = styled.button`
  background-color: transparent;
  border: none;
  text-transform: uppercase;
  font-family: 'Squada One', cursive;
  font-size: 4rem;
  margin: 0;
  color: #A71D31;
  transition: 0.25s;
  opacity: ${props => props.showButton ? "1" : "0"};

  @media (max-width: 768px) {
      font-size: 2rem;
    }

    @media (max-width: 425px) {
      font-size: 1.5rem;
    }

  &:hover, &:active, &:focus {
    cursor: pointer;
    transform: scale(1.2);
  }
`

const EndGameText = styled.h3`
  text-transform: uppercase;
  font-family: 'Squada One', cursive;
  font-size: 4rem;
  margin: 0;
  color: #A71D31;
  transition: 0.25s;
`

function hasUserWon(enemyBoard) {
  let enemyBoardFiltered = enemyBoard.filter(square => square.attacked === false && square.filled === true );
  if(enemyBoardFiltered.length === 0) {
    return true;
  }
  return false;
}

function attack(enemyBoard, setEnemyBoard) {
  let enemyBoardFiltered = enemyBoard.filter(square => square.attacked === false);
  let chosenSquareIndex = enemyBoardFiltered[Math.floor(Math.random() * enemyBoardFiltered.length)].id;
  
  var data = [...enemyBoard];
  data[chosenSquareIndex].attacked = true;
  setEnemyBoard(data);
}

function sleep(time){
    return new Promise((resolve)=>setTimeout(resolve,time));
}

function App() {
  const [playerOneBoard, setPlayerOneBoard] = useState(Board());
  const [playerTwoBoard, setPlayerTwoBoard] = useState(Board());
  const [whichPlayerWon, setWhichPlayerWon] = useState(null);
  const [showButton, setShowButton] = useState(true);

  async function startTheGame() {
    while(whichPlayerWon === null) {
      await sleep(100);
      attack(playerTwoBoard, setPlayerTwoBoard);
      if(hasUserWon(playerTwoBoard)) {
        setWhichPlayerWon(1);
        break;
      }
      await sleep(100);
      attack(playerOneBoard, setPlayerOneBoard);
      if(hasUserWon(playerOneBoard)) {
        setWhichPlayerWon(2);
        break;
      }
    }
  }

  return (
    <Container>
      <h1>Battleships</h1>
      { !whichPlayerWon && <StartButton showButton={showButton} onClick={() => {startTheGame(); setShowButton(false)}}>Start</StartButton>}
      { whichPlayerWon && <EndGameText>Player {whichPlayerWon} won</EndGameText> }
      <Ocean>
        <Wave/>
        <Wave/>
        <Wave/>
        <Wave/>
      </Ocean>
      <BoardsContainer>
        <BoardContainer>
          <Grid board={playerOneBoard}/>
          <h2>Player 1</h2>
        </BoardContainer>
        <BoardContainer>
          <Grid board={playerTwoBoard}/>
          <h2>Player 2</h2>
        </BoardContainer>
      </BoardsContainer>
    </Container>
  );
}

export default App;
