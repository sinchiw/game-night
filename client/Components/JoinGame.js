import React, { useState, useRef, useContext } from "react";
import SocketContext from "../context/SocketContext";
import Game from "./Game";

const JoinGame = () => {
  const [groupId, setGroupId] = useState("");
  const [fullName, setFullName] = useState("");
  const [hostKey, setHostKey] = useState("");
  const [isInGame, setIsInGame] = useState(false);
  const socket = useContext(SocketContext);

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
    socket.emit("joinGroup", { groupId, fullName, hostKey });
  };
  socket.on("Logged In", () => {
    setIsInGame(true);
  });

  return (
    <div className="joinGameContainer">
      {!isInGame ? (
        <>
          <br />
          <h3 className="createFont">Join Game</h3>
          <div className="createFormContainer2">
            <form className="createForm" classNameonSubmit={onSubmit}>
              <input
                id="inputField"
                type="text"
                placeholder="Group Id"
                onChange={(e) => onChangeGroupId(e)}
              />
              <input
                id="inputField"
                type="text"
                placeholder="Full Name"
                onChange={(e) => onChangeFullName(e)}
              />
              <input
                id="inputField"
                type="text"
                placeholder="Host Key (optional)"
                onChange={(e) => onChangeHostKey(e)}
              />
              <button type="submit">Join Game!</button>
            </form>
          </div>
        </>
      ) : (
        <Game />
      )}
    </div>
  );
};

export default JoinGame;
