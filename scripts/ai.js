class AI{
    constructor(board, player){
        this.board = board;
        this.p = player;
    }
    

    _1blankEval(b){
        let ms = 10000;
        let is_my_turn = (this.board.current_player == this.p);
        if(b == this.p){
            if(is_my_turn){
                return ms;
            }else{
                return -ms;
            }
        }else{
            if(is_my_turn){
                return ms;
            }else{
                return -ms;
            }
        }
    }
    scoreFunc(a, b, c) {
        let score = 0;
        
        if ((a == " " && b == c && b != " ") || (c == " " && a == b && b != " ")) score = this._1blankEval(b);
        else if (b == " " && a == c && a != " ") score = this._1blankEval(a);
        else if (a == b && b == c && a != " " && a == this.p) score = 100000;
        else if (a == b && b == c && a != " " && a != this.p) score = -100000;
        return score;
    }
    checkScore() {
        let b = this.board.board;
        let score = 0;
        for (let i = 0; i < this.board.size - 2; i++) {
            for (let j = 0; j < this.board.size - 2; j++) {
                score += this.scoreFunc(b[i][j], b[i + 1][j], b[i + 2][j]);
                score += this.scoreFunc(b[i][j], b[i][j + 1], b[i][j + 2]);
                score += this.scoreFunc(b[i][j + 1], b[i + 1][j + 1], b[i + 2][j + 1]); //yatay2
                score += this.scoreFunc(b[i + 1][j], b[i + 1][j + 1], b[i + 1][j + 2]); //dikey2
                score += this.scoreFunc(b[i][j], b[i + 1][j + 1], b[i + 2][j + 2]); //duz capraz
                score += this.scoreFunc(b[i + 2][j], b[i + 1][j + 1], b[i][j + 2]);
                score += this.scoreFunc(b[i][j + 2], b[i + 1][j + 2], b[i + 2][j + 2]); //yatay3
                score += this.scoreFunc(b[i + 2][j], b[i + 2][j + 1], b[i + 2][j + 2]); //dikey3
            }
        }
        //console.log(score);
        return score;
    }

    best_move() {
        let bestScore = -Infinity;
        let move;
        for (let i = 0; i < this.board.size; i++) {
            for (let j = 0; j < this.board.size; j++) {
                if (this.board.isEmpty(i, j)) {
                    this.board.play(i, j);
                    let score = this.minimax(4, true);
                    this.board.clearCell(i, j);
                    if (score > bestScore) {
                        bestScore = score;
                        move = [ i, j ];
                    }
                }
            }
        }
        if(move && this.board.isEmpty(...move))
            this.board.play(...move);
        else
            alert("AI geçerli hamle bulamadı.");
    }
    
    
    minimax(depth, isMaximizing) {
    
        if (depth == 0 || this.board.checkWinner()) {
            let sc = this.checkScore();
            //console.log(sc);
            return sc;
        }
    
        if (isMaximizing) {
            let bestScore = -Infinity;
    
            for (let i = 0; i < this.board.size; i++) {
                for (let j = 0; j < this.board.size; j++) {
                    if (this.board.isEmpty(i, j)) {
                        this.board.play(i, j);
                        let score = this.minimax(depth - 1, false);
                        this.board.clearCell(i, j);
                        bestScore = Math.max(score, bestScore);
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
                        let score = this.minimax(depth - 1, true);
                        this.board.clearCell(i, j);
                        bestScore = Math.min(score, bestScore);
                    }
                }
            }
            return bestScore;
        }
    }
};