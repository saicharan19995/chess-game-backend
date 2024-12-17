function isValidMove(board, start, end, currentTurn) {
    const [startX, startY] = start;
    const [endX, endY] = end;

    const piece = board.getPiece(startX, startY);
    const target = board.getPiece(endX, endY);

    if (!piece) return false; // No piece at the start position

    const isWhite = piece === piece.toLowerCase();
    if ((currentTurn === 'white' && !isWhite) || (currentTurn === 'black' && isWhite)) {
        return false; // Invalid turn
    }

    if (target && ((isWhite && target === target.toLowerCase()) || (!isWhite && target === target.toUpperCase()))) {
        return false; // Cannot capture your own piece
    }

    switch (piece.toLowerCase()) {
        case 'p': return validatePawnMove(start, end, board, isWhite);
        case 'r': return validateRookMove(start, end, board);
        case 'n': return validateKnightMove(start, end);
        case 'b': return validateBishopMove(start, end, board);
        case 'q': return validateQueenMove(start, end, board);
        case 'k': return validateKingMove(start, end);
        default: return false;
    }
}

function validatePawnMove(start, end, board, isWhite) {
    const [startX, startY] = start;
    const [endX, endY] = end;
    const direction = isWhite ? -1 : 1; // White pawns move up (-1), black pawns move down (+1)
    const startRow = isWhite ? 6 : 1;

    // Simple forward move
    if (startY === endY && board.getPiece(endX, endY) === null) {
        if (startX + direction === endX) return true; // Single forward move
        if (startX === startRow && startX + 2 * direction === endX && board.getPiece(startX + direction, startY) === null) {
            return true; // Double forward move
        }
    }

    // Diagonal capture
    if (Math.abs(startY - endY) === 1 && startX + direction === endX) {
        return board.getPiece(endX, endY) !== null; // Must capture a piece
    }

    return false;
}

function validateRookMove(start, end, board) {
    const [startX, startY] = start;
    const [endX, endY] = end;

    if (startX !== endX && startY !== endY) return false;

    return isPathClear(start, end, board);
}

function validateKnightMove(start, end) {
    const [startX, startY] = start;
    const [endX, endY] = end;

    const dx = Math.abs(startX - endX);
    const dy = Math.abs(startY - endY);

    return (dx === 2 && dy === 1) || (dx === 1 && dy === 2);
}

function validateBishopMove(start, end, board) {
    const [startX, startY] = start;
    const [endX, endY] = end;

    if (Math.abs(startX - endX) !== Math.abs(startY - endY)) return false;

    return isPathClear(start, end, board);
}

function validateQueenMove(start, end, board) {
    return validateRookMove(start, end, board) || validateBishopMove(start, end, board);
}

function validateKingMove(start, end) {
    const [startX, startY] = start;
    const [endX, endY] = end;

    const dx = Math.abs(startX - endX);
    const dy = Math.abs(startY - endY);

    return dx <= 1 && dy <= 1;
}

function isPathClear(start, end, board) {
    const [startX, startY] = start;
    const [endX, endY] = end;

    const dx = Math.sign(endX - startX);
    const dy = Math.sign(endY - startY);

    let x = startX + dx;
    let y = startY + dy;

    while (x !== endX || y !== endY) {
        if (board.getPiece(x, y)) return false; // Path blocked
        x += dx;
        y += dy;
    }

    return true;
}

module.exports = { isValidMove };