import { GAME_STATE } from './constants.js';
import { endGame, startGame } from './game.js';
import { UP, DOWN, LEFT, RIGHT } from './navigation.js';
import { drawMenu } from './draw.js';

export const handleClick = (game) => (event) => {
    const rect = game.canvas.getBoundingClientRect();
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;

    if (game.gameState === GAME_STATE.MENU) {
        // Check if start button clicked
        const btn = game.startButton;
        if (btn && mouseX >= btn.x && mouseX <= btn.x + btn.width &&
            mouseY >= btn.y && mouseY <= btn.y + btn.height) {
            startGame(game);
        }
    } else if (game.gameState === GAME_STATE.GAME_OVER) {
        const btn = game.restartButton;
        if (btn && mouseX >= btn.x && mouseX <= btn.x + btn.width &&
            mouseY >= btn.y && mouseY <= btn.y + btn.height) {
            game.gameState = GAME_STATE.MENU;
            drawMenu(game);
        }
    }
};

export const handleMouseMove = (game) => (event) => {
    const rect = game.canvas.getBoundingClientRect();
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;

    let hover = false;
    if (game.gameState === GAME_STATE.MENU) {
        const btn = game.startButton;
        if (btn && mouseX >= btn.x && mouseX <= btn.x + btn.width &&
            mouseY >= btn.y && mouseY <= btn.y + btn.height) {
            hover = true;
        }
    } else if (game.gameState === GAME_STATE.GAME_OVER) {
        const btn = game.restartButton;
        if (btn && mouseX >= btn.x && mouseX <= btn.x + btn.width &&
            mouseY >= btn.y && mouseY <= btn.y + btn.height) {
            hover = true;
        }
    }

    if (hover !== game.buttonHover) {
        game.buttonHover = hover;
        if (game.gameState === GAME_STATE.MENU) {
            drawMenu(game);
        } else if (game.gameState === GAME_STATE.GAME_OVER) {
            drawGameOver(game);
        }
    }
};

export const handleKeyDown = (game) => (event) => {
    if (game.gameState !== GAME_STATE.PLAYING) return;

    switch (event.key) {
        case 'ArrowUp':
            if (game.direction !== DOWN) game.nextDirection = UP;
            break;
        case 'ArrowDown':
            if (game.direction !== UP) game.nextDirection = DOWN;
            break;
        case 'ArrowLeft':
            if (game.direction !== RIGHT) game.nextDirection = LEFT;
            break;
        case 'ArrowRight':
            if (game.direction !== LEFT) game.nextDirection = RIGHT;
            break;
        case 'q':
        case 'Q':
            endGame(game);
            break;
        default:
            break;
    }
};
