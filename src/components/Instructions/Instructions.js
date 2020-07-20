import React from "react";
import "./Instructions.css";

const Instructions = () => {
  return (
    <div className="Instructions">
      <h2>Instructions</h2>
      <div className="instructions-container">
        <div className="howto">
          <div className="howto-header">
            <h4>How to Play</h4>
          </div>
          <div className="howto-content">
            <ul className="howto-list">
              <li className="howto-list-item">
                The object of the game is to figure out what the target word is
              </li>
              <li className="howto-list-item">
                Target will be hidden until you figure it out
              </li>
              <li className="howto-list-item">
                Try to guess target word in fewest guesses possible
              </li>
              <li className="howto-list-item">
                Target word will always have 5 differing letters
              </li>
              <li className="howto-list-item">
                You can guess words that have repeating letters to get started
                or to try and determine what letters are needed for the target
                word
              </li>
              <li className="howto-list-item">
                The game will let you know how many letters from your guessed
                word are used in the target word
              </li>
              <li className="howto-list-item">
                Guesses MUST be REAL 5 letter words
              </li>{" "}
              <li className="howto-list-item">
                Both target and guessed words are based out of the scrablle
                dictionary
              </li>
            </ul>
          </div>
          <p className="note">
            NOTE: Keep in mind that if the guessed word has a repeating letter that is
            in the target word, that letter will be counted once as it is only
            in the target word 1 time. ex: Target Word = SHAME Guessed word =
            EERIE it will show EERIE 1, as SHAME and EERIE only share the letter
            E and it is only used 1 time in SHAME. Use the past guesses and
            numbers given to you to help you determine what letters are used in
            the target word.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Instructions;
