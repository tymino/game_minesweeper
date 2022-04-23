export default class Cell {
  constructor() {
    this.bombSprite = 'B';
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
  toggleFlag = () => (this.flag = !this.flag);

  hasBomb = () => this.value === this.bombSprite;
  setBomb = () => (this.value = this.bombSprite);
}
