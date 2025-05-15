import { GAME_STATE, GRID_SIZE, INITIAL_SNAKE_LENGTH } from './constants.js';
import { draw, drawMenu, drawGameOver } from './draw.js';
import { generateFruit, generateGreyFruit } from './snake.js';
import { hasHitWall, hasHitSelf, hasEatenBlueFruit, hasEatenRedFruit, hasEatenGreyFruit } from './navigation.js';

export const createGame = (canvas) => {
    return {
        canvas,
        gridWidth: Math.floor(canvas.width / GRID_SIZE),
        gridHeight: Math.floor(canvas.height / GRID_SIZE),
        snake: [],
        direction: { x: 1, y: 0 },
        nextDirection: { x: 1, y: 0 },
        blueFruit: null,
        redFruit: null,
        greyFruits: [],
        score: 0,
        gameState: GAME_STATE.MENU,
        buttonHover: false,
        random: Math.random, // can be replaced for tests
        gameLoopId: null,
        speed: 10 // frames per second
    };
};

export const startGame = (game) => {
    game.snake = [];
    const startX = Math.floor(game.gridWidth / 2);
    const startY = Math.floor(game.gridHeight / 2);

    for (let i = 0; i < INITIAL_SNAKE_LENGTH; i++) {
        game.snake.push({ x: startX - i, y: startY });
    }

    game.direction = { x: 1, y: 0 };
    game.nextDirection = { x: 1, y: 0 };
    game.score = 0;
    game.blueFruit = null;
    game.redFruit = null;
    game.greyFruits = [];
    game.gameState = GAME_STATE.PLAYING;
    game.buttonHover = false;

    generateFruit(game);
    generateGreyFruit(game);

    if (game.gameLoopId) {
        clearInterval(game.gameLoopId);
    }
    game.gameLoopId = setInterval(() => gameLoop(game), 1000 / game.speed);
};

export const endGame = (game) => {
    game.gameState = GAME_STATE.GAME_OVER;
    clearInterval(game.gameLoopId);
    drawGameOver(game);
};

const moveSnake = (game) => {
    game.direction = game.nextDirection;

    const head = { x: game.snake[0].x + game.direction.x, y: game.snake[0].y + game.direction.y };

    game.snake.unshift(head);

    // Check fruits eaten
    let ateFruit = false;

    if (hasEatenBlueFruit(game)) {
        game.score += 1;
        game.blueFruit = null;
        ateFruit = true;
    } else if (hasEatenRedFruit(game)) {
        game.score += 2;
        game.redFruit = null;
        ateFruit = true;
    } else if (hasEatenGreyFruit(game)) {
        game.score = Math.max(0, game.score - 1);
        // Remove the grey fruit eaten
        game.greyFruits = game.greyFruits.filter(fruit => !(fruit.x === head.x && fruit.y === head.y));
        ateFruit = true;
    }

    if (!ateFruit) {
        game.snake.pop();
    } else {
        // Possibly generate new fruits after eating
        generateFruit(game);
        generateGreyFruit(game);
    }
};

const gameLoop = (game) => {
    if (game.gameState !== GAME_STATE.PLAYING) return;

    moveSnake(game);

    if (hasHitWall(game) || hasHitSelf(game)) {
        endGame(game);
        return;
    }

    draw(game);
};
