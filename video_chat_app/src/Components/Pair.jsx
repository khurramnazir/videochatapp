import React, { useState } from "react";
import CountDown from "../Components/CountDown";
import Video from "../Components/Video";
import Trivia from "../Components/Trivia";
import Whiteboard from "../Components/Whiteboard";
import ErrorPage from "./ErrorPage";


const Pair = (props) => {
  const { roomLobby, pair, connection } = props;
  let [showPartner, setShowPartner] = useState(false);
  const updateShowPartner = () => {
    setShowPartner(true);
  };

  return (
    <div>
      {props.location.key !== "initial" ? (
        <>
          <p>{`Welcome to ${pair} of ${roomLobby.split("=")[0]}!`}</p>
          {/* <CountDown updateShowPartner={updateShowPartner} /> */}
          <Video
            showPartner={showPartner}
            connection={connection}
            roomLobby={roomLobby}
            pair={pair}
          />
          <Whiteboard connection={connection} pair={pair} roomLobby={roomLobby} />
          <Trivia connection={connection} pair={pair} roomLobby={roomLobby} />
        </>
      ) : (
        <ErrorPage msg={"incorrect login procedure/URL"} status={"404"} />
      )}
    </div>
  );
};

export default Pair;
