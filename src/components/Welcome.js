import React, { useState, useRef, useEffect } from "react";
import "./Welcome.scss";
import logo from "../assets/logo.png";
import Robot from "./Robot";
import Curtain from "./Curtain";

export default function Welcome({ topScorer, onSubmissionOfUsername }) {
  const [showCurtain, setShowCurtain] = useState(false);
  let userNameField = useRef(null);

  useEffect(() => {
    userNameField = document.getElementById("username");
  });

  function handleKeyDown(e) {
    const username = userNameField.value;
    if (e.keyCode === 13 && username && username !== "") {
      setShowCurtain(true);
      setTimeout(() => {
        onSubmissionOfUsername(username);
      }, 500);
    }
  }

  function getTopScorer() {
    if (topScorer && topScorer.name && topScorer.score) {
      return (
        <p className="top-scorer">
          <i className="fas fa-star"></i> {topScorer.name} {topScorer.score}
        </p>
      );
    } else {
      return (
        <p className="top-scorer">
          <i className="fa fa-circle-o-notch fa-spin spinner"></i>
        </p>
      );
    }
  }

  return (
    <div className="welcome-container">
      {showCurtain ? <Curtain shouldClose={true}></Curtain> : null}
      <div className="row row-1">
        <img src={logo} className="logo" alt="Ping-pong app logo" />
        <p className="app-description">
          A simple HTML5 game where you are up against a bot that gets better
          with every level.{" "}
        </p>
      </div>
      <div className="row row-2">
        <Robot attitude="chill"></Robot>
        <p className="vs">vs.</p>
        <input
          type="text"
          id="username"
          required
          placeholder="Enter your name"
          onKeyDown={(e) => handleKeyDown(e)}
        ></input>
        <p className="enterPrompt">Press Enter</p>
      </div>
      <div className="row row-3">
        <div className="top-score">
          <p className="top-score-header">Top score</p>
          {getTopScorer()}
        </div>
        <div className="social-links">
          <a
            className="social-link github"
            href="https://github.com/eccentricdz"
          >
            <i className="fab fa-github"></i>
          </a>
          <a
            className="social-link instagram"
            href="https://www.instagram.com/createdbyrahul/"
          >
            <i className="fab fa-instagram"></i>
          </a>
          <a
            className="social-link behance"
            href="https://www.behance.net/eccentricdz"
          >
            <i className="fab fa-behance"></i>
          </a>
        </div>
      </div>
    </div>
  );
}
