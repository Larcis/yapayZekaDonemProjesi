class GameManager {
    constructor(mode, board) {
        this.mode = mode;
        this.ai_started = false;
        this.ai_turn = false;
        this.board = board;
        let int = setInterval(() => {
            if (!game_finished) {
                let cur = this.ai_turn;
                this.ai_turn = this.board.current_player == "O";
                if (cur != this.ai_turn) {
                    this.ai_started = !this.ai_started;
                    if (this.ai_started) {
                        console.log(minimax(this.board, 20, false));
                        console.log(current_best_xy);
                        this.board.play(...current_best_xy);
                        game_finished = board.checkWinner();
                    }
                }
            } else {
                console.log("game finished winner is " + game_finished);
                clearInterval(int);
            }

        }, 50);
    }

}