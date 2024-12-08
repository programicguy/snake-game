export const DEFAULT_SETTINGS = {
    controls: {
        up: 'ArrowUp',
        down: 'ArrowDown',
        left: 'ArrowLeft',
        right: 'ArrowRight',
        pause: 'Space'
    },
    difficulty: 'normal',
    difficultySettings: {
        easy: {
            speed: 200,
            scoreMultiplier: 0.8
        },
        normal: {
            speed: 150,
            scoreMultiplier: 1
        },
        hard: {
            speed: 100,
            scoreMultiplier: 1.5
        }
    },
    theme: {
        snake: '#4CAF50',
        snakeHead: '#2E7D32',
        food: '#FF5252',
        background: '#000000',
        border: '#333333'
    }
};

export class Settings {
    constructor() {
        this.load();
    }

    load() {
        const savedSettings = localStorage.getItem('snakeGameSettings');
        this.current = savedSettings ? 
            { ...DEFAULT_SETTINGS, ...JSON.parse(savedSettings) } : 
            { ...DEFAULT_SETTINGS };
    }

    save() {
        localStorage.setItem('snakeGameSettings', JSON.stringify(this.current));
    }

    update(newSettings) {
        this.current = { ...this.current, ...newSettings };
        this.save();
    }
}