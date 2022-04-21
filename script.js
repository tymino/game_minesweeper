const MINE = 'm';
const cellTemplate = { value: 0, visible: false };

let gameGrid = [];

for (let i = 0; i < 10; i++) {
  let row = [];
  for (let j = 0; j < 10; j++) {
    row.push(cellTemplate);
  }
  gameGrid.push(row);
}

let count = 0;

const checkEdgesGrid = (dy, dx) => {
  const boolZero = dx < 0 || dy < 0;
  const boolLength = dx >= gameGrid.length || dy >= gameGrid.length;

  if (boolZero || boolLength || gameGrid[dy][dx].value === MINE) return;

  floodValue(dy, dx);
};

function floodValue(dy, dx) {
  gameGrid[dy][dx] = { value: gameGrid[dy][dx].value + 1, visible: false };
}

// flood
while (count < 10) {
  const x = Math.floor(Math.random() * 10);
  const y = Math.floor(Math.random() * 10);

  if (gameGrid[y][x].value !== MINE) {
    gameGrid[y][x] = { value: MINE, visible: true };

    // top
    checkEdgesGrid(y - 1, x - 1);
    checkEdgesGrid(y - 1, x);
    checkEdgesGrid(y - 1, x + 1);

    // mid
    checkEdgesGrid(y, x - 1);
    checkEdgesGrid(y, x + 1);

    // bottom
    checkEdgesGrid(y + 1, x - 1);
    checkEdgesGrid(y + 1, x);
    checkEdgesGrid(y + 1, x + 1);

    count++;
  }
}

function clickCell(event) {
  if (event.target.classList.contains('cell')) {
    const y = event.target.dataset.posY;
    const x = event.target.dataset.posX;

    console.log(gameGrid[y][x]);

    event.target.classList.remove('hide');
    event.target.textContent = gameGrid[y][x].value;
  }
}

document.body.addEventListener('click', clickCell);

gameGrid.forEach((r, posY) => {
  const divRow = document.createElement('div');
  divRow.classList.add('row');
  r.forEach((_, posX) => {
    const cell = document.createElement('div');
    cell.classList.add('cell', 'hide');

    cell.textContent = _.value;

    cell.dataset.posY = posY;
    cell.dataset.posX = posX;

    divRow.append(cell);
  });
  document.body.append(divRow);
});
