import { INITIAL_SNAKE_LENGTH } from './constants.js';

export const getRandomEmptyPosition = (game) => {
    const occupiedPositions = new Set();

    // Add snake positions
    game.snake.forEach(s => occupiedPositions.add(`${s.x},${s.y}`));

    // Add blue fruit
    if (game.blueFruit) occupiedPositions.add(`${game.blueFruit.x},${game.blueFruit.y}`);

    // Add red fruit
    if (game.redFruit) occupiedPositions.add(`${game.redFruit.x},${game.redFruit.y}`);

    // Add grey fruits
    game.greyFruits.forEach(fruit => occupiedPositions.add(`${fruit.x},${fruit.y}`));

    const emptyPositions = [];

    for (let x = 0; x < game.gridWidth; x++) {
        for (let y = 0; y < game.gridHeight; y++) {
            if (!occupiedPositions.has(`${x},${y}`)) {
                emptyPositions.push({ x, y });
            }
        }
    }

    if (emptyPositions.length === 0) return null;

    return emptyPositions[Math.floor(game.random() * emptyPositions.length)];
};

export const generateFruit = (game) => {
    if (!game.redFruit && !game.blueFruit) {
        // Randomly pick red or blue fruit
        const fruitType = game.random() < 0.5 ? 'redFruit' : 'blueFruit';
        const pos = getRandomEmptyPosition(game);
        if (!pos) return;
        game[fruitType] = pos;
    }
};

export const generateGreyFruit = (game) => {
    if (game.snake.length > INITIAL_SNAKE_LENGTH && game.greyFruits.length < 3) {
        const pos = getRandomEmptyPosition(game);
        if (!pos) return;
        game.greyFruits.push(pos);
    }
};
