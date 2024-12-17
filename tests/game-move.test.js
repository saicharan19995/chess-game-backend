const request = require('supertest');
const express = require('express');
const gameRoutes = require('../src/routes/game');

const app = express();
app.use(express.json());
app.use('/api/game', gameRoutes);

describe('POST /api/game/move - Turn-Based Validation', () => {
    let gameId;

    // Create a new game before running the tests
    beforeAll(async () => {
        const response = await request(app)
            .post('/api/game/create-game')
            .send({ player1: 'Sai', player2: 'Charan' });

        gameId = response.body.gameId;
        console.log(`Game Id ${gameId}`);
    });

    test("Player 'black' cannot move before 'white' makes a move", async () => {
        const response = await request(app)
            .post('/api/game/move')
            .send({
                gameId,
                player: 'black',
                start: [1, 0],
                end: [2, 0],
            });

        expect(response.status).toBe(400);
        expect(response.body.error).toBe("It's not your turn");
    });

    test("Player 'white' makes the first valid move", async () => {
        const response = await request(app)
            .post('/api/game/move')
            .send({
                gameId,
                player: 'white',
                start: [6, 0],
                end: [5, 0],
            });

        expect(response.status).toBe(200);
        expect(response.body.success).toBe(true);
        expect(response.body.status.board[5][0]).toBe('p'); // Pawn moved
        expect(response.body.status.turn).toBe('black'); // Turn switches to black
    });

    test("Player 'black' makes a valid move after 'white'", async () => {
        const response = await request(app)
            .post('/api/game/move')
            .send({
                gameId,
                player: 'black',
                start: [1, 0],
                end: [2, 0],
            });

        expect(response.status).toBe(200);
        expect(response.body.success).toBe(true);
        expect(response.body.status.board[2][0]).toBe('P'); // Black pawn moved
        expect(response.body.status.turn).toBe('white'); // Turn switches back to white
    });

    test("Player 'black' cannot make two consecutive moves", async () => {
        const response = await request(app)
            .post('/api/game/move')
            .send({
                gameId,
                player: 'black',
                start: [5, 0],
                end: [4, 0],
            });

        expect(response.status).toBe(400);
        expect(response.body.error).toBe("It's not your turn");
    });
});