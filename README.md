# Connect4Game

Multiplayer Connect 4 Game using Vue.js

![Connect4Game](/game_image.png)

## Requirements

* Vue.js (included)
* WS (WebSocket)
* Node.js
* Node-fetch

## Features

### Highlight Columns  

If dropping a checker piece into a column allows the other player to win in the next move, that column is highlighted red. Otherise it is highlighted green.

### Restart Game

Upon winning/losing, either one of the player can restart the game.

### Multiple Games

The server can handle multiple 2-player games running at the same time.

## Getting Started

Start the server by `node Server.js`. By default, the port is 5000. Now start each game instances (two for each player) in the browser by:

1. either going to: localhost:5000
2. or opening index.html
  