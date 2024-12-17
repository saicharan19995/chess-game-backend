# Chess Game Backend

This is a Chess Game Backend implemented using Node.js and Express.js. It supports standard chess rules, turn-based gameplay between two players, and move validation for all chess pieces. The backend exposes RESTful APIs to interact with the chessboard.

## Validation Rules:
1.	Pawn Movement:
	•	Single or double forward moves.
	•	Diagonal captures.
	•	En passant can be added later.
2.	Rook Movement:
	•	Moves in straight lines (horizontal or vertical) as long as the path is clear.
3.	Knight Movement:
	•	Moves in an “L” shape (2 squares in one direction, 1 square perpendicular).
4.	Bishop Movement:
	•	Moves diagonally as long as the path is clear.
5.	Queen Movement:
	•	Combines Rook and Bishop movements.
6.	King Movement:
	•	Moves 1 square in any direction.
7.	Path Validation:
	•	isPathClear() checks if the path between the start and end positions is clear for Rooks, Bishops, and Queens.
8.	Capture Logic:
	•	A piece cannot capture another piece of the same color.

## Technologies Used
1. Node.js and Express.js: Backend server and API.
2. Jest: Unit testing framework.
3. Supertest: API endpoint testing.
4. JavaScript: Core logic and move validations

## Setup Instructions

1. Clone the Repository
```bash
git clone https://github.com/your-repo/chess-game-backend.git
cd chess-game-backend
```

2. Install Dependencies
```bash
npm install
```

3. Start the Server
```bash
npm start
```

4. Run Tests
```bash
npm test
```


## API Documentation

Endpoint: POST /api/game/create-game\
Description: Initializes a new chess game and generates a unique game ID.\
Request Body:

```json
{
	"player1": "Sai",
	"player2": "Charan"
}
```

Response:
```json
{
  	"gameId": "1734397085581"
}
```

2. Make a Move

Endpoint: POST /api/game/move\
Description: Moves a piece on the board if it’s the player’s turn and the move is valid.\
Request Body:

```json
{
	"gameId": "1734397085581",
	"player": "white",
	"start": [6, 0],
	"end": [5, 0]
}
```

Response:
```json
{
	"success": true,
	"status": {
		"board": [
		["R", "N", "B", "Q", "K", "B", "N", "R"],
		["P", "P", "P", "P", "P", "P", "P", "P"],
		[null, null, null, null, null, null, null, null],
		[null, null, null, null, null, null, null, null],
		[null, null, null, null, null, null, null, null],
		["p", null, null, null, null, null, null, null],
		[null, "p", "p", "p", "p", "p", "p", "p"],
		["r", "n", "b", "q", "k", "b", "n", "r"]
		],
		"turn": "black"
	}
}
```


Response:
```json
{
	"success": false,
	"error": "Invalid move"
}
```

Response:
```json
{
	"success": false,
	"error": "It's not your turn"
}
```

3. Get Game Status

Endpoint: GET /api/game/:gameId/status\
Description: Retrieves the current state of the game.\Request: Replace :gameId with the actual game ID\
Response:

```json
{
	"status": {
		"board": [
		["R", "N", "B", "Q", "K", "B", "N", "R"],
		["P", "P", "P", "P", "P", "P", "P", "P"],
		[null, null, null, null, null, null, null, null],
		[null, null, null, null, null, null, null, null],
		[null, null, null, null, null, null, null, null],
		["p", null, null, null, null, null, null, null],
		[null, "p", "p", "p", "p", "p", "p", "p"],
		["r", "n", "b", "q", "k", "b", "n", "r"]
		],
		"turn": "white"
  	}
}
```