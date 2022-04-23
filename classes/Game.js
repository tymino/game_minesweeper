import Cell from './Cell.js';
import View from './View.js';

export default class Game {
  constructor() {
    this.countBombs = 10;
    this.gridSize = 8;
    this.gameGrid = [];
    this.activeGameStatus = 0;
    this.gameOver = false;

    this.view = new View();

    this.initGameGrid();
  }

  getGameOver = () => this.gameOver;
  setGameOver = () => (this.gameOver = true);

  setGameStatus(val) {
    switch (val) {
      case -1:
        this.activeGameStatus = -1;
        break;

      case 1:
        this.activeGameStatus = 1;
        break;

      default:
        this.activeGameStatus = 0;
        break;
    }
  }

  restartGame() {
    this.gameGrid = [];
    this.gameOver = false;

    this.setGameStatus(0);
    this.initGameGrid();
    this.updateGrid();
  }

  checkGameOver() {
    const localGameGrid = this.gameGrid.flat(1);
    let counter = 0;

    localGameGrid.forEach((cell) => {
      if (cell.hasBomb(0) && cell.getVisible()) {
        this.setGameOver();
        this.setGameStatus(-1);
      }

      if (!cell.hasBomb(0) && cell.getVisible()) {
        counter++;

        if (counter === this.gameGrid.flat(1).length - this.countBombs) {
          this.setGameOver();
          this.setGameStatus(1);
        }
      }
    });
  }

  initGameGrid() {
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
  }

  checkEdgesGrid(dy, dx) {
    const boolZero = dx < 0 || dy < 0;
    const boolLength = dx >= this.gameGrid.length || dy >= this.gameGrid.length;

    return boolZero || boolLength;
  }

  floodValue(dy, dx) {
    if (this.checkEdgesGrid(dy, dx) || this.gameGrid[dy][dx].hasBomb()) return;

    this.gameGrid[dy][dx].addValue();
  }

  openCell(dy, dx, button) {
    if (button === 2) {
      this.gameGrid[dy][dx].toggleFlag();
      return;
    }

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

    this.checkGameOver();
  }

  updateGrid() {
    this.view.updateView(this.gameGrid, this.activeGameStatus);
  }
}
