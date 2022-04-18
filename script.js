let row = new Array(10).fill({ value: 0, visible: false });
let gameGrid = new Array(10).fill(row);

let count = 0;

// flood
while (count < 10) {
  const x = Math.floor(Math.random() * 10);
  const y = Math.floor(Math.random() * 10);

  gameGrid = gameGrid.map((r, px) => {
    return r.map((c, py) => {
      if (px === x && py === y) {
        count++;
        return { value: 'mine', visible: true };
      }
      return c;
    });
  });
}

function clickCell(event) {
  if (event.target.classList.contains('cell')) {
    const x = event.target.dataset.posX;
    const y = event.target.dataset.posY;

    event.target.classList.remove('hide');
    event.target.textContent = gameGrid[x][y].value;
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

    cell.dataset.posX = posX;
    cell.dataset.posY = posY;

    divRow.append(cell);
  });
  document.body.append(divRow);
});
