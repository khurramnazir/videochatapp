import React, { useState } from "react";
import CountDown from "../Components/CountDown";
import Video from "../Components/Video";
// import Trivia from "../Components/Trivia";

const Pair = (props) => {
  const { roomLobby, pair, connection } = props;

  let [showPartner, setShowPartner] = useState(false);

  const updateShowPartner = () => {
    setShowPartner(true);
  };

  // useEffect(() => {
  //   // if(connection !== "")
  //   connection.emit("join pair", { pair, roomLobby });

  //   connection.on("joined pair room", (message) => {
  //     console.log(message);
  //   });
  // }, []);

  return (
    //validate users of correct type
    <div>
      <p>{`Welcome to ${pair} of ${roomLobby}!`}</p>
      <CountDown updateShowPartner={updateShowPartner} />
      <Video
        showPartner={showPartner}
        connection={connection}
        roomLobby={roomLobby}
        pair={pair}
      />
      {/* <Trivia /> */}
    </div>
  );
};

export default Pair;
