let current_best_xy = [];

function minimax(board, depth, isMaximizing) {

    if (depth == 0) {
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
                    //bestScore = max(score, bestScore);
                    if (score > bestScore) {
                        bestScore = score;
                        current_best_xy = [i, j];
                    }
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
                    bestScore = min(score, bestScore);
                    if (score < bestScore) {
                        bestScore = score;
                        current_best_xy = [i, j];
                    }
                }
            }
        }
        return bestScore;
    }
}