import React, { useState, useEffect } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import ErrorPage from "../Components/ErrorPage";
// import io from "socket.io-client";

const Lobby = (props) => {
  const [isCopied, setIsCopied] = useState(false);
  const user = props.location.state;
  const { origin, pathname } = props.location;
  const link = origin + "/login" + pathname;

  // console.log(props.connection);

  // useEffect(() => {
  //   props.connection.emit("join room", "bridges");
  // }, [props.connection]);

  return (
    <>
      {user ? (
        <div>
          <CopyToClipboard text={link} onCopy={() => setIsCopied(true)}>
            <button>Copy link to clipboard</button>
          </CopyToClipboard>
          {isCopied && <p> Link has been copied</p>}
          <br />
          {user.name} you are in the lobby
          {user.type === "admin" && <button>START CHAT</button>}
        </div>
      ) : (
        <ErrorPage msg={"incorrect login procedure/URL"} status={"404"} />
      )}
    </>
  );
};

export default Lobby;
