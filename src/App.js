import styled from 'styled-components';
import Grid from './components/Grid';
import React, {useEffect, useRef, useState} from "react";
import Board from './components/Board';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  width: 100vw;
  height: 100vh;
  padding: 2rem 10rem 2rem 10rem;
  justify-content: center;
  align-items: center;

  h1 {
    font-size: 7rem;
    text-transform: uppercase;
    margin: 0;
  }

  h2 {
    font-size: 2rem;
    text-transform: uppercase;
  }
`

const BoardsContainer = styled.div`
  display: flex;
  flex-direction: row;
`

const BoardContainer = styled.div`
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  justify-content: center;
  align-items: center;
  padding: 0 2rem 0 2rem;
`

function attack(enemyBoard, setEnemyBoard) {
  let enemyBoardFiltered = enemyBoard.filter(square => square.attacked === false);
  let chosenSquareIndex = enemyBoardFiltered[Math.floor(Math.random() * enemyBoardFiltered.length)].id;
  
  var data = [...enemyBoard];
  data[chosenSquareIndex].attacked = true;

  setEnemyBoard(data);
}

function App() {
  const [playerOneBoard, setPlayerOneBoard] = useState(Board());
  const [playerTwoBoard, setPlayerTwoBoard] = useState(Board());

  function startTheGame() {
    attack(playerTwoBoard, setPlayerTwoBoard);
  }

  return (
    <Container>
      <h1>Battleships</h1>
      <BoardsContainer>
        <BoardContainer>
          <h2>Player 1</h2>
          <Grid board={playerOneBoard}/>
        </BoardContainer>
        <BoardContainer>
          <h2>Player 2</h2>
          <Grid board={playerTwoBoard}/>
        </BoardContainer>
      </BoardsContainer>
      <button onClick={startTheGame}>Start</button>
    </Container>
  );
}

export default App;
