import React from "react";
//import CountDown from "../Components/CountDown";
import Video from "../Components/Video";
import Trivia from "../Components/Trivia";
import Pictionary from "../Components/Pictionary";
import ErrorPage from "./ErrorPage";

const Pair = (props) => {
  const { roomLobby, pair, connection } = props;
  let user = props.location.state.user;
  
//   let [showPartner, setShowPartner] = useState(false);
//   const updateShowPartner = () => {
//     setShowPartner(true);
//   };

  return (
    <div>
      {props.location.key !== "initial" ? (
        <>
          <p>{`Welcome to ${pair} of ${roomLobby.split("=")[0]}!`}</p>
          {/* <CountDown updateShowPartner={updateShowPartner} /> */}
          <Video
            //showPartner={showPartner}
            connection={connection}
            roomLobby={roomLobby}
            pair={pair}
            user={user}
          />
          <Pictionary
            connection={connection}
            pair={pair}
            roomLobby={roomLobby}
          />

          <Trivia connection={connection} pair={pair} roomLobby={roomLobby} />
        </>
      ) : (
        <ErrorPage msg={"incorrect login procedure/URL"} status={"404"} />
      )}
    </div>
  );
};

export default Pair;
