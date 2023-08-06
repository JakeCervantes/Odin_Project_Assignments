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


const player1= playerFactory('player1', 'X');
const player2=playerFactory('player2', 'O');
let currentPlayer = player1;

function playerFactory(name, marker) {
  return {
    name,
    marker
  };
}

const gameInit = (function () {
  cells.forEach(cell => {
    cell.addEventListener('click', gameController);
  });

}) ();


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

    if (winOccured)
    {
      setTimeout(() => {
        alert(winningPlayer.name + ' wins!');
      }, 50);
      
    }
  }
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
