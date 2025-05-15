// FILE: index.js

// Snake Game Implementation

import { createGame } from './game.js';
import { handleClick, handleMouseMove, handleKeyDown } from './keyboard.js';
import { drawMenu } from './draw.js';

let game;

/**
 * Initialize the game
 *
 * Create the game, add event listeners, and draw the menu
 * Listen to clicks and keydown
 * Draw the menu
 */
export const init = () => {
    const canvas = document.getElementById('gameCanvas');
    game = createGame(canvas);

    canvas.addEventListener('click', handleClick(game));
    canvas.addEventListener('mousemove', handleMouseMove(game));
    window.addEventListener('keydown', handleKeyDown(game));

    drawMenu(game);
};

// Initialize the game
window.onload = init;
