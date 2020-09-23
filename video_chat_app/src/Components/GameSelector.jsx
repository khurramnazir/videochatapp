import React, { useEffect } from "react";

const GameSelector = ({
  setGameSelected,
  gameSelected,
  isYourGo,
  connection,
  pair,
  roomLobby,
}) => {
  useEffect(() => {
    connection.on("receivedGame", (game) => {
      console.log(game, "received game");
      setGameSelected(game);
    });
  });

  function selectGame(e) {
    const game = e.target.name;

    setGameSelected(game);
    connection.emit("sendGame", { pair, roomLobby, game });
  }

  return (
    <nav>
      {gameSelected === "No Game" ? (
        <>
          <button onClick={selectGame} name="Trivia">
            Trivia
          </button>
          <button onClick={selectGame} name="Pictionary">
            Pictionary
          </button>
        </>
      ) : (
        <button onClick={selectGame} name="No Game">
          Game Home
        </button>
      )}
    </nav>
  );
};
export default GameSelector;
