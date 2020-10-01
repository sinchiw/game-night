import React, { useState, useRef, useContext } from "react";
import SocketContext from "../context/SocketContext";
import Game from "./Game";

const JoinGame = () => {
<<<<<<< HEAD
  const [groupId, setGroupId] = useState("");
  const [fullName, setFullName] = useState("");
  const [hostKey, setHostKey] = useState("");
=======
  const [gameName, setGameName] = useState('');
  const [groupId, setGroupId] = useState('');
  const [fullName, setFullName] = useState('');
  const [hostKey, setHostKey] = useState('');
>>>>>>> 1925c034765bc0df5f067e619638e1989de9aec2
  const [isInGame, setIsInGame] = useState(false);
  const socket = useContext(SocketContext);

  const onChangeGameName = (e) => {
    setGameName(e.target.value);

  };

  const onChangeFullName = (e) => {
    setFullName(e.target.value);
  };

  const onChangeGroupId = (e) => {
    setGroupId(e.target.value);
  };

  const onChangeHostKey = (e) => {
    setHostKey(e.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (!groupId) return;
    socket.emit('joinGroup', { groupId, fullName, hostKey, gameName });
  };
  socket.on("Logged In", () => {
    setIsInGame(true);
  });

  return (
    <div>
      {!isInGame ? (
        <>
          <br />
          <h3>Join Game</h3>
          <form onSubmit={onSubmit}>
            <input type="text" placeholder="Game Name" onChange={(e) => onChangeGameName(e)} />
            <input type="text" placeholder="Group Id" onChange={(e) => onChangeGroupId(e)} />
            <input type="text" placeholder="Full Name" onChange={(e) => onChangeFullName(e)} />
            <input type="text" placeholder="Host Key (optional)" onChange={(e) => onChangeHostKey(e)} />
            <button type="submit">Join Game!</button>
          </form>
        </>
      ) : (
        <Game />
      )}
    </div>
  );
};

export default JoinGame;
