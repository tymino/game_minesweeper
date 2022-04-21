import Cell from './Cell.js';

export default class Game {
  constructor() {
    this.countBombs = 10;
    this.gridSize = 8;
    this.gameGrid = [];
    this.gameOver = false;

    this.initGameGrid();
  }

  getGameOver = () => this.gameOver;
  setGameOver = () => (this.gameOver = true);

  checkGameOver = () => {
    const localGameGrid = this.gameGrid.flat(1);

    localGameGrid.forEach((cell) => {
      if (cell.getValue() === 0) {
      }
    });
  };

  initGameGrid = () => {
    for (let i = 0; i < this.gridSize; i++) {
      let row = [];

      for (let j = 0; j < this.gridSize; j++) {
        row.push(new Cell());
      }

      this.gameGrid.push(row);
    }

    let count = 0;

    while (count < this.countBombs) {
      const x = Math.floor(Math.random() * this.gridSize);
      const y = Math.floor(Math.random() * this.gridSize);

      if (!this.gameGrid[y][x].hasBomb()) {
        this.gameGrid[y][x].setBomb();

        // top
        this.floodValue(y - 1, x - 1);
        this.floodValue(y - 1, x);
        this.floodValue(y - 1, x + 1);
        // mid
        this.floodValue(y, x - 1);
        this.floodValue(y, x + 1);
        // bottom
        this.floodValue(y + 1, x - 1);
        this.floodValue(y + 1, x);
        this.floodValue(y + 1, x + 1);

        count++;
      }
    }
  };

  checkEdgesGrid = (dy, dx) => {
    const boolZero = dx < 0 || dy < 0;
    const boolLength = dx >= this.gameGrid.length || dy >= this.gameGrid.length;

    return boolZero || boolLength;
  };

  floodValue = (dy, dx) => {
    if (this.checkEdgesGrid(dy, dx) || this.gameGrid[dy][dx].hasBomb()) return;

    this.gameGrid[dy][dx].addValue();
  };

  openCell = (dy, dx, button) => {
    if (button === 2) {
      this.gameGrid[dy][dx].toggleFlag();
      return;
    }
    this.checkGameOver();

    if (
      this.checkEdgesGrid(dy, dx) ||
      this.gameGrid[dy][dx].getVisible() ||
      this.gameGrid[dy][dx].getFlag()
    ) {
      return;
    }

    this.gameGrid[dy][dx].setVisible();

    if (this.gameGrid[dy][dx].getValue() === 0) {
      // top
      this.openCell(dy - 1, dx - 1);
      this.openCell(dy - 1, dx);
      this.openCell(dy - 1, dx + 1);
      // mid
      this.openCell(dy, dx - 1);
      this.openCell(dy, dx + 1);
      // bottom
      this.openCell(dy + 1, dx - 1);
      this.openCell(dy + 1, dx);
      this.openCell(dy + 1, dx + 1);
    }
  };

  updateGrid = () => {
    const child = document.querySelector('.container');

    if (child) {
      document.body.removeChild(child);
    }

    const container = document.createElement('div');
    container.classList.add('container');
    document.body.append(container);

    this.gameGrid.forEach((r, posY) => {
      const divRow = document.createElement('div');
      divRow.classList.add('row');

      r.forEach((_, posX) => {
        const cell = document.createElement('div');

        if (this.gameGrid[posY][posX].getVisible()) {
          cell.classList.add('cell');
          cell.textContent = this.gameGrid[posY][posX].getValue();
        } else if (this.gameGrid[posY][posX].getFlag()) {
          cell.classList.add('cell', 'hide', 'flag');
          cell.textContent = 'F';
        } else {
          cell.textContent = this.gameGrid[posY][posX].getValue();
          cell.classList.add('cell', 'hide');
        }

        cell.dataset.posY = posY;
        cell.dataset.posX = posX;

        divRow.append(cell);
      });

      container.append(divRow);
    });
  };
}
