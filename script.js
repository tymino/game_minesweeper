// import Cell from './classes/Cell.js';

// const GAME_SIZE = 8;
// const GAME_COUNT_BOMBS = 10;

// let gameGrid = [];

// for (let i = 0; i < GAME_SIZE; i++) {
//   let row = [];
//   for (let j = 0; j < GAME_SIZE; j++) {
//     row.push(new Cell());
//   }
//   gameGrid.push(row);
// }

// let count = 0;

// function checkEdgesGrid(dy, dx) {
//   const boolZero = dx < 0 || dy < 0;
//   const boolLength = dx >= gameGrid.length || dy >= gameGrid.length;

//   return boolZero || boolLength;
// }

// function floodValue(dy, dx) {
//   if (checkEdgesGrid(dy, dx) || gameGrid[dy][dx].hasBomb()) return;

//   gameGrid[dy][dx].addValue();
// }

// // flood
// while (count < GAME_COUNT_BOMBS) {
//   const x = Math.floor(Math.random() * GAME_SIZE);
//   const y = Math.floor(Math.random() * GAME_SIZE);

//   if (!gameGrid[y][x].hasBomb()) {
//     gameGrid[y][x].setBomb();

//     // top
//     floodValue(y - 1, x - 1);
//     floodValue(y - 1, x);
//     floodValue(y - 1, x + 1);
//     // mid
//     floodValue(y, x - 1);
//     floodValue(y, x + 1);
//     // bottom
//     floodValue(y + 1, x - 1);
//     floodValue(y + 1, x);
//     floodValue(y + 1, x + 1);

//     count++;
//   }
// }

// document.body.addEventListener('click', handleClick);

// function handleClick(event) {
//   if (event.target.classList.contains('cell')) {
//     const y = Number(event.target.dataset.posY);
//     const x = Number(event.target.dataset.posX);

//     openCell(y, x);
//     updateGrid();
//   }
// }

// function openCell(dy, dx) {
//   if (checkEdgesGrid(dy, dx) || gameGrid[dy][dx].getVisible()) {
//     return;
//   }

//   gameGrid[dy][dx].setVisible();

//   if (gameGrid[dy][dx].getValue() === 0) {
//     openCell(dy - 1, dx); // up
//     openCell(dy, dx + 1); // right
//     openCell(dy + 1, dx); // down
//     openCell(dy, dx - 1); // left
//   }
// }

// function updateGrid() {
//   const child = document.querySelector('.container');

//   if (child) {
//     document.body.removeChild(child);
//   }

//   const container = document.createElement('div');
//   container.classList.add('container');
//   document.body.append(container);

//   gameGrid.forEach((r, posY) => {
//     const divRow = document.createElement('div');
//     divRow.classList.add('row');

//     r.forEach((_, posX) => {
//       const cell = document.createElement('div');

//       if (gameGrid[posY][posX].getVisible()) {
//         cell.classList.add('cell');
//         cell.textContent = gameGrid[posY][posX].getValue();
//       } else {
//         cell.textContent = gameGrid[posY][posX].getValue();
//         cell.classList.add('cell', 'hide');
//       }

//       cell.dataset.posY = posY;
//       cell.dataset.posX = posX;

//       divRow.append(cell);
//     });

//     container.append(divRow);
//   });
// }

import Game from './classes/Game.js';

const game = new Game();

document.addEventListener('click', handleClick);
document.addEventListener('contextmenu', handleClick);

function handleClick(event) {
  event.preventDefault();

  if (event.target.classList.contains('cell') && !game.getGameOver()) {
    const y = Number(event.target.dataset.posY);
    const x = Number(event.target.dataset.posX);

    game.openCell(y, x, event.button);
    game.updateGrid();
  }
}

game.updateGrid();
