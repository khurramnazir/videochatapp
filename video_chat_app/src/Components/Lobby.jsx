import React, { useState, useEffect } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import ErrorPage from "../Components/ErrorPage";
import { navigate } from "@reach/router";

const Lobby = (props) => {
  const [users, setUsers] = useState([]);
  const [URL, setURL] = useState(null);
  const [isCopied, setIsCopied] = useState(false);
  const user = props.location.state;
  const { origin, pathname } = props.location;
  const link = origin + "/login" + pathname;
  const { roomLobby, connection } = props;
  const [indexInPair, setIndexInPair] = useState(null);

  useEffect(() => {
    // if(connection !== "")
    connection.emit("join room", {
      roomLobby,
      username: user.name,
      type: user.type,
    });

    connection.on("usersInLobby", (usersObj) => {
      setUsers(usersObj);
    });

    connection.on("getAllPairs", (pairs) => {
      let index;
      pairs.forEach((pair, i) => {
        const isPair = pair.filter((person, i) => {
          if (person.name === user.name) {
            setIndexInPair(i);
          }
          return person.name === user.name;
        });
        if (isPair.length === 1) index = i + 1;
      });
      const url = origin + pathname + `/room${index}`;
      setURL(url);
    });
  }, []);

  const handleClick = () => {
    connection.emit("move room", {
      roomLobby,
    });
  };

  if (URL !== null && indexInPair === 0) navigate(URL);
  if (URL !== null && indexInPair === 1) {
    setTimeout(function () {
      navigate(URL);
    }, 10);
  }
  if (URL !== null && indexInPair === 2) {
    setTimeout(function () {
      navigate(URL);
    }, 20);
  }

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
              return <li key={user.name}>{user.name}</li>;
            })}
          </ul>
          {user.type === "admin" && (
            <button onClick={handleClick}>START CHAT</button>
          )}
        </div>
      ) : (
        <ErrorPage msg={"incorrect login procedure/URL"} status={"404"} />
      )}
    </>
  );
};

export default Lobby;
