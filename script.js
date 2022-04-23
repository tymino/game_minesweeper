import Game from './classes/Game.js';

const startScript = () => {
  const game = new Game();

  document.addEventListener('click', handleClick);
  document.addEventListener('contextmenu', handleClick);
  document.querySelector('.restart').addEventListener('click', handleRestart);

  function handleClick(event) {
    event.preventDefault();

    if (game.gameOver) return;

    if (event.target.classList.contains('cell') && !game.getGameOver()) {
      const y = Number(event.target.dataset.posY);
      const x = Number(event.target.dataset.posX);

      game.openCell(y, x, event.button);
      game.updateGrid();
    }
  }

  function handleRestart() {
    game.restartGame();
  }

  game.updateGrid();
};

startScript();
