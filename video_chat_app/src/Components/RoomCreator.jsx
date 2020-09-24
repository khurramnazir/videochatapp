import React, { useState } from "react";
import { navigate } from "@reach/router";
import {
  Button,
  Typography,
  TextField,
  CssBaseline,
  Container,
} from "@material-ui/core";
import useStyles from "../styling/styles";
import { v1 as uuid } from "uuid";

import Card from "@material-ui/core/Card";

import CardContent from "@material-ui/core/CardContent";

const RoomCreator = () => {
  const [name, setName] = useState("");
  const [roomName, setRoomName] = useState("");
  const classes = useStyles();

  const handleSubmit = (submitEvent) => {
    submitEvent.preventDefault();
    navigate(`/${roomName}=${uuid()}`, {
      state: { name, type: "admin" },
    });
    // const socket = io.connect("http://localhost:5000");
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Card className={classes.cardRootHome}>
        <CardContent>
          <div className={classes.paper}>
            <Typography component="h1" variant="h5">
              Welcome! Please create a room by filling in the details below...
            </Typography>
            <form className={classes.form} onSubmit={handleSubmit}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="name"
                placeholder="Your name"
                name="name"
                autoFocus
                onChange={(e) => {
                  setName(e.target.value);
                }}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="roomName"
                placeholder="Room name"
                id="roomName"
                onChange={(e) => {
                  setRoomName(e.target.value);
                }}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.button}
              >
                Create Room
              </Button>
            </form>
          </div>
        </CardContent>
      </Card>
    </Container>
  );
};

export default RoomCreator;
