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
  const [users, setUsers] = useState([]);
  const [isIdInLobby, setIdInLobby] = useState(false);
  const [isInvalidUser, setInvalidUser] = useState(null);
  const { roomLobby, connection } = props;
  const { origin } = props.location;
  const classes = useStyles();

  useEffect(() => {
    let mounted = true;
    if (connection !== "") {
      connection.emit("checkUsernames", roomLobby);
      connection.on("usersInLobby", (usersObj) => {
        if (mounted) setUsers(usersObj);
      });
    }
    return function cleanup() {
      mounted = false;
    };
  }, [name]);

  useEffect(() => {
    let mounted = true;
    if (connection !== "") {
      connection.emit("checkUsernames", roomLobby);
      connection.on("usersInLobby", (usersObj) => {
        if (mounted) {
          setUsers(usersObj);
          const userInLobby = users.filter((user) => {
            return user.id === connection.id;
          });
          console.log(userInLobby);
          if (userInLobby.length > 0) {
            setIdInLobby(true);
            connection.emit("leave lobby", roomLobby);
          }
        }
      });
    }
    return function cleanup() {
      mounted = false;
    };
  }, [name]);

  const handleSubmit = (submitEvent) => {
    submitEvent.preventDefault();
    const existingUser = users.filter((user) => {
      return user.name === name;
    });
    if (existingUser.length === 0) {
      navigate(`${origin}/${roomLobby}`, {
        state: { name, type: "user" },
      });
      setInvalidUser(false);
    } else {
      setInvalidUser(true);
    }
  };

  // const userInLobby = users.filter((user) => {
  //   return user.id === connection.id;
  // });
  // if (userInLobby.length > 0) {
  //   console.log(connection);
  //   connection.emit("leave lobby", roomLobby);
  // }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography variant="h5">
          {!isIdInLobby
            ? `Welcome! Please enter a username to join the ${
                roomLobby.split("=")[0]
              } group`
            : "please login again..."}
        </Typography>
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
