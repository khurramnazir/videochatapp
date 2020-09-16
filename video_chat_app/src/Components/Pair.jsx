import React, {useState} from "react";
import PairVideo from "../Components/PairVideo";
import CountDown from "../Components/CountDown";

const Pair = (props) => {
  const { roomLobby, pair } = props;

  let [showPartner, setShowPartner] = useState(false);

  const updateShowPartner = () => {
    setShowPartner(true)
  }

  return (
    //validate users of correct type
    <div>
      <p>{`Welcome to ${pair} of ${roomLobby}!`}</p>
      <CountDown updateShowPartner={updateShowPartner} />
      <PairVideo showPartner={showPartner}/>
    </div>
  );
};

export default Pair;
