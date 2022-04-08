const board = document.querySelector('.board');
const resetButton = document.getElementById('resetButton');
const x = 'X';
const o = 'O';

var player = x;

function write(e){
  e.target.innerHTML = player;
}

function changePlayer(){
  if (player === x) {
    player = o;
  } 
  else {
    player = x;
  }
}

function touchend(e) {
  write(e);
  changePlayer()
}

function resetBoard() {
  for (let i = 0; i < board.children.length; i++) {
    board.children[i].innerHTML = '';
  }
}

board.addEventListener('click', touchend);
resetButton.addEventListener('click', resetBoard);