const Board = require('../src/models/board');
const { isValidMove } = require('../src/services/validator');

test('Board initializes correctly', () => {
    const board = new Board();
    expect(board.grid[0][0]).toBe('R'); // Rook
    expect(board.grid[6][0]).toBe('p'); // Pawn
    expect(board.grid[3][3]).toBeNull(); // Empty space
});

test('Board moves pieces correctly', () => {
    const board = new Board();
    board.movePiece([6, 0], [5, 0]); // Move a white pawn
    expect(board.grid[5][0]).toBe('p'); // Pawn moved
    expect(board.grid[6][0]).toBeNull(); // Original position empty
});

test('Pawn valid moves', () => {
    const board = new Board();
    expect(isValidMove(board, [6, 0], [5, 0], 'white')).toBe(true); // Single forward
    expect(isValidMove(board, [6, 0], [4, 0], 'white')).toBe(true); // Double forward
    expect(isValidMove(board, [6, 0], [5, 1], 'white')).toBe(false); // Invalid capture
});

test('Knight valid moves', () => {
    const board = new Board();
    expect(isValidMove(board, [7, 1], [5, 2], 'white')).toBe(true); // Valid knight move
    expect(isValidMove(board, [7, 1], [5, 3], 'white')).toBe(false); // Invalid move
});

test('Rook valid moves', () => {
    const board = new Board();
    board.grid[6][0] = null; // Clear path
    expect(isValidMove(board, [7, 0], [5, 0], 'white')).toBe(true); // Valid vertical move
});