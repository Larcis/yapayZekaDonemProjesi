var ai, ai1, game_winner, N, depth;

function ai_vs_ai_setup() {
    ai = new AI(board, "X", depth);
    ai1 = new AI(board, "O", depth);
}

function ai_vs_ai_loop() {
    let my_interval = setInterval(() => {
        ai.best_move();
        game_winner = board.checkWinner();
        if (game_winner) {
            clearInterval(my_interval);
            alert("Player " + game_winner + " Wins.");
            return;
        }
        ai1.best_move();
        game_winner = board.checkWinner();
        if (game_winner) {
            clearInterval(my_interval);
            alert("Player " + game_winner + " Wins.");
        }
    }, 50);
}

function startButtonClicked() {
    N = document.getElementById("board_size").value;
    board = new Board(N);
    board.drawBorders();
    depth = document.getElementById("minimax_depth").value;
    let play_type = document.getElementById("play_type").value;
    let ai_first_checkbox = document.getElementById("ai_first_checkbox").checked;
    //print(N, "-", depth, "-", play_type, "-", ai_first_checkbox);
    if (isNaN(N) || isNaN(depth)) {
        console.log("Please Enter Valid input");
        return;
    }
    if (play_type == "AI vs AI") {
        ai_vs_ai_setup();
        ai_vs_ai_loop();
    } else {
        if (ai_first_checkbox) {
            ai = new AI(board, "X", depth);
            ai.best_move();
        } else {
            ai = new AI(board, "O", depth);
        }
        canvas.canvas.onmousedown = function() {
            let j = floor(mouseX / width * board.size);
            let i = floor(mouseY / height * board.size);
            if (board.isEmpty(i, j)) {
                board.play(i, j);
                game_winner = board.checkWinner();
                if (!game_winner) {
                    ai.best_move();
                    game_winner = board.checkWinner();
                    if (game_winner) {
                        alert("Player " + game_winner + " Wins.");
                        canvas.canvas.onmousedown = null;
                    }
                } else {
                    alert("Player " + game_winner + " Wins.");
                    canvas.canvas.onmousedown = null;
                }
            }
        }
    }

}
$(document).ready(function() {
    $('#popup_winner').text('ZAAAA');
    $('#popup').modal('show');
});