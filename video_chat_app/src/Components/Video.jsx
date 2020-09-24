import React, { useEffect, useRef, useState, useCallback } from "react";
import Peer from "simple-peer";
import styled from "styled-components";
import Countdown from "../Components/CountDown";
import Grid from "@material-ui/core/Grid";
import useStyles from "../styling/styles";

const Container = styled.div`
  padding: 20px;
  display: flex;
  height: 100vh;
  width: 90%;
  flex-direction: row;
  margin: auto;
  flex-wrap: wrap;
`;

const StyledVideo = styled.video`
  max-width: 80%;
  border: solid 1px red;
`;

const StyledPartnerVideo = styled.video`
  max-width: 80%;
  border: solid 1px green;
`;

const Video = (props) => {
  const ref = useRef();

  useEffect(() => {
    props.peer.on("stream", (stream) => {
      ref.current.srcObject = stream;
    });
  });

  return <StyledPartnerVideo playsInline autoPlay ref={ref} />;
};

const Room = (props) => {
  const [peers, setPeers] = useState([]);
  const [myInfo, setMyInfo] = useState([]);
  const userVideo = useRef();
  const peersRef = useRef([]);
  const { connection, roomLobby, pair, chatTime } = props;
  console.log(chatTime, "<<<chattime");

  const createPeer = useCallback(
    (userToSignal, callerID, stream) => {
      const peer = new Peer({
        initiator: true,
        trickle: false,
        stream,
      });

      peer.on("signal", (signal) => {
        connection.emit("sending signal", {
          userToSignal,
          callerID,
          signal,
          pair,
        });
      });

      return peer;
    },
    [connection, pair]
  );

  const addPeer = useCallback(
    (incomingSignal, callerID, stream) => {
      const peer = new Peer({
        initiator: false,
        trickle: false,
        stream,
      });
      peer.on("signal", (signal) => {
        connection.emit("returning signal", { signal, callerID });
      });
      peer.signal(incomingSignal);
      return peer;
    },
    [connection]
  );

  useEffect(() => {
    connection.emit("join pair", { pair, roomLobby });
    // connection.on("getPairInfo", (pairs) => {
    //   setUsersInPair(pairs);
    // });
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((stream) => {
        userVideo.current.srcObject = stream;
        connection.emit("getAllOtherUsers", { pair, roomLobby });
        connection.on("all other users", ({ users, pairs }) => {
          const myInfo = pairs.filter((user) => {
            return user.id === connection.id;
          });
          setMyInfo(myInfo);
          console.log(myInfo);

          const peers = [];
          users.forEach((userID) => {
            const peerName = pairs.filter((user) => {
              return user.id === userID;
            });
            const peer = createPeer(userID, connection.id, stream);
            peersRef.current.push({
              peerID: userID,
              peerName: peerName[0].name,
              peer,
            });
            peer.peerName = peerName[0].name;
            peers.push(peer);
          });

          setPeers(peers);
        });

        connection.on("user joined", (payload) => {
          const item = peersRef.current.find(
            (p) => p.peerID === payload.callerID
          );
          if (!item) {
            const peerName = payload.pair.filter((user) => {
              return user.id === payload.callerID;
            });
            const peer = addPeer(payload.signal, payload.callerID, stream);
            peersRef.current.push({
              peerID: payload.callerID,
              peerName: peerName[0].name,
              peer,
            });
            peer.peerName = peerName[0].name;
            setPeers((users) => [...users, peer]);
          }
        });

        connection.on("receiving returned signal", (payload) => {
          const item = peersRef.current.find((p) => p.peerID === payload.id);
          item.peer.signal(payload.signal);
        });
      });
  }, [addPeer, createPeer, connection, pair, roomLobby, userVideo]);

  const classes = useStyles();

  return (
    <>
      <Countdown
        chatTime={chatTime}
        roomLobby={roomLobby}
        myInfo={myInfo[0]}
        connection={connection}
        pair={pair}
        userVideo={userVideo}
      />
      <Grid container className={classes.root} spacing={0.5}>
        <Grid item xs={12}>
          <Grid container justify="center" spacing={1}>
            <Grid item xs={12 / (peers.length + 1)}>
              <StyledVideo muted ref={userVideo} autoPlay playsInline />
              {myInfo.length > 0 && <p>{`${myInfo[0].name}'s video`}</p>}
            </Grid>
            {peers.map((peer, index) => {
              return (
                <Grid key={index} item xs={12 / (peers.length + 1)}>
                  <Video key={index} peer={peer} />
                  <p>{`${peer.peerName}'s video`}</p>
                </Grid>
              );
            })}
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default Room;
