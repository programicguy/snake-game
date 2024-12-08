import { GAME_CONFIG } from './config.js';

export class Food {
    constructor() {
        this.position = { x: 0, y: 0 };
        this.spawn();
    }

    spawn() {
        this.position = {
            x: Math.floor(Math.random() * GAME_CONFIG.GRID_SIZE),
            y: Math.floor(Math.random() * GAME_CONFIG.GRID_SIZE)
        };
    }

    isEatenBy(snake) {
        const head = snake.body[0];
        return head.x === this.position.x && head.y === this.position.y;
    }
}