import "./App.css";
import React, { useState } from "react";

import Board from "./components/Board.js";
import { Scoreboard } from "./components/Scoreboard";
import ResetButton from "./components/ResetButton";

function App() {
  //Defining the win conditions
  const WIN_CONDITIONS = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  //useState to set an empty array of 9 which will be the board
  const [board, setBoard] = useState(Array(9).fill(null));
  //A use state to set the turn to use on the function below
  const [xPlaying, setXPlaying] = useState(true);
  //A use state that will set the scoreboard
  const [scores, setScores] = useState({ xScocre: 0, oScore: 0 });
  //A use state that resets the game after someone wins
  const [gameOver, setGameOver] = useState(false);

  //This is where the functionality goes for selecting X then Selecting O
  const handleBoxClick = (boxIndex) => {
    //Loops thrigh the array and conditions which character goes next based on the conditional
    const updateBoard = board.map((value, i) => {
      if (i === boxIndex) {
        return xPlaying === true ? "X" : "O";
      } else {
        return value;
      }
    });
    const winner = checkWinner(updateBoard);
    if (winner) {
      if (winner === "O") {
        let { oScore } = scores;
        oScore += 1;
        setScores({ ...scores, oScore });
      } else {
        let { xScocre } = scores;
        xScocre += 1;
        setScores({ ...scores, xScocre });
      }
    }
    setBoard(updateBoard);
    setXPlaying(!xPlaying);
  };
  //Functionality of how to check who wins
  const checkWinner = (board) => {
    for (let i = 0; i < WIN_CONDITIONS.length; i++) {
      const [x, y, z] = WIN_CONDITIONS[i];

      if (board[x] && board[x] === board[y] && board[y] === board[z]) {
        setGameOver(true);
        return board[x];
      }
    }
  };

  //Functionality that will reset the values on the board once somebody has won
  const resetBoard = () => {
    setGameOver(false);
    setBoard(Array(9).fill(null));
  };

  return (
    <div className="App">
      {/* scoreboard  */}
      <Scoreboard scores={scores} xPlaying={xPlaying} />
      {/* This is where thr functianlity of the components comes together */}
      <Board board={board} onClick={gameOver ? resetBoard : handleBoxClick} />
      <ResetButton resetBoard={resetBoard} />
    </div>
  );
}

export default App;
