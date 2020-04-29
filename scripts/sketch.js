let board;

function setup() {
    var canvas = createCanvas(600, 600);
    canvas.parent("board");
    board = new Board(5);
    board.drawBorders(this);
}

function draw() {
    board.draw(this);
}

function mousePressed() {
    if (board.current_player == "X") {
        let i = floor(mouseX / width * board.size);
        let j = floor(mouseY / height * board.size);
        if (board.isEmpty(i, j))
            board.play(i, j);
    } else { //TODO ai geldiğinde silinecek
        let i = floor(mouseX / width * board.size);
        let j = floor(mouseY / height * board.size);
        if (board.isEmpty(i, j))
            board.play(i, j);
    }
    console.log(board.checkWinner());
}