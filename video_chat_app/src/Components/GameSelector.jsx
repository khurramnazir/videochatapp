import React, { useEffect } from "react";

const GameSelector = ({
  setGameSelected,
  gameSelected,
  setIsYourGo,
  connection,
  pair,
  roomLobby,
}) => {
  useEffect(() => {
    connection.on("receivedGame", (game) => {
      setGameSelected(game);
      setIsYourGo(false);
    });
  });

  function selectGame(e) {
    const game = e.target.name;
    setGameSelected(game);
    setIsYourGo(true);
    connection.emit("sendGame", { pair, roomLobby, game });
  }

  return (
    <nav>
      {gameSelected === "No Game" ? (
        <>
          <p>Pick a game to play</p>
          <button onClick={selectGame} name="Trivia">
            <img
              onClick={selectGame}
              name="Trivia"
              className="gameIcon"
              src="https://logopond.com/logos/7cbefd1c803c7e9515ea4be59233da29.png"
              alt="Trivia"
            />
          </button>

          <button onClick={selectGame} name="Pictionary">
            <img
              onClick={selectGame}
              name="Pictionary"
              className="gameIcon"
              src="https://mir-s3-cdn-cf.behance.net/projects/404/7810265.5473edf9ace35.jpg"
              alt="Pictionary"
            />
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
