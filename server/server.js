const express = require('express');

const app = express();
const path = require('path');

const PORT = 3333;
const { createServer } = require('http');
const generate_id = require('./id_generator.js')

const server = createServer(app);
const socketio = require('socket.io');

const io = socketio(server);

require('dotenv').config();

/**
 * handle parsing request body
 */
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.use('/assets', express.static(path.resolve(__dirname, '../assets')));



const groups =
  // {};
  { "cda93bb6-5574-42b6-3398-a2f6e553a2be": { "color": "Red", "games": ["12333", "321321"], "hostName": "Stella", "fellow": {}, "players": [], "currentGame": 0, "timer": 0 } };

// const masterKey = generate_id();
const masterKey = "123";

// Run Socket
io.on('connection', (socket) => {
  // Welcome current user


  // Listen for the new player joining the game by inputing name on splash page
  socket.on('createGroups', ({ groupNum, hostName, games }) => {
    // socket.join(room);
    const colorArr = ['Red', "Blue", "Green", "Orange", "Purple", "Pink", "White"]
    for (let i = 0; i < groupNum; i++) {
      // generate guid
      const gId = generate_id();
      createGroup(gId, colorArr[i]);
    }

    function createGroup(groupId, color) {
      groups[groupId] = {
        color,
        games,
        hostName,
        fellow: {},
        players: [],
        currentGame: 0,
        timer: 0,
      };
    }
    socket.emit('generateGameInfo', groups, masterKey);

  });
  socket.on("joinGroup", ({ groupId, fullName, hostKey }) => {
    const personId = generate_id();
    socket.join(groupId);
    if (masterKey === hostKey) {
      groups[groupId].fellow = { id: personId, fullName };
      socket.emit("Logged In");
      socket.emit("Logged in as fellow", groupId, groups[groupId], personId)
    } else {
      groups[groupId].players.push({ id: personId, fullName });
      socket.emit("Logged In");
      socket.emit("Logged in as student", groupId, groups[groupId], personId)
    }
    console.log('GROUPS', groups);
  })

  socket.on("nextChallenge", ({ id, groupId }) => {
    if (groups[groupId].fellow.id === id) {
      console.log('Correct Person!');
      groups[groupId].currentGame++;
      if (groups[groupId].currentGame >= groups[groupId].games.length) {
        // End game, end timer?, alert

        io.emit('Winner', `Team ${groups[groupId].color} Wins!`); // Sends a broadcast to everyone
      } else {
        // Move to the next question and alert team only!
        io.to(groupId).emit("Next Challenge");
      }
    }
  })


});

// route handler to respond with main app
app.use('/bundle.js', express.static(path.join(__dirname, '../dist/bundle.js')));
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../dist', 'index.html'));
});

server.listen(process.env.PORT || PORT, () => {
  console.log(`listening Server on ${PORT}`);
});


