let board;
let game_winner = false;
let ai = null;
function setup() {
    var canvas = createCanvas(700, 700);
    canvas.parent("board");
    board = new Board(3);
    board.drawBorders();
    //new GameManager("", board);
    ai = new AI(board, "O");
    /*ai.best_move();
    game_winner = board.checkWinner();
    if(game_winner){
        alert("Player " + game_winner + " Wins.");
    }*/
}

function draw() {
    board.draw();
}

function mousePressed() {
    let j = floor(mouseX / width * board.size);
    let i = floor(mouseY / height * board.size);
    if (board.isEmpty(i, j)) {
        board.play(i, j);
        game_winner = board.checkWinner();
        if(!game_winner){
            //play ai
            ai.best_move();
            game_winner = board.checkWinner();
            if(game_winner){
                alert("Player " + game_winner + " Wins.");
            }
        } else {
            alert("Player " + game_winner + " Wins.");
        }
    }
}