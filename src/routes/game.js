const express = require('express');
const { getPossibleMoves } = require('../services/moves');
const Game = require('../models/game');
const router = express.Router();

const games = new Map(); // In-memory storage for games

// Create a new game
router.post('/create-game', (req, res) => {
    const { player1, player2 } = req.body;
    const gameId = Date.now().toString();
    const game = new Game(player1, player2);
    games.set(gameId, game);
    res.status(201).json({ gameId });
});

// Make a move
router.post('/move', (req, res) => {
    const { gameId, player, start, end } = req.body;
    const game = games.get(gameId);

    if (!game) return res.status(404).send('Game not found');

    // Check if it's the player's turn
    if (game.turn !== player) {
        return res.status(400).json({ error: "It's not your turn" });
    }

    // Attempt to make the move
    const success = game.makeMove(start, end);
    if (!success) {
        return res.status(400).json({ error: 'Invalid move' });
    }

    // Return the updated status
    res.json({ success: true, status: game.getStatus() });
});

// Get game status
router.get('/:gameId/status', (req, res) => {
    const { gameId } = req.params;
    const game = games.get(gameId);

    if (!game) return res.status(404).send('Game not found');

    res.json({ status: game.getStatus() });
});


router.post('/possible-moves', (req, res) => {
    const {gameId, position } = req.body;
    const game = games.get(gameId);
    if (!game) return res.status(404).send('Game not found');

    try {
        const possibleMoves = getPossibleMoves(game.board, position, game.turn);
        res.json({possibleMoves});
    }catch (error) {
        res.status(400).json({error: error.message});
    }
});

module.exports = router;