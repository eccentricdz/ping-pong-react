import React, { useState, useEffect } from "react";
import "./App.scss";
import Welcome from "./components/Welcome";
import GameScreen from "./components/GameScreen";

const App = () => {
  const [playerName, setPlayerName] = useState("");
  const [topScorer, setTopScorer] = useState({});
  const onSubmissionOfUsername = (playerName) => {
    setPlayerName(playerName);
  };

  // We would eventually need to fetch out scores from a service
  const getTopScorer = () => {
    const highScoreUrl =
      "https://ping-pong-highscore.herokuapp.com/getHighScore";
    fetch(highScoreUrl)
      .then((response) => response.json())
      .then((data) => {
        setTopScorer(data);
      });
  };

  useEffect(() => {
    getTopScorer();
  }, []);

  if (playerName === "")
    return (
      <Welcome
        onSubmissionOfUsername={onSubmissionOfUsername}
        topScorer={topScorer}
      ></Welcome>
    );
  else
    return (
      <GameScreen
        topScorer={topScorer}
        playerName={playerName}
      ></GameScreen>
    );
};

export default App;
