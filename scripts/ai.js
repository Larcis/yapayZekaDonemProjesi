class AI {
    constructor(board, player, depth, is_assitance = false) {
        this.board = board; //reference to the board that ai will play on
        this.p = player; //player character X or O
        this.depth = depth; // depth of the minimax algorithm
        this.is_assitance = is_assitance; // boolean for check if ai is runned for help to human
    }

    scoreFunc(a, b, c, turn) {
        let mp = this.p; //current ai's player character
        let op = this.p == "X" ? "O" : "X"; //opponent's character

        let numofs = { "X": 0, "O": 0, " ": 0 }; // dictionary for counting X O and blanks
        numofs[a]++;
        numofs[b]++;
        numofs[c]++;

        if (numofs[mp] == 3) return 20000000; //if there is a winner and it is current ai
        else if (numofs[op] == 3) return -20000000; // opponent wins
        switch (numofs[" "]) {
            case 0: //no blanks
                if (numofs[mp] == 2) {
                    //console.log("i got point from numofs[mp] == 2 -100000")
                    return -100000;
                } //opponent dodged me
                else {
                    //console.log("i got point from else numofs[mp] == 2 100000")
                    return 100000; //i dodged opponent
                }
            case 1: //1 blank
                if (numofs[mp] == 2) {
                    if (turn) {
                        //console.log("i got point from numofs[mp] == 2 and turn 5000000")
                        return 5000000; //1 blank and 2 of my characters, if its my turn i m gonna win
                    } else {
                        //console.log("i got point from numofs[mp] == 2 and !turn 12500")
                        return 12500
                    }
                } else if (numofs[op] == 2) {
                    if (turn) {
                        //console.log("i got point from numofs[op] == 2 and !turn -5000000")
                        return -5000000;
                    } else {
                        //console.log("i got point from numofs[op] == 2 and !turn -12500")
                        return -12500
                    }
                } else { // there is one from every possible char
                    if (b == mp) {
                        //console.log("i got point from else in case 1 b == mp 2")
                        return 20; //taking center cell is important
                    } else if (b == op) {
                        //console.log("i got point from else in case 1 b == op 1")
                        return 1;
                    } else {
                        //console.log("i got point from else in case 1 else 1")
                        return -1;
                    }
                };
            case 2:
                if (numofs[mp] == 1) {
                    //console.log("i got point from case 2 numofs[mp] == 1 1")
                    return 1;
                } else {
                    //console.log("i got point from case 2 numofs[mp] == 1 -1")
                    return -1;
                }
            case 3:
                return 0; //three blanks, no point
        }
    }
    markVisited(i, j, color) {
        let w = width / this.board.size;
        let h = height / this.board.size;
        let y = w * i + w / 2;
        let x = h * j + h / 2;
        fill(...color);
        rect(x - w / 2, y - h / 2, w, h);
    }
    checkScore(turn) { //go through the board with a 3*3 filter and send every possible triplet to score function
        let b = this.board.board;
        var score = 0;
        //let str = "";
        for (let i = 0; i < this.board.size; i++) {
            for (let j = 0; j < this.board.size; j++) {
                //str += b[i][j] + "|";
                if (j < this.board.size - 2)
                    score += this.scoreFunc(b[i][j], b[i][j + 1], b[i][j + 2], turn);
                if (i < this.board.size - 2)
                    score += this.scoreFunc(b[i][j], b[i + 1][j], b[i + 2][j], turn);
                if (i < this.board.size - 2 && j < this.board.size - 2) {
                    score += this.scoreFunc(b[i][j], b[i + 1][j + 1], b[i + 2][j + 2], turn); //duz capraz
                    score += this.scoreFunc(b[i + 2][j], b[i + 1][j + 1], b[i][j + 2], turn);
                }
            }
            //str += "\n";
        }
        //console.log(str, score);
        return score;
    }

    best_move() { //find best possible move and play it
        let bestScore = -Infinity;
        let move;
        for (let i = 0; i < this.board.size; i++) {
            for (let j = 0; j < this.board.size; j++) {
                if (this.board.isEmpty(i, j)) {
                    this.board.play(i, j);
                    let score = this.minimax(this.depth, -Infinity, Infinity, true); //find current possible moves score with minimax algorithm
                    //score = score == Infinity ? 0 : score;
                    //this.board.board.forEach((aa) => console.log(aa));
                    //console.log(score);
                    if (score > bestScore) {
                        bestScore = score;
                        move = [i, j];
                    }
                    this.board.clearCell(i, j);
                }
            }
        }
        if (move && this.board.isEmpty(...move)) {
            if (this.is_assitance) { //if it is an assistance ai, dont play the move just mark the cell with yellow color
                this.markVisited(...move, [255, 255, 0]);
                return move;
            } else
                this.board.play(...move);
            //console.log(bestScore)
        }
    }

    /*
     * Minimax algorithm 
     * depth parameter determines the tree depth
     * we use is_maximizing to determine in current depth it is which player's turn
     * with respect to that we select min or max possible score as bestScore
     * 
     * algorith works recursively, the tree generated via recurrance and it stops
     * if there is a winner or the given depth is exceeded.
     */
    minimax(depth, alpha, beta, is_maximizing) {
        let winner = this.board.checkWinner()
        if (depth == 0 || winner) {
            if (winner == this.p)
                return 20000000000;
            else if (winner)
                return -20000000000;
            return this.checkScore(is_maximizing);;
        }

        if (is_maximizing) {
            let bestScore = -Infinity;

            for (let i = 0; i < this.board.size; i++) {
                for (let j = 0; j < this.board.size; j++) {
                    if (this.board.isEmpty(i, j)) {
                        this.board.play(i, j);
                        bestScore = Math.max(this.minimax(depth - 1, alpha, beta, false), bestScore);
                        alpha = Math.max(alpha, bestScore);
                        this.board.clearCell(i, j);
                        if (alpha >= beta) {
                            return bestScore;
                        }
                    }
                }
            }
            return bestScore;
        } else {
            let bestScore = Infinity;
            for (let i = 0; i < this.board.size; i++) {
                for (let j = 0; j < this.board.size; j++) {
                    if (this.board.isEmpty(i, j)) {
                        this.board.play(i, j);
                        bestScore = Math.min(this.minimax(depth - 1, alpha, beta, true), bestScore);
                        beta = Math.min(beta, bestScore);
                        this.board.clearCell(i, j);
                        if (alpha >= beta) {
                            return bestScore;
                        }
                    }
                }
            }
            return bestScore;
        }
    }
};