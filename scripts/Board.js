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
        this.num_of_plays = 0;
    }

    play(x, y) {
        this.board[x][y] = this.current_player;
        this.current_player = this.current_player == "X" ? "O" : "X";
        this.num_of_plays++;
        if (this.num_of_plays == this.size ** 2) {
            console.log("Board is full, it is a tie i guess.")
            return;
        }
    }
    clearCell(x, y) {
        this.current_player = this.current_player == "X" ? "O" : "X";
        this.board[x][y] = " ";
        this.num_of_plays--;
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


    drawBorders() {
        strokeWeight(3);
        background(220);
        let w = width / this.size;
        let h = height / this.size;
        for (let i = 1; i < this.size; i++) {
            line(w * i, 0, w * i, height);
            line(0, h * i, width, h * i);
        }
    }

    draw() {
        let w = width / this.size;
        let h = height / this.size;
        for (let i = 0; i < this.size; i++) {
            for (let j = 0; j < this.size; j++) {
                if (this.board[i][j] != " ") {
                    let y = w * i + w / 2;
                    let x = h * j + h / 2;
                    if (this.board[i][j] == "O") {
                        noFill();
                        ellipse(x, y, w / 2);
                    } else if (this.board[i][j] == "X") {
                        let xr = w / 4
                        line(x - xr, y - xr, x + xr, y + xr);
                        line(x + xr, y - xr, x - xr, y + xr);
                    } else {
                        rect(x - w / 2, y - h / 2, w, h, 20);
                    }
                }
            }
        }
    }

}