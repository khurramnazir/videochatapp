import React, { useState, useEffect } from "react";
import { navigate } from "@reach/router";
import CircularProgress from "@material-ui/core/CircularProgress";
import TimerIcon from "@material-ui/icons/Timer";
import useStyles from "../styling/styles";

const CountDown = ({
  chatTime,
  roomLobby,
  myInfo,
  connection,
  pair,
  userVideo,
}) => {
  let [timeLeft, setTimeLeft] = useState(chatTime * 60);

  const take1Second = () => {
    setTimeLeft(timeLeft - 1);
  };

  useEffect(() => {
    if (timeLeft > 0) {
      setTimeout(take1Second, 1000);
    }
    if (timeLeft === 0) {
      userVideo.current.srcObject.getTracks().forEach(function (track) {
        track.stop();
      });
      connection.emit("leave pair", { roomLobby, pair });
      navigate("/" + roomLobby + "/thanks", { state: myInfo });
    }
  });

  // return <div>{timeLeft <= 60 && <p>{timeLeft}</p>}</div>;

  return (
    <div>
      {timeLeft <= 60 && (
        <CircularProgress variant="static" value={timeLeft * (100 / 60)} />
      )}
    </div>
  );
};

export default CountDown;
