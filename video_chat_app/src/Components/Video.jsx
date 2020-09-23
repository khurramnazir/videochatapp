import React, { useEffect, useRef, useState, useCallback } from "react";
//import io from "socket.io-client";
import Peer from "simple-peer";
import styled from "styled-components";
//import Trivia from "../Components/Trivia";
import Countdown from "../Components/CountDown";

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
      .getUserMedia({ video: true, audio: false })
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

  return (
    <Container>
      <Countdown
        chatTime={chatTime}
        roomLobby={roomLobby}
        myInfo={myInfo[0]}
        connection={connection}
        pair={pair}
        userVideo={userVideo}
      />
      {peers.map((peer, index) => {
        return (
          <ul key={index}>
            <Video peer={peer} />
            <p>{`this is ${peer.peerName}'s video`}</p>
          </ul>
        );
      })}
      <StyledVideo muted ref={userVideo} autoPlay playsInline />
      {myInfo.length > 0 && <p>{`this is ${myInfo[0].name}'s video`}</p>}

      {/* <Trivia connection={connection} pair={pair} roomLobby={roomLobby} /> */}
    </Container>
  );
};

export default Room;
