import Square from "./Square.js";
import "./Board.css";

const Board = ({ board, onClick }) => {
  return (
    <div className="board">
      {board.map((value, i) => {  
        return <Square key={i} value={value} onClick={() => value === null && onClick(i)} />; //This function will fill in the boards and will also only fill if the board is empty
      })}
    </div>
  );
};

export default Board;
