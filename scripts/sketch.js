var board = null;
var canvas;

function setup() {
    canvas = createCanvas(700, 700);
    canvas.parent("board");
}

function draw() {
    frameRate(60);
    if (board) {
        board.draw();
        if (board.num_of_plays == board.size ** 2) {
            show_info("It is a tie.");
            board = null;
        }
    }
}