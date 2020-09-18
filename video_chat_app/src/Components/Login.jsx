import React, { useState } from "react";
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
  const { roomLobby } = props;
  const { origin } = props.location;
  const classes = useStyles();

  const handleSubmit = (submitEvent) => {
    submitEvent.preventDefault();

    navigate(`${origin}/${roomLobby}`, {
      state: { name, type: "user" },
    });
    // const socket = io.connect("http://localhost:5000");
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography variant="h5">{`Welcome! Please enter a username to join the ${roomLobby} group`}</Typography>
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
      </div>
    </Container>
  );
};

export default Login;
