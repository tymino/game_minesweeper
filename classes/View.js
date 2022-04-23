export default class View {
  constructor() {
    this.gameStatus = ['New', 'Win', 'Lose'];

    this.wrapper = document.createElement('div');
    this.restartButton = null;
    this.status = null;
    this.gameContainer = null;

    this.createRestartButton();
  }

  createRestartButton() {
    this.restartButton = document.createElement('button');
    this.restartButton.classList.add('restart');
    this.restartButton.textContent = 'Restart';
    document.body.append(this.restartButton);
  }

  updateTextButton(status) {
    switch (status) {
      case -1:
        this.restartButton.textContent = this.gameStatus[2];
        this.restartButton.classList.remove('win');
        this.restartButton.classList.add('lose');
        break;

      case 1:
        this.restartButton.textContent = this.gameStatus[1];
        this.restartButton.classList.remove('lose');
        this.restartButton.classList.add('win');
        break;

      default:
        this.restartButton.textContent = this.gameStatus[0];
        this.restartButton.classList.remove('lose');
        this.restartButton.classList.remove('win');
        break;
    }
  }

  createContainer() {
    this.gameContainer = document.createElement('div');
    this.gameContainer.classList.add('container');
    document.body.append(this.gameContainer);
  }

  deleteContainer() {
    const child = document.querySelector('.container');
    if (child) document.body.removeChild(child);
  }

  updateContainer() {
    this.deleteContainer();
    this.createContainer();
  }

  rerenderGrid(grid) {
    grid.forEach((r, posY) => {
      const divRow = document.createElement('div');
      divRow.classList.add('row');

      r.forEach((_, posX) => {
        const cell = document.createElement('div');

        if (grid[posY][posX].getVisible()) {
          cell.classList.add('cell');
          cell.textContent = grid[posY][posX].getValue();

          if (grid[posY][posX].hasBomb()) {
            cell.classList.add('bomb');
          }
        } else if (grid[posY][posX].getFlag()) {
          cell.classList.add('cell', 'hide', 'flag');
          cell.textContent = 'F';
        } else {
          cell.classList.add('cell', 'hide');
        }

        cell.dataset.posY = posY;
        cell.dataset.posX = posX;

        divRow.append(cell);
      });

      this.gameContainer.append(divRow);
    });
  }

  updateView(gameGrid, gameStatus) {
    this.updateContainer();
    this.updateTextButton(gameStatus);
    this.rerenderGrid(gameGrid);
  }
}
