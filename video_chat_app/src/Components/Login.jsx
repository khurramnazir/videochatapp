import React, { useState, useEffect } from "react";
import { navigate } from "@reach/router";
import {
  Button,
  Input,
  Container,
  CssBaseline,
  Typography,
} from "@material-ui/core";
import useStyles from "../styling/styles";

const Login = (props) => {
  const [name, setName] = useState("");
  const [isInvalidUser, setInvalidUser] = useState(false);
  const { roomLobby, connection } = props;
  const { origin } = props.location;
  const classes = useStyles();

  useEffect(() => {
    console.log(connection, "<---- connection");
    const abortController = new AbortController();
    if (connection !== "") {
      connection.emit("checkUsernames", {
        roomLobby,
        signal: abortController.signal,
      });
    }

    // return () => {
    //   abortController.abort();
    //};
  }, [name]);

  connection.on("usersInLobby", (usersObj) => {
    const handleSubmit = (submitEvent) => {
      submitEvent.preventDefault();
      console.log(connection, "<--- connection from submit handler");

      console.log("inside the usersInLobby handler...");
      const existingUser = usersObj.filter((user) => {
        return user.name === name;
      });
      if (existingUser.length === 0) {
        navigate(`${origin}/${roomLobby}`, {
          state: { name, type: "user" },
        });
      } else {
        setInvalidUser(true);
      }
    };
  });

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography variant="h5">{`Welcome! Please enter a username to join the ${
          roomLobby.split("=")[0]
        } group`}</Typography>
        <form onSubmit={handleSubmit} className={classes.form}>
          <Input
            type="text"
            id="name"
            name="name"
            placeholder="Your Name"
            onChange={(e) => {
              setName(e.target.value);
            }}
            required
            autoFocus
          ></Input>
          <Button type="submit" color="primary" className={classes.button}>
            Join Lobby
          </Button>
        </form>
        {isInvalidUser && <p>Choose another username</p>}
      </div>
    </Container>
  );
};

export default Login;
