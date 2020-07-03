import React, { useState } from 'react';
import './App.scss';
import Welcome from './components/Welcome'
import GameScreen from './components/GameScreen'

const App = () => {
  const [playerName, setPlayerName] = useState("");
  const onSubmissionOfUsername = (playerName) => {
    setPlayerName(playerName)
  }

  // We would eventually need to fetch out scores from a service
  const getTopScorer = () => {
    return {
      name: "kabir",
      score: 345
    }
  }

  // if (playerName === "") return <Welcome onSubmissionOfUsername={onSubmissionOfUsername} topScorer={getTopScorer()}></Welcome>
  // else return <GameScreen topScorer={getTopScorer()} playerName={playerName}></GameScreen>

  return <GameScreen topScorer={getTopScorer()} playerName="Rohan"></GameScreen>
}

export default App;