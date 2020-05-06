function best_move(board) {
    // AI to make its turn
    let bestScore = -Infinity;
    let move;
    for (let i = 0; i < board.size; i++) {
        for (let j = 0; j < board.size; j++) {
            // Is the spot available?
            if (board.isEmpty(i, j)) {
                board.play(i, j);
                let score = minimax(board, 10, true);
                console.log("score" , score)
                board.clearCell(i, j);
                if (score > bestScore) {
                    bestScore = score;
                    move = { i, j };
                }
            }
        }
    }
    board.play(move.i, move.j);
}


function minimax(board, depth, isMaximizing) {
    console.log(depth)
    if (depth == 0 || board.checkWinner()) {
        let sc = board.checkScore();
        //console.log(sc);
        return sc;
    }

    if (isMaximizing) {
        let bestScore = -Infinity;

        for (let i = 0; i < board.size; i++) {
            for (let j = 0; j < board.size; j++) {
                // Is the spot available?
                if (board.isEmpty(i, j)) {
                    board.play(i, j);
                    let score = minimax(board, depth - 1, false);
                    board.clearCell(i, j);
                    bestScore = Math.max(score, bestScore);
                }
            }
        }
        return bestScore;
    } else {
        let bestScore = Infinity;
        for (let i = 0; i < board.size; i++) {
            for (let j = 0; j < board.size; j++) {
                // Is the spot available?
                if (board.isEmpty(i, j)) {
                    board.play(i, j);
                    let score = minimax(board, depth - 1, true);
                    board.clearCell(i, j);
                    bestScore = Math.min(score, bestScore);
                }
            }
        }
        return bestScore;
    }
}