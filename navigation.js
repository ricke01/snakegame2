export const LEFT = { x: -1, y: 0 };
export const RIGHT = { x: 1, y: 0 };
export const UP = { x: 0, y: -1 };
export const DOWN = { x: 0, y: 1 };

export const hasHitWall = (game) => {
    const head = game.snake[0];
    return head.x < 0 || head.x >= game.gridWidth || head.y < 0 || head.y >= game.gridHeight;
};

export const hasHitSelf = (game) => {
    const head = game.snake[0];
    return game.snake.slice(1).some(segment => segment.x === head.x && segment.y === head.y);
};

export const hasEatenBlueFruit = (game) => {
    const head = game.snake[0];
    return game.blueFruit && head.x === game.blueFruit.x && head.y === game.blueFruit.y;
};

export const hasEatenRedFruit = (game) => {
    const head = game.snake[0];
    return game.redFruit && head.x === game.redFruit.x && head.y === game.redFruit.y;
};

export const hasEatenGreyFruit = (game) => {
    const head = game.snake[0];
    return game.greyFruits.some(fruit => head.x === fruit.x && head.y === fruit.y);
};
