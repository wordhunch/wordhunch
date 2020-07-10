import React from "react";
import TargetWord from "./TargetWord";
import GuessedWords from "./GuessedWords";
import Input from "./Input";

const Game = () => {
  return (
    <div>
      Game.js
      <TargetWord/>
      <GuessedWords/>
      <Input/>
    </div>
  );
};

export default Game;
