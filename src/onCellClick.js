// When you click on one piece
function onCellClick(event, row, col) {

  // Move the pieces
  if (pieceOld!= null) {
    let newLocation = event.currentTarget;
    if (newLocation.classList.contains('possible-move')) {

      if (pieceOld.piece.player === WHITE_PLAYER) {
        turnText.textContent = "black turn";
      }
      else
        turnText.textContent = "white turn";

      boardData.setLocation(row, col, pieceOld.piece);

      isThreat = boardData.isThreat();

      if (isThreat === false) {
        check.classList.remove("check");
        check.classList.add("out");
      }
      if (isThreat === true) {
        check.textContent = "check";
        check.classList.remove("out");
        check.classList.add("check");
      }
    }
    pieceOld = null;
  }

  // Delete the selected cell when you select another cell
  for (let i = 0; i < 8; i++) {
    for (let j = 0; j < 8; j++) {
      table.rows[i].cells[j].classList.remove('possible-move');
      table.rows[i].cells[j].classList.remove('selected');
    }
  }

  // background to the selected cell
  selectedCell = event.currentTarget;
  selectedCell.classList.add('selected');

  // Show possible moves to the white player when it`s turn
  for (let piece of boardData.pieces) {
    if (piece.row === row && piece.col === col && !piece.deleted) {
      if (piece.player === WHITE_PLAYER && boardData.turn == WHITE_PLAYER) {
        pieceOld = new state(piece, selectedCell);
        let possibleMoves = piece.possibleMoves();
        if (boardData.isThreat() === true) {
          possibleMoves = boardData.possibleMovesInCheck(pieceOld);
        }
        else {
          possibleMoves = boardData.checkIfCanMove(pieceOld, possibleMoves)
        }
        if (possibleMoves === []) {
          checkMateBlack.textContent = "check-mate black player win";
          checkMateBlack.classList.remove("out");
          checkMateBlack.classList.add("checkMate");
        }
        isThreat = false
        for (let possibleMove of possibleMoves) {
          table.rows[possibleMove[0]].cells[possibleMove[1]].classList.add('possible-move');
        }
      }
    }
  }

  // Show possible moves to the black player when it`s turn

  for (let piece of boardData.pieces) {
    if (piece.row === row && piece.col === col && !piece.deleted) {
      if (piece.player == BLACK_PLAYER && boardData.turn == BLACK_PLAYER) {
        pieceOld = new state(piece, selectedCell);
        let possibleMoves = piece.possibleMoves();
        if (boardData.isThreat() === true) {
          possibleMoves = boardData.possibleMovesInCheck(pieceOld);
        }
        else {
          possibleMoves = boardData.checkIfCanMove(pieceOld, possibleMoves)
        }
        if (possibleMoves === []) {
          checkMateWhite.textContent = "check-mate white player win";
          checkMateWhite.classList.remove("out");
          checkMateWhite.classList.add("checkMate");
        }
        isThreat = false
        for (let possibleMove of possibleMoves) {
          table.rows[possibleMove[0]].cells[possibleMove[1]].classList.add('possible-move');
        }
      }
    }
  }

}

