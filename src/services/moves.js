const { isValidMove } = require('./validator');

function getPossibleMoves(board, position, turn) {
    const [startX, startY] = position;
    const piece = board.getPiece(startX, startY);

    if (!piece) {
        throw new Error("No piece at the given position");
    }

    const isWhite = piece === piece.toLowerCase();
    if ((turn === 'white' && !isWhite) || (turn === 'black' && isWhite)) {
        throw new Error("It's not your turn");
    }


    const possibleMoves = []
    for (let endX = 0; endX < 8; endX++) {
        for (let endY = 0; endY < 8; endY ++) {
            if (isValidMove(board, [startX, startY], [endX, endY], turn)) {
                possibleMoves.push([endX, endY]);
            }
        }
    }
    return possibleMoves;

}

module.exports = { getPossibleMoves };
