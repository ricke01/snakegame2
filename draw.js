import { COLORS, GRID_SIZE, GAME_STATE } from './constants.js';

export const draw = (game) => {
    const ctx = game.canvas.getContext('2d');

    // Clear background
    ctx.fillStyle = COLORS.background;
    ctx.fillRect(0, 0, game.canvas.width, game.canvas.height);

    // Draw snake
    ctx.fillStyle = COLORS.snake;
    game.snake.forEach(segment => {
        ctx.fillRect(segment.x * GRID_SIZE, segment.y * GRID_SIZE, GRID_SIZE, GRID_SIZE);
    });

    // Draw blue fruit
    if (game.blueFruit) {
        ctx.fillStyle = COLORS.blueFruit;
        ctx.fillRect(game.blueFruit.x * GRID_SIZE, game.blueFruit.y * GRID_SIZE, GRID_SIZE, GRID_SIZE);
    }

    // Draw red fruit
    if (game.redFruit) {
        ctx.fillStyle = COLORS.redFruit;
        ctx.fillRect(game.redFruit.x * GRID_SIZE, game.redFruit.y * GRID_SIZE, GRID_SIZE, GRID_SIZE);
    }

    // Draw grey fruits
    ctx.fillStyle = COLORS.greyFruit;
    game.greyFruits.forEach(fruit => {
        ctx.fillRect(fruit.x * GRID_SIZE, fruit.y * GRID_SIZE, GRID_SIZE, GRID_SIZE);
    });

    // Draw score, length and coverage info
    ctx.fillStyle = COLORS.menuText;
    ctx.font = '16px Arial';
    ctx.fillText(`Score: ${game.score}`, 50, 20);
    ctx.fillText(`Length: ${game.snake.length}`, 50, 40);

    const coverage = ((game.snake.length / (game.gridWidth * game.gridHeight)) * 100).toFixed(1);
    ctx.fillText(`Coverage: ${coverage}% filled`, 80, 60);
};

export const drawMenu = (game) => {
    const ctx = game.canvas.getContext('2d');
    ctx.fillStyle = COLORS.background;
    ctx.fillRect(0, 0, game.canvas.width, game.canvas.height);

    ctx.fillStyle = COLORS.menuText;
    ctx.font = '48px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('Snake Game', game.canvas.width / 2, game.canvas.height / 3);

    ctx.font = '20px Arial';
    ctx.fillText('Press Start to Play', game.canvas.width / 2, game.canvas.height / 2);

    // Draw start button
    const btnWidth = 150;
    const btnHeight = 50;
    const btnX = (game.canvas.width - btnWidth) / 2;
    const btnY = game.canvas.height / 2 + 30;

    ctx.fillStyle = game.buttonHover ? COLORS.buttonHover : COLORS.button;
    ctx.fillRect(btnX, btnY, btnWidth, btnHeight);

    ctx.fillStyle = COLORS.buttonText;
    ctx.font = '24px Arial';
    ctx.fillText('Start', game.canvas.width / 2, btnY + 33);

    // Save button area for click detection
    game.startButton = { x: btnX, y: btnY, width: btnWidth, height: btnHeight };

    // Instructions
    ctx.fillStyle = COLORS.menuText;
    ctx.font = '16px Arial';
    ctx.fillText('Use arrow keys to move the snake.', game.canvas.width / 2, btnY + 90);
    ctx.fillText('Eat blue (+1), red (+2), avoid grey fruits (-1).', game.canvas.width / 2, btnY + 110);
    ctx.fillText('Press "Q" to quit anytime.', game.canvas.width / 2, btnY + 130);
};

export const drawGameOver = (game) => {
    const ctx = game.canvas.getContext('2d');
    ctx.fillStyle = COLORS.background;
    ctx.fillRect(0, 0, game.canvas.width, game.canvas.height);

    ctx.fillStyle = COLORS.menuText;
    ctx.font = '48px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('Game Over', game.canvas.width / 2, game.canvas.height / 3);

    // Show score and coverage
    const coverage = ((game.snake.length / (game.gridWidth * game.gridHeight)) * 100).toFixed(1);
    ctx.font = '20px Arial';
    ctx.fillText(`Score: ${game.score}`, game.canvas.width / 2, game.canvas.height / 2);
    ctx.fillText(`Coverage: ${coverage}%`, game.canvas.width / 2, game.canvas.height / 2 + 30);

    // Draw restart button
    const btnWidth = 200;
    const btnHeight = 50;
    const btnX = (game.canvas.width - btnWidth) / 2;
    const btnY = game.canvas.height / 2 + 70;

    ctx.fillStyle = game.buttonHover ? COLORS.buttonHover : COLORS.button;
    ctx.fillRect(btnX, btnY, btnWidth, btnHeight);

    ctx.fillStyle = COLORS.buttonText;
    ctx.font = '24px Arial';
    ctx.fillText('Return to Menu', game.canvas.width / 2, btnY + 33);

    // Save button area for click detection
    game.restartButton = { x: btnX, y: btnY, width: btnWidth, height: btnHeight };
};
