import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";

import CreateGame from "./components/CreateGame";
import JoinGame from "./components/JoinGame";
import SocketContext from "./context/SocketContext";
import io from "socket.io-client";
import "../assets/styles/style.css";

const socket = io.connect("http://localhost:3333");

ReactDOM.render(
  <div className="mainContainer">
    <SocketContext.Provider value={socket}>
      <Router>
        <div>
          <Link to="/">
            <button>Home</button>
          </Link>
        </div>
        <div className="miniContainer">
          <div className="title">
            <h3>CS Game Night</h3>
          </div>
          <div className="buttonContainer">
            <Switch>
              <Route exact path="/">
                <Link to="/createGame">
                  <button>Create Game</button>
                </Link>
                <Link to="/joinGame">
                  <button>Join Game</button>
                </Link>
              </Route>
              <Route path="/createGame">
                <CreateGame />
              </Route>
              <Route path="/joinGame">
                <JoinGame />
              </Route>
            </Switch>
          </div>
        </div>
      </Router>
    </SocketContext.Provider>
  </div>,
  document.getElementById("app")
);
