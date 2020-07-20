import React from "react";
import "./About.css";

const About = () => {
  return (
    <div className="About">
      <h2>About</h2>
      <div className="about-container">
        <div className="how-to-play">
          <div className="sub-header">
          <h4>How to Play</h4>
          </div>
          <div className="sub-content">
          <p>
            The object of the game is to figure out what the target word is,
            which will be hidden until you figure it out, in the fewest possible
            tries. The target word will always have 5 differing letters, but you
            can guess words that have repeating letters to get started or to try
            and determine what letters are needed for the target word. After you
            make a guess, the game will let you know how many letters from your
            guessed word are used in the target word. Keep in mind that if the
            guessed word has a repeating letter that is in the target word, that
            letter will be counted once as it is only in the target word 1
            timne. ex: Target Word = SHAME Guessed word = EERIE it will show
            EERIE 1, as SHAME and EERIE only share the letter E and it is only
            used 1 time in SHAME. Use the past guesses and numbers given to you
            to help you determine what letters are used in the target word. The
            guesses MUST be REAL 5 letter words. Both target and guessed words
            are based out of the scrablle dictionary.
          </p>
          </div>
        </div>
        <div className="test"><div className="sub-header"><h4>Test</h4></div>
          <div className="sub-content"><p>Deserunt incididunt incididunt commodo minim. Amet minim nostrud ex Lorem labore. Ullamco laborum aliquip laborum nisi Lorem quis ullamco dolore et dolor in. Non sunt voluptate incididunt aliquip Lorem commodo elit duis proident minim labore cillum deserunt veniam. Duis non exercitation proident fugiat do do officia adipisicing eiusmod non. Cillum esse magna est incididunt magna minim aliqua voluptate. Labore aute excepteur tempor laboris elit consectetur elit id minim id incididunt ut qui sit.</p></div></div>
      </div>
    </div>
  );
};

export default About;
