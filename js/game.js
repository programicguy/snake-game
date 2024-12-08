import { GAME_CONFIG } from './config.js';
import { Snake } from './snake.js';
import { Food } from './food.js';
import { Renderer } from './renderer.js';
import { Settings } from './settings.js';
import { InputHandler } from './input-handler.js';
import { UI } from './ui.js';

export class Game {
    constructor(canvas) {
        this.settings = new Settings();
        this.snake = new Snake();
        this.food = new Food();
        this.renderer = new Renderer(canvas, this.settings);
        this.input = new InputHandler(this.settings);
        this.ui = new UI(this, this.settings);
        
        this.score = 0;
        this.isRunning = false;
        this.isPaused = false;
        
        this.setupInputHandlers();
    }

    setupInputHandlers() {
        this.input.on('up', () => this.snake.setDirection({ x: 0, y: -1 }));
        this.input.on('down', () => this.snake.setDirection({ x: 0, y: 1 }));
        this.input.on('left', () => this.snake.setDirection({ x: -1, y: 0 }));
        this.input.on('right', () => this.snake.setDirection({ x: 1, y: 0 }));
        this.input.on('pause', () => this.togglePause());
    }

    togglePause() {
        this.isPaused = !this.isPaused;
        if (!this.isPaused) {
            this.gameLoop();
        }
    }

    start() {
        if (!this.isRunning) {
            this.isRunning = true;
            this.gameLoop();
        }
    }

    reset() {
        this.snake.reset();
        this.food.spawn();
        this.score = 0;
        this.isPaused = false;
        document.getElementById('scoreValue').textContent = this.score;
    }

    update() {
        if (!this.isRunning || this.isPaused) return;

        this.snake.update();

        if (this.food.isEatenBy(this.snake)) {
            const multiplier = this.settings.current.difficultySettings[this.settings.current.difficulty].scoreMultiplier;
            this.score += Math.floor(10 * multiplier);
            document.getElementById('scoreValue').textContent = this.score;
            this.snake.grow();
            this.food.spawn();
        } else {
            this.snake.shrink();
        }

        if (this.snake.checkCollision()) {
            this.isRunning = false;
            alert(`Game Over! Score: ${this.score}`);
            this.reset();
            this.start();
        }
    }

    draw() {
        this.renderer.clear();
        this.renderer.drawSnake(this.snake);
        this.renderer.drawFood(this.food);
    }

    gameLoop() {
        this.update();
        this.draw();
        if (this.isRunning && !this.isPaused) {
            const speed = this.settings.current.difficultySettings[this.settings.current.difficulty].speed;
            setTimeout(() => requestAnimationFrame(() => this.gameLoop()), speed);
        }
    }

    applySettings() {
        this.renderer.updateColors();
    }
}