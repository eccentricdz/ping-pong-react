import React from "react";
import "./Gamestat.scss";

const Gamestat = ({ name, header, value, kind, highlight }) => {
  let hearts = [];
  if (kind === "hearts") {
    for (let i = 0; i < value; i++) {
      hearts.push(
        <li className="heart" key={i}>
          <i className="fas fa-heart"></i>
        </li>
      );
    }
  }

  return (
    <div className={`game-stat ${highlight ? "highlight" : ""}`} id={name}>
      <p className="game-stat-header">{header}</p>
      {kind === "hearts" ? (
        <ul className={`hearts game-stat-value ${value < 3 ? "injured" : ""}`}>
          {hearts}
        </ul>
      ) : (
        <p className="game-stat-value">{value!==undefined ? value : (<i className="fa fa-circle-o-notch fa-spin spinner"></i>)}</p>
      )}
    </div>
  );
};

export default Gamestat;
