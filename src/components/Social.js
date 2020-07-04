import React from "react";
import './Social.scss';

export default function Social() {
  return (
    <div className="social-links">
      <a
        className="social-link github"
        target="_blank"
        rel="noopener noreferrer"
        href="https://github.com/eccentricdz/ping-pong-react"
      >
        <i className="fab fa-github"></i>
      </a>
      <a
        className="social-link instagram"
        target="_blank"
        rel="noopener noreferrer"
        href="https://www.instagram.com/createdbyrahul/"
      >
        <i className="fab fa-instagram"></i>
      </a>
      <a
        className="social-link behance"
        target="_blank"
        rel="noopener noreferrer"
        href="https://www.behance.net/eccentricdz"
      >
        <i className="fab fa-behance"></i>
      </a>
    </div>
  );
};
