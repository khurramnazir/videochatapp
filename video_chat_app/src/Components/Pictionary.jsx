import React, { useEffect, useState } from "react";
import { objects } from "../utils/data";
import Whiteboard from "../Components/Whiteboard";

const Pictionary = (props) => {
  const [randomObject, setRandomObject] = useState(null);
  const { connection, pair, roomLobby, setIsYourGo, isYourGo } = props;

  useEffect(() => {
    isYourGo && getRandomObject();

    connection.on("receivedPlayerSwap", () => {
      setIsYourGo(!isYourGo);
    });
  });

  function getRandomObject() {
    const randomIndex = Math.floor(Math.random() * objects.length);
    setRandomObject(objects[randomIndex]);
  }

  function swapPlayers() {
    setIsYourGo(!isYourGo);
    setRandomObject(null);
    connection.emit("sendPlayerSwap", { pair, roomLobby });
  }

  return (
    <>
      {isYourGo ? (
        <>
          <p>It's your turn to draw!</p>
          <p>{`Please draw a "${randomObject}"`}</p>
          <p>
            When you have finished click swap player for the other person to
            take over drawing
          </p>
          <button onClick={swapPlayers}>Swap Players</button>
        </>
      ) : (
        <>
          <p>It's your turn to guess!</p>
        </>
      )}

      <Whiteboard
        connection={connection}
        pair={pair}
        roomLobby={roomLobby}
        isYourGo={isYourGo}
      />
    </>
  );
};

export default Pictionary;
