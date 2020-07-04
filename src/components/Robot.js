import React from "react";
import "./Robot.scss";

function Robot({ attitude }) {
  return (
    <div className={`${attitude} robot`}>
      <div className="head">
        <div className="socket">
          <div className="left-eye eye"></div>
          <div className="right-eye eye"></div>
        </div>
      </div>
      <div className="left-ear ear"></div>
      <div className="right-ear ear"></div>
      <div className="chin">
        <div className="mouth"></div>
        <div className="jaw"></div>
      </div>
    </div>
  );
}

export default Robot;
