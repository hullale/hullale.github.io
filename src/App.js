
import { findRenderedDOMComponentWithClass } from 'react-dom/test-utils';
import './App.css';
import GameBoard from './GameBoard.js';

function GenerateClosedRooms(width, height, startX, startY) {
  let rooms = []
  for(let y = 0; y<height; y++){
    let row = []
    for(let x = 0; x<width; x++){
      const room = {
        x: x,
        y: y,
        open: false,
        start: false,
        end: false
      }
      row.push(room)
    }
    rooms.push(row)
  }
  rooms[startY][startX].start = true;
  return rooms
}

function OpenRooms(rooms, x, y) {
  let height = rooms.length
  let width = rooms[0].length

  rooms[y][x].open = true;
  
  let random = Math.floor(Math.random() * 20);
  if (x > 0 && random < 4){ // left
    OpenRooms(rooms, x-1, y);
  }
  if (x < width-1 && random >= 4 && random <= 7){ // right
    OpenRooms(rooms, x+1, y);
  }
  if (y > 0 && random >= 8 && random <= 14){ // up
    OpenRooms(rooms, x, y-1);
  }
  if (y < height-1 && random >= 15 && random < 19){ // down
    OpenRooms(rooms, x, y+1);
  }
}

function GenerateEscape(rooms) {
  let emptyRooms = []
  rooms.map((row, i) => {
    return row.map((room, j) => {
      if (!room.start && room.open) {
        emptyRooms.push(room)
      }
    })
  })
  if (emptyRooms.length > 0) {
    let random = Math.floor(Math.random() * emptyRooms.length);
    let x = emptyRooms[random].x
    let y = emptyRooms[random].y
    rooms[y][x].end = true;
  }
}

function App() {
  let width = 9;
  let height = 9;
  let startX = Math.floor(width/2);
  let startY = height-2;
  let rooms = GenerateClosedRooms(width, height, startX, startY);
  OpenRooms(rooms, startX, startY);
  GenerateEscape(rooms);
 
  return (
    <div class="GameBoard" id="GameBoard">
      <GameBoard rooms={rooms}></GameBoard>
    </div>
  );
}

export default App;
