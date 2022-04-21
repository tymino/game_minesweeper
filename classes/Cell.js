const BOMB = 'B';

export default class Cell {
  constructor() {
    this.value = 0;
    this.visible = false;
    this.flag = false;
  }

  getValue = () => this.value;
  addValue = () => (this.value += 1);
  setValue = (val) => (this.value = val);

  getVisible = () => this.visible;
  setVisible = () => (this.visible = true);

  getFlag = () => this.flag;
  setFlag = () => this.flag = true;

  hasBomb = () => this.value === BOMB;
  setBomb = () => (this.value = BOMB);

  update() {}
}
