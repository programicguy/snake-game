import { GAME_CONFIG } from './config.js';

export class Renderer {
    constructor(canvas, settings) {
        this.canvas = canvas;
        this.settings = settings;
        this.ctx = canvas.getContext('2d');
        this.canvas.width = GAME_CONFIG.CANVAS_SIZE;
        this.canvas.height = GAME_CONFIG.CANVAS_SIZE;
        this.gradientCache = new Map();
    }

    clear() {
        // Create grid pattern with subtle 3D effect
        this.ctx.fillStyle = this.settings.current.theme.background;
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Draw grid lines with depth effect
        this.ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
        this.ctx.lineWidth = 0.5;
        
        for (let i = 0; i <= GAME_CONFIG.GRID_SIZE; i++) {
            const x = i * GAME_CONFIG.CELL_SIZE;
            const y = i * GAME_CONFIG.CELL_SIZE;
            
            // Horizontal lines
            this.ctx.beginPath();
            this.ctx.moveTo(0, y);
            this.ctx.lineTo(this.canvas.width, y);
            this.ctx.stroke();
            
            // Vertical lines
            this.ctx.beginPath();
            this.ctx.moveTo(x, 0);
            this.ctx.lineTo(x, this.canvas.height);
            this.ctx.stroke();
        }
    }

    createGradient(color) {
        if (this.gradientCache.has(color)) {
            return this.gradientCache.get(color);
        }

        const gradient = this.ctx.createLinearGradient(0, 0, GAME_CONFIG.CELL_SIZE, GAME_CONFIG.CELL_SIZE);
        gradient.addColorStop(0, this.lightenColor(color, 20));
        gradient.addColorStop(1, this.darkenColor(color, 20));
        this.gradientCache.set(color, gradient);
        return gradient;
    }

    lightenColor(color, percent) {
        return this.adjustColor(color, percent);
    }

    darkenColor(color, percent) {
        return this.adjustColor(color, -percent);
    }

    adjustColor(color, percent) {
        const num = parseInt(color.replace('#', ''), 16);
        const amt = Math.round(2.55 * percent);
        const R = Math.min(255, Math.max(0, (num >> 16) + amt));
        const G = Math.min(255, Math.max(0, (num >> 8 & 0x00FF) + amt));
        const B = Math.min(255, Math.max(0, (num & 0x0000FF) + amt));
        return '#' + (0x1000000 + R * 0x10000 + G * 0x100 + B).toString(16).slice(1);
    }

    drawSnakeSegment(x, y, color, isHead = false) {
        const size = GAME_CONFIG.CELL_SIZE - 2;
        const offset = 1;

        // Draw shadow
        this.ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
        this.ctx.fillRect(
            x * GAME_CONFIG.CELL_SIZE + offset + 2,
            y * GAME_CONFIG.CELL_SIZE + offset + 2,
            size,
            size
        );

        // Draw main segment with gradient
        this.ctx.fillStyle = this.createGradient(color);
        this.ctx.fillRect(
            x * GAME_CONFIG.CELL_SIZE + offset,
            y * GAME_CONFIG.CELL_SIZE + offset,
            size,
            size
        );

        if (isHead) {
            // Add eyes
            const eyeSize = size / 8;
            const eyeOffset = size / 4;
            this.ctx.fillStyle = '#FFFFFF';
            this.ctx.fillRect(
                x * GAME_CONFIG.CELL_SIZE + eyeOffset + offset,
                y * GAME_CONFIG.CELL_SIZE + eyeOffset + offset,
                eyeSize,
                eyeSize
            );
            this.ctx.fillRect(
                x * GAME_CONFIG.CELL_SIZE + size - eyeOffset - eyeSize + offset,
                y * GAME_CONFIG.CELL_SIZE + eyeOffset + offset,
                eyeSize,
                eyeSize
            );
        }
    }

    drawSnake(snake) {
        snake.body.forEach((segment, index) => {
            const color = index === 0 ? 
                this.settings.current.theme.snakeHead : 
                this.settings.current.theme.snake;
            this.drawSnakeSegment(segment.x, segment.y, color, index === 0);
        });
    }

    drawFood(food) {
        const x = food.position.x;
        const y = food.position.y;
        const size = GAME_CONFIG.CELL_SIZE - 2;
        const offset = 1;

        // Draw shadow
        this.ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
        this.ctx.beginPath();
        this.ctx.arc(
            x * GAME_CONFIG.CELL_SIZE + offset + size/2 + 2,
            y * GAME_CONFIG.CELL_SIZE + offset + size/2 + 2,
            size/2,
            0,
            Math.PI * 2
        );
        this.ctx.fill();

        // Draw food with gradient
        const gradient = this.ctx.createRadialGradient(
            x * GAME_CONFIG.CELL_SIZE + offset + size/2,
            y * GAME_CONFIG.CELL_SIZE + offset + size/2,
            0,
            x * GAME_CONFIG.CELL_SIZE + offset + size/2,
            y * GAME_CONFIG.CELL_SIZE + offset + size/2,
            size/2
        );
        gradient.addColorStop(0, this.lightenColor(this.settings.current.theme.food, 30));
        gradient.addColorStop(1, this.darkenColor(this.settings.current.theme.food, 20));

        this.ctx.fillStyle = gradient;
        this.ctx.beginPath();
        this.ctx.arc(
            x * GAME_CONFIG.CELL_SIZE + offset + size/2,
            y * GAME_CONFIG.CELL_SIZE + offset + size/2,
            size/2,
            0,
            Math.PI * 2
        );
        this.ctx.fill();

        // Add shine effect
        this.ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
        this.ctx.beginPath();
        this.ctx.arc(
            x * GAME_CONFIG.CELL_SIZE + offset + size/3,
            y * GAME_CONFIG.CELL_SIZE + offset + size/3,
            size/6,
            0,
            Math.PI * 2
        );
        this.ctx.fill();
    }

    updateColors() {
        this.canvas.style.borderColor = this.settings.current.theme.border;
        this.gradientCache.clear();
    }
}