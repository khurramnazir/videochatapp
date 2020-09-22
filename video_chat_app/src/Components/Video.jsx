import React, { useEffect, useRef, useState } from "react";
//import io from "socket.io-client";
import Peer from "simple-peer";
import styled from "styled-components";
//import Trivia from "../Components/Trivia";

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
  height: 40%;
  width: 50%;
  border: solid 3px red;
`;

const Video = (props) => {
  const ref = useRef();

  useEffect(() => {
    props.peer.on("stream", (stream) => {
      ref.current.srcObject = stream;
    });
  }, []);

  return <StyledVideo playsInline autoPlay ref={ref} />;
};

const videoConstraints = {
  height: window.innerHeight / 2,
  width: window.innerWidth / 2,
};

const Room = (props) => {
  const [peers, setPeers] = useState([]);
  const userVideo = useRef();
  const peersRef = useRef([]);

  const { connection, roomLobby, pair } = props;

  useEffect(() => {
    connection.emit("join pair", { pair, roomLobby });
    navigator.mediaDevices
      .getUserMedia({ video: videoConstraints, video: true, audio: true })
      .then((stream) => {
        userVideo.current.srcObject = stream;

        connection.emit("getAllOtherUsers", { pair, roomLobby });

        connection.on("all other users", (users) => {
          const peers = [];
          users.forEach((userID) => {
            const peer = createPeer(userID, connection.id, stream);

            peersRef.current.push({
              peerID: userID,
              peer,
            });

            peers.push(peer);
          });

          setPeers(peers);
        });

        connection.on("user joined", (payload) => {
          const item = peersRef.current.find(
            (p) => p.peerID === payload.callerID
          );
          if (!item) {
            const peer = addPeer(payload.signal, payload.callerID, stream);
            peersRef.current.push({
              peerID: payload.callerID,
              peer,
            });
            setPeers((users) => [...users, peer]);
          }
        });

        connection.on("receiving returned signal", (payload) => {
          const item = peersRef.current.find((p) => p.peerID === payload.id);
          item.peer.signal(payload.signal);
        });
      });
  }, []);

  function createPeer(userToSignal, callerID, stream) {
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
      });
    });

    return peer;
  }

  function addPeer(incomingSignal, callerID, stream) {
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
  }

  return (
    <Container>
      <StyledVideo muted ref={userVideo} autoPlay playsInline />
      {peers.map((peer, index) => {
        return <Video key={index} peer={peer} />;
      })}
      {/* <Trivia connection={connection} pair={pair} roomLobby={roomLobby} /> */}
    </Container>
  );
};

export default Room;
