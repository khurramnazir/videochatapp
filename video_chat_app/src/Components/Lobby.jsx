import React, { useState, useEffect } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import ErrorPage from "../Components/ErrorPage";
// import io from "socket.io-client";

const Lobby = (props) => {
  const [yourID, setYourID] = useState("");
  const [isCopied, setIsCopied] = useState(false);
  const user = props.location.state;
  const { origin, pathname } = props.location;
  const link = origin + "/login" + pathname;
  const { roomLobby, connection } = props;

  useEffect(() => {
    connection.emit("join room", { roomLobby, username: user.name });
    // connection.emit("myname", user.name);
    // connection.on("yourID", (id) => {
    //   console.log(id);
    //   setYourID(id);
    // });
    // console.log(user, yourID);
  }, []);

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
