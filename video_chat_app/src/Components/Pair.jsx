import React, { useEffect, useState } from "react";
import Video from "../Components/Video";
import Trivia from "../Components/Trivia";
import Pictionary from "../Components/Pictionary";
import ErrorPage from "./ErrorPage";
import GameSelector from "./GameSelector";

const Pair = (props) => {
  const { roomLobby, pair, connection } = props;
  let user = props.location.state.user;
  const [gameSelected, setGameSelected] = useState("No Game");
  const [isYourGo, setIsYourGo] = useState(false);

  return (
    <div>
      {props.location.key !== "initial" ? (
        <>
          <p>{`Welcome to ${pair} of ${roomLobby.split("=")[0]}!`}</p>
          <Video
            connection={connection}
            roomLobby={roomLobby}
            pair={pair}
            user={user}
          />
          <GameSelector
            setGameSelected={setGameSelected}
            gameSelected={gameSelected}
            isYourGo={isYourGo}
            connection={connection}
            pair={pair}
            roomLobby={roomLobby}
          />

          {gameSelected === "Pictionary" && (
            <Pictionary
              connection={connection}
              pair={pair}
              roomLobby={roomLobby}
            />
          )}
          {gameSelected === "Trivia" && (
            <Trivia connection={connection} pair={pair} roomLobby={roomLobby} />
          )}
        </>
      ) : (
        <ErrorPage msg={"incorrect login procedure/URL"} status={"404"} />
      )}
    </div>
  );
};

export default Pair;
