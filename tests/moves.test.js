const { getPossibleMoves } = require('../src/services/moves');
const Board = require('../src/models/board');



test('Get possible moves for white pawn', () => {
    const board = new Board();
    const position = [6, 0];
    const turn = 'white';
// [
//     ['R', 'N', 'B', 'Q', 'K', 'B', 'N', 'R'], // Black pieces 0
//     ['P', 'P', 'P', 'P', 'P', 'P', 'P', 'P'], // Black pawns 1
//     Array(8).fill(null),                      // Empty row 2
//     Array(8).fill(null),                      // Empty row 3
//     Array(8).fill(null),                      // Empty row 4
//     Array(8).fill(null),                      // Empty row 5
//     ['p', 'p', 'p', 'p', 'p', 'p', 'p', 'p'], // White pawns 6
//     ['r', 'n', 'b', 'q', 'k', 'b', 'n', 'r'], // White pieces 7
// ];

    const moves = getPossibleMoves(board, position, turn);

    expect(moves).toEqual([[4, 0], [5, 0]]);
});

