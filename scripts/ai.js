class AI{
    constructor(board, player){
        this.board = board;
        this.p = player;
    }
    

    /*_1blankEval(b){
        let ms = 10;
        let is_my_turn = (this.board.current_player == this.p);
        if(b == this.p){
            if(is_my_turn){
                return ms*10000;
            }else{
                return ms;
            }
        }else{
            if(is_my_turn){
                return -ms;
            }else{
                return -ms*500000;
            }
        }
    }*/
    evalScore(c, o, l){
        let is_my_turn = (this.board.current_player == this.p);
    }

    scoreFunc(a, b, c, turn) {
        //console.log(a,b,c);
        let mp = this.p;
        let op = this.p == "X" ? "O" : "X";

        let numofs = {"X": 0, "O": 0, " ": 0};
        numofs[a]++;
        numofs[b]++;
        numofs[c]++;
        //console.log(numofs);
        
        if(numofs[mp] == 3) return 20000000;
        else if(numofs[op] == 3) return -20000000;
        switch(numofs[" "]){
            case 0:
                if(numofs[mp] == 2) return -100000;
                else {
                    //console.log(numofs);
                    return 100000;
                }
            case 1:
                if(numofs[mp] == 2){
                    if(turn)
                        return 500000;
                    else
                        return 50000
                }
                else if(numofs[op] == 2){   
                    if(turn)
                        return -500000;
                    else
                        return -50000
                }
                else{
                    if(b == mp)
                        return 5000;
                    else if(b == op)
                        return -5000;
                    else return 0;
                };
            case 2:
                if(numofs[mp] == 1) return 5;
                else return -50000;
            case 3: return 0;
        }
       
        /*if (b == " " && a == c && a != " ") return this._1blankEval(a);
        else if ((a == " " && b == c && b != " ") || (c == " " && a == b && b != " ")) return this._1blankEval(b);
        else if (a == b && b == c && a != " " && a == this.p) return 5000000;
        else if (a == b && b == c && a != " " && a != this.p) return -5000000;
        
        else if (a == b && a != " " && c == this.p) return 200000;
        else if (b == c && b != " " && a == this.p) return 200000;
        else if (a == c && c != " " && b == this.p) return 200000;
        return 0;*/
    }
    markVisited(i, j, color){
        let w = width / this.board.size;
        let h = height / this.board.size;
        let x = w * i + w / 2;
        let y = h * j + h / 2;
        fill(...color);
        rect(x - w/2, y - h/2, w, h, 30);
    }
    checkScore(turn) {
        let b = this.board.board;
        let score = 0;
        let str = "";
        for (let i = 0; i < this.board.size; i++) {
            for (let j = 0; j < this.board.size; j++) {
                str+=b[i][j]+"|";
                if(j < this.board.size -2)
                    score += this.scoreFunc(b[i][j], b[i][j + 1], b[i][j + 2], turn);
                if(i < this.board.size -2)
                    score += this.scoreFunc(b[i][j], b[i + 1][j], b[i + 2][j], turn);
                if(i < this.board.size -2 && j < this.board.size -2){
                    score += this.scoreFunc(b[i][j], b[i + 1][j + 1], b[i + 2][j + 2], turn); //duz capraz
                    score += this.scoreFunc(b[i + 2][j], b[i + 1][j + 1], b[i][j + 2], turn);
                }
            }
            str+="\n";
        }
        //console.log(str, score);
        return score;
    }

    best_move() {
        let bestScore = -Infinity;
        let move;
        for (let i = 0; i < this.board.size; i++) {
            for (let j = 0; j < this.board.size; j++) {
                if (this.board.isEmpty(i, j)) {
                    this.board.play(i, j);
                    let score = this.minimax(0, true);
                    score = score == Infinity  ? 0: score;
                    //console.log("score" , score)
                    //this.board.board.forEach((aa)=>console.log(aa));
                    if (score > bestScore) {
                        bestScore = score;
                        move = [ i, j ];
                    }
                    this.board.clearCell(i, j);
                }
            }
        }
        console.log(move, this.board, bestScore)
        if(move && this.board.isEmpty(...move))
            this.board.play(...move);
        else
            alert("AI geçerli hamle bulamadı.");
    }
    
    
    minimax(depth, isMaximizing) {
        let winner = this.board.checkWinner()
        if (depth == 0 || winner) {
            if(winner == this.p)
                return 20000000;
            else if(winner)
                return -20000000;
            let sc = this.checkScore(isMaximizing);
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