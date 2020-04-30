let board;
let game_finished = false;

function setup() {
    var canvas = createCanvas(700, 700);
    canvas.parent("board");
    board = new Board(3);
    board.drawBorders(this);
    new GameManager("", board);
}

function draw() {
    board.draw(this);
}

function mousePressed() {
    if (board.current_player == "X" && !game_finished) {
        let i = floor(mouseX / width * board.size);
        let j = floor(mouseY / height * board.size);
        if (board.isEmpty(i, j)) {
            board.play(i, j);
            game_finished = board.checkWinner();
        }
    } else { //TODO ai geldiğinde silinecek
        console.log("winner is " + game_finished);
    }
}