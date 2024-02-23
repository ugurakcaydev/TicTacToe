import { useState, useEffect } from "react";
import "./App.css";
import classNames from "classnames";

const winningConditionsIndex = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];
// eslint-disable-next-line no-unused-vars
const defaultBoardState = Array.from({ length: 9 }, (_, i) => {
  return null;
});

function App() {
  const [isDraw, setIsDraw] = useState(false);
  const [player, setPlayer] = useState("X");
  const [winner, setWinner] = useState(null);
  const [board, setBoard] = useState(defaultBoardState);

  const handleClick = (tile, index) => {
    if (tile) return;
    const newBoard = [...board];
    newBoard[index] = player;
    setBoard(newBoard);
    setPlayer(player === "X" ? "O" : "X");
  };

  const restartGame = () => {
    setWinner(null);
    setIsDraw(false);
    setBoard(defaultBoardState);
    setPlayer("X");
  };

  useEffect(() => {
    winningConditionsIndex.forEach((conditionIndex) => {
      if (
        board[conditionIndex[0]] !== null &&
        board[conditionIndex[0]] === board[conditionIndex[1]] &&
        board[conditionIndex[1]] === board[conditionIndex[2]]
      ) {
        setWinner(board[conditionIndex[0]]);
      }
      if (!winner && board.every((tile) => tile !== null)) {
        setIsDraw(true);
      }
    });
  }, [board, winner]);

  return (
    <div className="container w-[256px] h-[100vh] flex flex-col items-center justify-center bg-gr ">
      {winner || isDraw ? (
        <div className="text-lg font-serif">- Game End -</div>
      ) : (
        <div>{`Next Player is :${player}`}</div>
      )}

      <div className="board grid grid-cols-3 gap-5 bg-zinc-100 p-3 rounded-sm my-4">
        {board.map((tile, index) => (
          <button
            key={index}
            onClick={() => {
              handleClick(tile, index);
            }}
            className={classNames(
              "w-16 h-16 bg-zinc-200 rounded-sm border border-zinc-300 shadow-lg hover:scale-95",
              {
                "pointer-events-none": winner,
              }
            )}
          >
            {tile}
          </button>
        ))}
      </div>

      {(winner || isDraw) && (
        <div className="w-full flex items-center justify-between">
          <div className="text-base">
            {winner ? `Winner : ${winner} Congrat` : isDraw && `Game is draw`}
          </div>
          <button
            onClick={restartGame}
            className="border border-green-500 px-2 py-1 rounded-md bg-green-500 text-white shadow-xl"
          >
            Restart
          </button>
        </div>
      )}
    </div>
  );
}

export default App;
