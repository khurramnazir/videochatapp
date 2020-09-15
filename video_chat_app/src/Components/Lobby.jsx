import React, { useState, useEffect, useRef } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import ErrorPage from "../Components/ErrorPage";

const Lobby = (props) => {
  const [users, setUsers] = useState([]);
  const [isCopied, setIsCopied] = useState(false);
  const user = props.location.state;
  const { origin, pathname } = props.location;
  const link = origin + "/login" + pathname;
  const { roomLobby, connection } = props;

  useEffect(() => {
    connection.emit("join room", {
      roomLobby,
      username: user.name,
      type: user.type,
    });

    connection.on("usersInLobby", (usersObj) => {
      setUsers(usersObj);
    });
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
          {user.name} you are in the {roomLobby} lobby
          <ul>
            <p>userlist:</p>
            {users.map((user) => {
              return <li>{user.name}</li>;
            })}
          </ul>
          {user.type === "admin" && <button>START CHAT</button>}
        </div>
      ) : (
        <ErrorPage msg={"incorrect login procedure/URL"} status={"404"} />
      )}
    </>
  );
};

export default Lobby;
