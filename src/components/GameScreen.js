import React, { useEffect, useState, useRef } from "react";
import "./GameScreen.scss";
import Curtain from "./Curtain";
import Scoreboard from "./Scoreboard";

const GameScreen = ({ playerName, topScorer }) => {
  const [score, updateScore] = useState(0);
  const [robotLevel, updateRobotLevel] = useState(1);
  const [livesLeft, updateLivesLeft] = useState(3);
  const [gameInProgress, updateGameInProgress] = useState(false);
  const [playerWon, updatePlayerWon] = useState(false);
  const [highScorer, updateHighScorer] = useState(topScorer);
  const [newHighScore, updateNewHighScore] = useState(false);

  let ctx;
  let canvas;
  let trackPadx = 0;
  let paddleVelocity = 0;
  let currentRobotLevel = 2;
  const paddle = {
    width: 200,
    height: 8,
  };
  const ball = {
    rad: paddle.height,
    iniy: paddle.height * 2,
  };
  const userpaddle = {};
  const aipaddle = {};
  let requestAnimationFrameID;
  let mouseMoveX;

  const initializeGame = () => {
    canvas = document.getElementById("myCanvas");
    ctx = canvas.getContext("2d");

    canvas.width = canvas.clientWidth;
    canvas.height = canvas.clientHeight;

    ball.inix = canvas.width / 2;
    canvas.addEventListener(
      "mousemove",
      (e) => {
        mouseMoveX = e.clientX;
      },
      false
    );

    canvas.addEventListener(
      "click",
      (e) => {
        const canvasClassList = e.target.classList;
        if (canvasClassList.contains("gameNotInProgress")) {
          console.log(e.target.dataset.livesleft);
          if (e.target.dataset.livesleft === "0") resetGame();
          else startGame();
        }
      },
      false
    );

    playerOnYourMarks();
  };

  const resetGame = () => {
    updateScore(0);
    updateRobotLevel(1);
    currentRobotLevel = 2;
    updateLivesLeft(3);
  };

  const startGame = () => {
    playerOnYourMarks();
    updateGameInProgress(true);
    requestAnimationFrameID = requestAnimationFrame(gameAnimation);
  };

  const updateUserPaddleX = (userPaddleX) => {
    userPaddleX = Math.max(userPaddleX, paddle.width / 2);
    userPaddleX = Math.min(canvas.width - paddle.width / 2, userPaddleX);
    userpaddle.x = userPaddleX;
  };

  const ballCollidesWithThePaddle = (newx, userPaddle) => {
    const collideBuffer = 50;
    if (userPaddle)
      return (
        newx >= userpaddle.x - paddle.width / 2 - collideBuffer &&
        newx <= userpaddle.x + paddle.width / 2 + collideBuffer
      );
    else
      return (
        newx >= aipaddle.x - paddle.width / 2 - collideBuffer &&
        newx <= aipaddle.x + paddle.width / 2 + collideBuffer
      );
  };

  const updateBallXVelocity = (newx, paddleVelocity) => {
    if (
      (ball.vx > 0 && paddleVelocity > 0) ||
      (ball.vx < 0 && paddleVelocity < 0)
    )
      ball.vx += paddleVelocity / 2;
    else ball.vx += paddleVelocity / 5;
  };

  const inAiRange = (range) => {
    return ball.x > aipaddle.x - range && ball.x < aipaddle.x + range;
  };

  const updateAiPaddle = () => {
    var paddlex = currentRobotLevel * 9;
    // When the ball is moving towards the robot
    if (ball.vy < 0) {
      // if (inAiRange(30))
      //     paddlex /= 2;
      if (ball.y <= Math.abs(ball.vy * 2)) paddlex += currentRobotLevel * 3;
      if (ball.y <= Math.abs(ball.vy / 4)) paddlex += currentRobotLevel * 5;
      var diff = Math.abs(aipaddle.x - ball.x);
      var dis = diff / (canvas.width / 2);
      dis = Math.max(1, dis);

      if (ball.x > aipaddle.x && ball.vx > 0) {
        aipaddle.x += Math.min(diff, paddlex * dis);
      } else if (ball.x > aipaddle.x && ball.vx < 0) {
        aipaddle.x += Math.min(diff, (paddlex * dis) / 2);
      } else if (ball.x < aipaddle.x && ball.vx < 0) {
        aipaddle.x -= Math.min(diff, paddlex * dis);
      } else if (ball.x < aipaddle.x && ball.vx > 0) {
        aipaddle.x -= Math.min(diff, (paddlex * dis) / 2);
      } else if (aipaddle.x == ball.x) return;
    }
    // When the ball is not moving towards the robot
    else {
      var diff = Math.abs(aipaddle.x - canvas.width / 2);
      if (aipaddle.x > canvas.width / 2) aipaddle.x -= Math.min(diff, 5);
      else if (aipaddle.x < canvas.width / 2) aipaddle.x += Math.min(diff, 5);
      else return;
    }
  };

  const ballMissesThePaddle = (didPlayerWin) => {
    cancelAnimationFrame(requestAnimationFrameID);
    if (didPlayerWin) {
      updatePlayerWon(true);
      updateScore((currentScore) => currentScore + robotLevel * 10);
      updateRobotLevel((currentRobolLevel) => currentRobolLevel + 1);
      currentRobotLevel += 1;
    } else {
      updatePlayerWon(false);
      updateLivesLeft((currentLives) => {
        const livesLeftNow = currentLives - 1;
        const canvas = document.getElementById("myCanvas");
        const currentScore = parseInt(canvas.dataset.score);
        if (livesLeftNow === 0) {
          if (highScorer.score < currentScore) {
            const newHighScorer = {
              name: playerName,
              score: currentScore,
            };
            updateHighScorer(newHighScorer);
            updateNewHighScore(true);
            fetch("https://ping-pong-highscore.herokuapp.com/updateHighScore", {
              method: "post",
              headers: {
                Accept: "application/json, text/plain, */*",
                "Content-Type": "application/json",
              },
              body: JSON.stringify(newHighScorer),
            })
              .then((res) => res.json())
              .then((res) => console.log(res));
          }
        }
        return livesLeftNow;
      });
    }
    updateGameInProgress(false);
  };

  const playerOnYourMarks = () => {
    ball.x = ball.inix;
    ball.y = ball.iniy;
    ball.vx = 12 + robotLevel;
    ball.vy = 12 + robotLevel;

    userpaddle.x = ball.inix;
    aipaddle.x = ball.inix;

    draw();
  };

  const draw = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawPaddles();
    drawBall();
  };

  const drawBall = () => {
    ctx.beginPath();
    ctx.fillStyle = "#FBFF12";
    ctx.arc(ball.x, ball.y, ball.rad, 0, Math.PI * 2, false);
    ctx.closePath();
    ctx.fill();
  };
  const drawPaddles = () => {
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(aipaddle.x - paddle.width / 2, 0, paddle.width, paddle.height);
    ctx.fillRect(
      userpaddle.x - paddle.width / 2,
      canvas.height - paddle.height,
      paddle.width,
      paddle.height
    );
  };

  const gameAnimation = () => {
    updateAiPaddle();
    updateUserPaddleX(mouseMoveX);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    draw();

    let newx = ball.x + ball.vx;
    let newy = ball.y + ball.vy;

    if (newy <= paddle.height) {
      if (ballCollidesWithThePaddle(newx, false)) {
        console.log("ball collided with AI paddle");
        updateScore((prevScore) => prevScore + 1);
        newy = paddle.height + ball.rad;
        ball.vy = -ball.vy;
        paddleVelocity = (aipaddle.x - trackPadx) / (50 / Math.abs(ball.vy));
        updateBallXVelocity(newx, paddleVelocity);
        // collide();
      } else {
        ballMissesThePaddle(true);
        return;
      }
    } else if (newy <= paddle.height + ball.rad + Math.abs(ball.vy * 10)) {
      trackPadx = aipaddle.x;
    }

    if (newy > canvas.height - paddle.height) {
      if (ballCollidesWithThePaddle(newx, true)) {
        updateScore((prevScore) => prevScore + 1);
        newy = canvas.height - paddle.height - ball.rad;
        ball.vy = -ball.vy;
        paddleVelocity = (userpaddle.x - trackPadx) / (50 / Math.abs(ball.vy));
        updateBallXVelocity(newx, paddleVelocity);
        // collide();
      } else {
        ballMissesThePaddle(false);
        return;
      }
    } else if (
      newy >=
      canvas.height - paddle.height - ball.rad - Math.abs(ball.vy * 10)
    ) {
      trackPadx = userpaddle.x;
    }
    if (newx <= ball.rad) {
      newx = ball.rad;
      ball.vx = -ball.vx;
    }
    if (newx >= canvas.width - ball.rad) {
      newx = canvas.width - ball.rad;
      ball.vx = -ball.vx;
    }

    ball.x = newx;
    ball.y = newy;

    requestAnimationFrameID = requestAnimationFrame(gameAnimation);
  };

  useEffect(() => {
    initializeGame();
  }, []);

  return (
    <div className="gameScreenWrapper">
      <Curtain></Curtain>
      <Scoreboard
        score={score}
        playerName={playerName}
        topScorer={highScorer}
        livesLeft={livesLeft}
        robotLevel={robotLevel}
        gameInProgress={gameInProgress}
        playerWon={playerWon}
        newHighScore={newHighScore}
      ></Scoreboard>
      <canvas
        id="myCanvas"
        className={`${gameInProgress ? "gameInProgress" : "gameNotInProgress"}`}
        data-livesleft={livesLeft}
        data-robot={robotLevel}
        data-score={score}
      ></canvas>
    </div>
  );
};

export default GameScreen;
