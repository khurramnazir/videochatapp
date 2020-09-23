import React, { useEffect, useState } from "react";
import { objects } from "../utils/data";
import Whiteboard from "../Components/Whiteboard";

const Pictionary = (props) => {
  const [randomObject, setRandomObject] = useState(null);
  //const [isDrawer, setIsDrawer] = useState(null);
  const { connection, pair, roomLobby } = props;

  useEffect(() => {});

  function getRandomObject() {
    const randomIndex = Math.floor(Math.random() * objects.length);
    //console.log(objects);
    //console.log(randomIndex);
    setRandomObject(objects[randomIndex]);
  }

  return (
    <>
      {randomObject === null ? (
        <button onClick={getRandomObject}>Get object</button>
      ) : (
        <p>{randomObject}</p>
      )}
      <Whiteboard connection={connection} pair={pair} roomLobby={roomLobby} />
    </>
  );
};

export default Pictionary;
