import logo from './logo.svg';
import './App.css';
import styled from 'styled-components';
import Grid from './components/Grid';
import React from "react";

const Container = styled.div`
  display: flex;
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  padding: 2rem;
  background-color: pink;
`

function App() {
  var playerOneBoard = React.createRef();
  var playerTwoBoard = React.createRef();

  return (
    <Container>
      <Grid ref={playerOneBoard}/>
      <Grid ref={playerTwoBoard}/>
    </Container>
  );
}

export default App;
