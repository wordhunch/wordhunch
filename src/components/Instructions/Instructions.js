import React from "react";
import "./Instructions.css";

const Instructions = () => {
  return (
    <div className="Instructions">
      <div className="instructions-container">
        <div className="howto">
          <div className="howto-content">
            <ul className="howto-list">
              <li className="howto-list-item">
                Guess the 5-letter target word in as few tries as possible
              </li>
              <li className="howto-list-item">
                The target word will always have 5 different letters, but you can choose to guess words with repeating letters as part of your process
              </li>
              <li className="howto-list-item">
                The game will display how many letters guessed words and the target word have in common
              </li>
              <li className="howto-list-item">
                The number of shared letters includes each shared letter ONCE!
              </li>
              <li className="howto-list-item">
                Guesses MUST be REAL 5 letter words
              </li>{" "}
              <li className="howto-list-item">
                Both target and guessed words are based out of the Scrabble
                dictionary
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Instructions;
