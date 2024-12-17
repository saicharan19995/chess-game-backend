const Board = require('./board');
const { isValidMove } = require('../services/validator');

class Game {
    constructor(player1, player2 = 'AI') {
        this.board = new Board();
        this.players = { white: player1, black: player2 };
        this.turn = 'white';
    }


    makeMove(start, end) {
        const isMoveValid = isValidMove(this.board, start, end, this.turn);
    
        if (isMoveValid) {
            this.board.movePiece(start, end);
            this.turn = this.turn === 'white' ? 'black' : 'white';
            return true;
        }
        return false; // Invalid move
    }
    
    getStatus() {
        return { board: this.board.grid, turn: this.turn };
    }
}

module.exports = Game;