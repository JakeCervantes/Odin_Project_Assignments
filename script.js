const cells=[
  document.querySelector('.cell1'),
  document.querySelector('.cell2'),
  document.querySelector('.cell3'),
  document.querySelector('.cell4'),
  document.querySelector('.cell5'),
  document.querySelector('.cell6'),
  document.querySelector('.cell7'),
  document.querySelector('.cell8'),
  document.querySelector('.cell9')
];

cells.forEach(cell => {
  cell.addEventListener('click', gameController);
});

const player1= playerFactory('player1', 'X');
const player2=playerFactory('player2', 'O');
let currentPlayer;

//handles displaying a clear indication of the end of a game
let blurOverlay = document.querySelector('.blur-overlay');
let displayOutcome = document.querySelector('.game-over');
let resetBtn = document.getElementById('reset-button');
resetBtn.addEventListener('click', clearPopUp);
let gameOverMessage = displayOutcome.querySelector('p');

function playerFactory(name, marker) {
  return {
    name,
    marker
  };
}

function clearPopUp() {
  blurOverlay.style.display='none';
  displayOutcome.style.display='none';
  gameInit();
}

function gameInit() {
  currentPlayer=player1;
  cells.forEach(cell => {
    cell.innerHTML='';
    if(cell.getAttribute('data-marked') !== null)
    {cell.removeAttribute('data-marked');}
  })
}

gameInit();


function gameController(event) {
  let winOccured= false;
  let winningPlayer;
  const clickedCell = event.target;

  if (clickedCell.getAttribute('data-marked') === null || clickedCell.getAttribute('data-marked') === '') {
    clickedCell.setAttribute('data-marked', currentPlayer.marker);
    clickedCell.innerHTML = currentPlayer.marker;

    if (checkWin(currentPlayer.marker)) {
      winningPlayer = currentPlayer;
      winOccured=true;
    }

    currentPlayer = currentPlayer === player1 ? player2 : player1;


      //handles the event of a win
    if (winOccured)
    {
      popUP(winningPlayer.name);
    }

      //handles the event of a tie
    const markedCells = cells.filter(cell => cell.getAttribute('data-marked'));
    if (markedCells.length === cells.length)
    {
      popUP('tie');
    }; // All cells are marked
  }
}

function popUP(event) {
  blurOverlay.style.display='block';
  displayOutcome.style.display='block';
  gameOverMessage.innerText=event;
}



function resetGame() {
  cells.forEach(cell => {
    cell.innerHTML='';
    if(cell.getAttribute('data-marked') !== null)
    {cell.removeAttribute('data-marked');}
  })

  currentPlayer=player1;
}



function checkWin(marker) {
  // Check rows
  for (let i = 0; i < 3; i++) {
    if (
      cells[i * 3].getAttribute('data-marked') === marker &&
      cells[i * 3 + 1].getAttribute('data-marked') === marker &&
      cells[i * 3 + 2].getAttribute('data-marked') === marker
    ) {
      return true; // Win found in a row
    }
  }

  // Check columns
  for (let i = 0; i < 3; i++) {
    if (
      cells[i].getAttribute('data-marked') === marker &&
      cells[i + 3].getAttribute('data-marked') === marker &&
      cells[i + 6].getAttribute('data-marked') === marker
    ) {
      return true; // Win found in a column
    }
  }

  // Check diagonals
  if (
    (cells[0].getAttribute('data-marked') === marker &&
      cells[4].getAttribute('data-marked') === marker &&
      cells[8].getAttribute('data-marked') === marker) ||
    (cells[2].getAttribute('data-marked') === marker &&
      cells[4].getAttribute('data-marked') === marker &&
      cells[6].getAttribute('data-marked') === marker)
  ) {
    return true; // Win found in a diagonal
  }

  return false; // No win found
}
