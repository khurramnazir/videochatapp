import React, { useState, useEffect } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import ErrorPage from "../Components/ErrorPage";
import { navigate } from "@reach/router";
import {
  Button,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Container,
  CssBaseline,
  Box,
  Typography,
} from "@material-ui/core";
import FaceIcon from "@material-ui/icons/Face";
import useStyles from "../styling/styles";

const Lobby = (props) => {
  const [users, setUsers] = useState([]);
  const [URL, setURL] = useState(null);
  const [isCopied, setIsCopied] = useState(false);
  const user = props.location.state;
  const { origin, pathname } = props.location;
  const link = origin + "/login" + pathname;
  const { roomLobby, connection } = props;
  const classes = useStyles();
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
    }, 1000);
  }
  if (URL !== null && indexInPair === 2) {
    setTimeout(function () {
      navigate(URL);
    }, 2000);
  }

  return (
    <Container component="main" maxWidth="sm">
      <CssBaseline />
      {user ? (
        <div className={classes.paper}>
          <Typography variant="h5">
            Hello {user.name}! You are now in the {roomLobby.split("=")[0]}{" "}
            lobby
          </Typography>
          <CopyToClipboard text={link} onCopy={() => setIsCopied(true)}>
            <Button
              variant="outlined"
              color="primary"
              className={classes.button}
            >
              Copy link to clipboard
            </Button>
          </CopyToClipboard>
          {isCopied && (
            <Typography variant="h7"> Link has been copied</Typography>
          )}
          <br />
          <Typography variant="h6">Lobby participants:</Typography>
          {users.map((user) => {
            return (
              <Box key={user.name}>
                <ListItem alignItems="center">
                  <ListItemAvatar>
                    <FaceIcon color="primary" className={classes.avatar} />
                  </ListItemAvatar>
                  <ListItemText>{user.name}</ListItemText>
                </ListItem>
              </Box>
            );
          })}
          {user.type === "admin" && (
            <Button
              onClick={handleClick}
              variant="contained"
              color="primary"
              className={classes.button}
              fullWidth
            >
              START CHAT
            </Button>
          )}
        </div>
      ) : (
        <ErrorPage msg={"incorrect login procedure/URL"} status={"404"} />
      )}
    </Container>
  );
};

export default Lobby;
