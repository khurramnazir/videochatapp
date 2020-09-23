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
  Avatar,
  FormControl,
  FormControlLabel,
  RadioGroup,
  FormLabel,
  FormHelperText,
  Radio,
} from "@material-ui/core";
//import FaceIcon from "@material-ui/icons/Face";
import useStyles from "../styling/styles";

const Lobby = (props) => {
  const [users, setUsers] = useState([]);
  const [URL, setURL] = useState(null);
  const [isCopied, setIsCopied] = useState(false);
  const [chatTime, setChatTime] = useState(null);
  const [helperText, setHelperText] = useState("");
  let user = props.location.state;
  const { origin, pathname } = props.location;
  const link = origin + "/login" + pathname;
  const { roomLobby, connection } = props;
  const classes = useStyles();
  const [indexInPair, setIndexInPair] = useState(null);

  useEffect(() => {
    let mounted = true;
    if (connection !== "" && user) {
      connection.emit("join room", {
        roomLobby,
        username: user.name,
        type: user.type,
      });

      connection.on("usersInLobby", (usersObj) => {
        if (mounted) {
          setUsers(usersObj);
        }
      });

      connection.on("getAllPairs", (pairs) => {
        let index;
        if (mounted) {
          pairs.forEach((pair, i) => {
            const isPair = pair.filter((person, i) => {
              if (person.name === user.name) {
                setIndexInPair(i);
              }
              return person.name === user.name;
            });
            if (isPair.length === 1) index = i + 1;
          });
          const url = origin + pathname + `/${index}`;
          setURL(url);
        }
      });
    }
    return function cleanup() {
      mounted = false;
    };
  }, [connection, origin, pathname, roomLobby, user]);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!chatTime) {
      setHelperText("Please select an option.");
    } else {
      connection.emit("move room", {
        roomLobby,
      });
    }
  };

  const handleRadioChange = (event) => {
    setChatTime(event.target.value);
    setHelperText(" ");
  };

  if (URL !== null && indexInPair === 0)
    navigate(URL, {
      state: { chatTime },
    });
  if (URL !== null && indexInPair === 1) {
    setTimeout(function () {
      navigate(URL, {
        state: { chatTime },
      });
    }, 1000);
  }
  if (URL !== null && indexInPair === 2) {
    setTimeout(function () {
      navigate(URL, {
        state: { chatTime },
      });
    }, 2000);
  }

  return (
    <Container component="main" maxWidth="sm">
      <CssBaseline />
      {connection !== "" && user ? (
        <div className={classes.paper}>
          <Typography variant="h5">
            Hello {user.name}! You are now in the {roomLobby.split("=")[0]}{" "}
            lobby
          </Typography>

          {user.type === "admin" && (
            <CopyToClipboard text={link} onCopy={() => setIsCopied(true)}>
              <Button
                variant="outlined"
                color="primary"
                className={classes.button}
              >
                Copy link to clipboard
              </Button>
            </CopyToClipboard>
          )}
          {isCopied && (
            <Typography variant="caption"> Link has been copied</Typography>
          )}

          <br />
          <Typography variant="h6">
            {`Lobby participants: ${users.length}`}{" "}
          </Typography>
          {users.map((user) => {
            return (
              <Box key={user.name}>
                <ListItem alignItems="center">
                  <ListItemAvatar>
                    <Avatar className={classes.avatar}>
                      {/* {user.name.slice(0, 1).toUpperCase()} */}
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText>{user.name}</ListItemText>
                </ListItem>
              </Box>
            );
          })}
          {user.type === "admin" && (
            <form onSubmit={handleSubmit}>
              <FormControl component="fieldset" className={classes.formControl}>
                <FormLabel component="legend">
                  Please select a duration:
                </FormLabel>
                <RadioGroup
                  aria-label="time-options"
                  name="time-options"
                  value={chatTime}
                  onChange={handleRadioChange}
                >
                  <FormControlLabel
                    value="8000"
                    control={<Radio />}
                    label="One minute"
                  />
                  <FormControlLabel
                    value="120000"
                    control={<Radio />}
                    label="Two minutes"
                  />
                  <FormControlLabel
                    value="300000"
                    control={<Radio />}
                    label="Five minutes"
                  />
                </RadioGroup>
                <FormHelperText>{helperText}</FormHelperText>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  className={classes.button}
                  fullWidth
                >
                  START CHAT
                </Button>
              </FormControl>
            </form>
          )}
        </div>
      ) : (
        <ErrorPage msg={"incorrect login procedure/URL"} status={"404"} />
      )}
    </Container>
  );
};

export default Lobby;
