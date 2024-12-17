const express = require('express');
const gameRoutes = require('./routes/game');

const app = express();
app.use(express.json());

app.use('/api/game', gameRoutes);

const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));