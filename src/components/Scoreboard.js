import React, { useEffect, useState } from "react";
import "./Scoreboard.scss";
import Robot from "./Robot";
import Gamestat from "./Gamestat";
import Social from "./Social";

const Scoreboard = ({
  playerWon,
  playerName,
  score,
  livesLeft,
  robotLevel,
  topScorer,
  gameInProgress,
  newHighScore,
}) => {
  const [scoreBoardState, updateScoreBoardState] = useState("active");
  const [callToAction, updateCallToAction] = useState(
    "Click anywhere to begin!"
  );
  const [robotAttitude, updateRobotAttitude] = useState("chill");

  useEffect(() => {
    if (livesLeft === 0) updateCallToAction("Game over");
    else if (livesLeft === 3) updateCallToAction("Click anywhere to begin!");
    else updateCallToAction("Click anywhere to resume!");

    if (playerWon) updateRobotAttitude("angry");
    else if (livesLeft < 3) updateRobotAttitude("happy");
    else updateRobotAttitude("chill");

    if (gameInProgress) {
      updateScoreBoardState("inactive");
      updateRobotAttitude("undercover");
    } else {
      updateScoreBoardState("active");
    }
  });

  return (
    <div className={`scoreBoard ${scoreBoardState}`}>
      <div className="column-1 column">
        <Gamestat
          name="robotLevel"
          header="Level"
          value={robotLevel}
          highlight={robotAttitude === "angry" ? true : false}
        ></Gamestat>
        <Gamestat
          name="livesLeft"
          header="Lives left"
          value={livesLeft}
          kind="hearts"
          highlight={robotAttitude === "happy" && livesLeft > 0 ? true : false}
        ></Gamestat>
      </div>
      <div className="column-2 column">
        <Robot attitude={robotAttitude}></Robot>
        <div className="call-to-action">
          {callToAction}
          {livesLeft === 0 ? (
            <div className="reset-prompt">
              <Social></Social>
              <p className="highlight">Click to reset!</p>
            </div>
          ) : null}
        </div>
        <p className="playerName">{playerName}</p>
      </div>
      <div className="column-3 column">
        <Gamestat
          name="highScore"
          header="Top score"
          value={
            topScorer !== undefined && topScorer.name && topScorer.score
              ? `${topScorer.name} ${topScorer.score}`
              : null
          }
          highlight={newHighScore}
        ></Gamestat>
        <Gamestat name="score" header="Score" value={score}></Gamestat>
      </div>
    </div>
  );
};

export default Scoreboard;
