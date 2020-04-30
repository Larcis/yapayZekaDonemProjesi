class Board {
    constructor(N) {
        this.board = [];
        for (let i = 0; i < N; i++) {
            this.board[i] = []
            for (let j = 0; j < N; j++) {
                this.board[i].push(" ");
            }
        }
        this.size = N;
        this.current_player = "X";
    }

    play(x, y) {
        if (this.isEmpty(x, y)) {
            this.board[x][y] = this.current_player;
            this.current_player = this.current_player == "X" ? "O" : "X";
        }
    }
    clearCell(x, y) {
        this.board[x][y] = " ";
    }

    isEmpty(x, y) {
        if (x < this.size && y < this.size && x >= 0 && y >= 0)
            return this.board[x][y] === " ";
        return false;
    }

    equals3_(a, b, c) {
        return (a == b && b == c && a != " ");
    }

    checkWinner() {
        let b = this.board;
        for (let i = 0; i < this.size - 2; i++) {
            for (let j = 0; j < this.size - 2; j++) {

                if (this.equals3_(b[i][j], b[i + 1][j], b[i + 2][j]) || //yatay 1
                    this.equals3_(b[i][j], b[i][j + 1], b[i][j + 2])) //dikey 1
                    return b[i][j];
                else if (this.equals3_(b[i][j + 1], b[i + 1][j + 1], b[i + 2][j + 1]) || //yatay2
                    this.equals3_(b[i + 1][j], b[i + 1][j + 1], b[i + 1][j + 2]) || //dikey2
                    this.equals3_(b[i][j], b[i + 1][j + 1], b[i + 2][j + 2]) || //duz capraz
                    this.equals3_(b[i + 2][j], b[i + 1][j + 1], b[i][j + 2])) //ters capraz
                    return b[i + 1][j + 1];
                else if (
                    this.equals3_(b[i][j + 2], b[i + 1][j + 2], b[i + 2][j + 2]) || //yatay3
                    this.equals3_(b[i + 2][j], b[i + 2][j + 1], b[i + 2][j + 2])) //dikey3
                    return b[i + 2][j + 2];
            }
        }
        return null;
    }

    scoreFunc(a, b, c) {
        let score = 0;
        if (a == " " && b == c && b == "X") score = -1;
        else if (b == " " && a == c && a == "X") score = -1;
        else if (c == " " && a == b && b == "X") score = -1;

        if (a == " " && b == c && b == "O") score = 1;
        else if (b == " " && a == c && a == "O") score = 1;
        else if (c == " " && a == b && b == "O") score = 1;
        if (this.equals3_(a, b, c) && a == 'O') score += 200;
        return score;
    }
    checkScore() {
        let b = this.board;
        let score = 0;
        for (let i = 0; i < this.size - 2; i++) {
            for (let j = 0; j < this.size - 2; j++) {
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


    drawBorders(p5) {
        p5.strokeWeight(3);
        p5.background(220);
        let w = p5.width / this.size;
        let h = p5.height / this.size;
        for (let i = 1; i < this.size; i++) {
            p5.line(w * i, 0, w * i, p5.height);
            p5.line(0, h * i, p5.width, h * i);
        }
    }

    draw(p5) {
        let w = p5.width / this.size;
        let h = p5.height / this.size;
        for (let i = 0; i < this.size; i++) {
            for (let j = 0; j < this.size; j++) {
                if (this.board[i][j] != " ") {
                    let x = w * i + w / 2;
                    let y = h * j + h / 2;
                    if (this.board[i][j] == "O") {
                        noFill();
                        ellipse(x, y, w / 2);
                    } else {
                        let xr = w / 4
                        line(x - xr, y - xr, x + xr, y + xr);
                        line(x + xr, y - xr, x - xr, y + xr);
                    }
                }
            }
        }
    }

}