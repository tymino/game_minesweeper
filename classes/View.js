export default class View {
  constructor() {
    this.container = null;
    this.localGrid = null;
  }

  createContainer() {
    this.container = document.createElement('div');
    this.container.classList.add('container');
    document.body.append(this.container);
  }

  deleteContainer() {
    const child = document.querySelector('.container');
    if (child) document.body.removeChild(child);
  }

  updateContainer() {
    this.deleteContainer();
    this.createContainer();
  }

  rerenderGrid() {
    this.localGrid.forEach((r, posY) => {
      const divRow = document.createElement('div');
      divRow.classList.add('row');

      r.forEach((_, posX) => {
        const cell = document.createElement('div');

        if (this.localGrid[posY][posX].getVisible()) {
          cell.classList.add('cell');
          cell.textContent = this.localGrid[posY][posX].getValue();
        } else if (this.localGrid[posY][posX].getFlag()) {
          cell.classList.add('cell', 'hide', 'flag');
          cell.textContent = 'F';
        } else {
          cell.textContent = this.localGrid[posY][posX].getValue();
          cell.classList.add('cell', 'hide');
        }

        cell.dataset.posY = posY;
        cell.dataset.posX = posX;

        divRow.append(cell);
      });

      this.container.append(divRow);
    });
  }

  updateView(gameGrid) {
    this.localGrid = gameGrid;
    this.updateContainer();
    this.rerenderGrid()
  }
}
