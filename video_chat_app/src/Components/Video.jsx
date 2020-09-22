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
  height: 20%;
  width: 25%;
  border: solid 3px red;
`;

const StyledPartnerVideo = styled.video`
  height: 40%;
  width: 50%;
  border: solid 3px green;
`;

const Video = (props) => {
  const ref = useRef();

  useEffect(() => {
    props.peer.on("stream", (stream) => {
      ref.current.srcObject = stream;
    });
  }, []);

  return <StyledPartnerVideo playsInline autoPlay ref={ref} />;
};

const Room = (props) => {
  const [peers, setPeers] = useState([]);
  const userVideo = useRef();
  const peersRef = useRef([]);
  const [usersInPair, setUsersInPair] = useState([]);

  const { connection, roomLobby, pair, user } = props;

  useEffect(() => {
    connection.emit("join pair", { pair, roomLobby });
    // connection.on("getPairInfo", (pairs) => {
    //   setUsersInPair(pairs);
    // });
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: false })
      .then((stream) => {
        userVideo.current.srcObject = stream;

        connection.emit("getAllOtherUsers", { pair, roomLobby });

        connection.on("all other users", ({ users, pairs }) => {
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
          console.log("a user has joined...");
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
        pair,
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
      {peers.map((peer, index) => {
        console.log(peers);
        return (
          <>
            <Video key={index} peer={peer} />
            <p>{`this is ${peer.peerName}'s video`}</p>
          </>
        );
      })}
      <StyledVideo muted ref={userVideo} autoPlay playsInline />
      <p>{`this is ${user.name}'s video`}</p>
      {/* <Trivia connection={connection} pair={pair} roomLobby={roomLobby} /> */}
    </Container>
  );
};

export default Room;
