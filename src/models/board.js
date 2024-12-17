class Board {
    constructor() {
        this.grid = this.initializeBoard();
    }

    initializeBoard() {
        // Initialize the chessboard with pieces
        return [
            ['R', 'N', 'B', 'Q', 'K', 'B', 'N', 'R'], // Black pieces 0
            ['P', 'P', 'P', 'P', 'P', 'P', 'P', 'P'], // Black pawns 1
            Array(8).fill(null),                      // Empty row 2
            Array(8).fill(null),                      // Empty row 3
            Array(8).fill(null),                      // Empty row 4
            Array(8).fill(null),                      // Empty row 5
            ['p', 'p', 'p', 'p', 'p', 'p', 'p', 'p'], // White pawns 6
            ['r', 'n', 'b', 'q', 'k', 'b', 'n', 'r'], // White pieces 7
        ];
    }

    getPiece(x, y) {
        return this.grid[x][y];
    }

    movePiece(start, end) {
        const [startX, startY] = start;
        const [endX, endY] = end;
    
        // Safely retrieve the piece to move
        const pieceToMove = this.grid[startX][startY];
    
        if (!pieceToMove) {
            console.log("No piece at the starting position.");
            return;
        }
        console.debug(`Board before ${this.grid}`);
        // Move the piece and ensure the original position is null
        this.grid[endX][endY] = pieceToMove; // Set the piece at the destination
        this.grid[startX][startY] = null;    // Clear the start position
        console.debug(`Board after ${this.grid}`);
        // Debugging logs for confirmation
        console.debug(`Moved piece '${pieceToMove}' from [${startX}, ${startY}] to [${endX}, ${endY}]`);
    }
}

module.exports = Board;