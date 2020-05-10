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
            show_info("Player " + game_winner);
            return;
        }
        ai1.best_move();
        game_winner = board.checkWinner();
        if (game_winner) {
            clearInterval(my_interval);
            show_info("Player " + game_winner);
        }
    }, 1000);
}

function startButtonClicked() {
    N = document.getElementById("board_size").value;
    board = new Board(N);
    board.drawBorders();
    depth = document.getElementById("minimax_depth").value;
    let play_type = document.getElementById("play_type").value;
    let ai_first_checkbox = document.getElementById("ai_first_checkbox").checked;
    let assistance = document.getElementById("assistance_checkbox").checked;
    if (isNaN(N) || isNaN(depth)) {
        console.log("Please Enter Valid input");
        return;
    }
    if (play_type == "AI vs AI") {
        ai_vs_ai_setup();
        ai_vs_ai_loop();
    } else {

        let last_suggestion = null;
        if (ai_first_checkbox) {
            ai = new AI(board, "X", depth);
            ai.best_move();
            if (assistance) {
                ai1 = new AI(board, "O", depth, true);
                last_suggestion = ai1.best_move();
            }
        } else {
            ai = new AI(board, "O", depth);
            if (assistance)
                ai1 = new AI(board, "X", depth, true);
        }

        canvas.canvas.onmousedown = function() {
            let j = floor(mouseX / width * board.size);
            let i = floor(mouseY / height * board.size);
            if (last_suggestion) {
                board.drawBorders();
            }
            if (board.isEmpty(i, j)) {
                board.play(i, j);
                game_winner = board.checkWinner();
                if (!game_winner) {
                    ai.best_move();
                    game_winner = board.checkWinner();
                    if (game_winner) {
                        show_info("Player " + game_winner);
                        canvas.canvas.onmousedown = null;
                    } else if (assistance) {
                        last_suggestion = ai1.best_move();
                    }
                } else {
                    show_info("Player " + game_winner);
                    canvas.canvas.onmousedown = null;
                }
            }
        }
    }

}

//showing winner modal
function show_info(text) {
    $('#popup_winner').text(text);
    $('#popup').modal('show');
}

//hiding the ai first and assistance checkbox for game type selection
function ui_fix(selectObject) {
    if (selectObject.value == "AI vs AI") {
        $('#ai_first_check').hide();
        $('#assistance_check').hide();
    } else {
        $('#ai_first_check').show();
        $('#assistance_check').show();
    }
}