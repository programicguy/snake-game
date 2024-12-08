import { GAME_CONFIG } from './config.js';

export class Snake {
    constructor() {
        this.reset();
    }

    reset() {
        const middle = Math.floor(GAME_CONFIG.GRID_SIZE / 2);
        this.body = [];
        for (let i = 0; i < GAME_CONFIG.INITIAL_SNAKE_LENGTH; i++) {
            this.body.push({ x: middle, y: middle + i });
        }
        this.direction = { x: 0, y: -1 };
        this.nextDirection = { x: 0, y: -1 };
        this.directionChanged = false;
    }

    update() {
        // Only update direction if it hasn't been changed this frame
        if (!this.directionChanged) {
            this.direction = { ...this.nextDirection };
        }
        this.directionChanged = false;

        const head = { ...this.body[0] };
        head.x += this.direction.x;
        head.y += this.direction.y;

        // Wrap around the edges
        head.x = (head.x + GAME_CONFIG.GRID_SIZE) % GAME_CONFIG.GRID_SIZE;
        head.y = (head.y + GAME_CONFIG.GRID_SIZE) % GAME_CONFIG.GRID_SIZE;

        this.body.unshift(head);
    }

    grow() {
        // Keep the last segment (don't pop)
    }

    shrink() {
        this.body.pop();
    }

    setDirection(direction) {
        // Prevent 180-degree turns
        const isOpposite = (
            (direction.x === 1 && this.direction.x === -1) ||
            (direction.x === -1 && this.direction.x === 1) ||
            (direction.y === 1 && this.direction.y === -1) ||
            (direction.y === -1 && this.direction.y === 1)
        );

        if (!isOpposite && !this.directionChanged) {
            this.nextDirection = direction;
            this.directionChanged = true;
        }
    }

    checkCollision() {
        const head = this.body[0];
        return this.body.slice(1).some(segment => 
            segment.x === head.x && segment.y === head.y
        );
    }
}