import { Game } from './game.js';
import { AuthService } from './services/auth.js';
import { AuthUI } from './ui/auth-ui.js';

export class GameManager {
    constructor() {
        this.game = null;
        this.authService = new AuthService();
        this.authUI = new AuthUI(this.handleAuthentication.bind(this));
        this.canvas = document.getElementById('gameCanvas');
        this.hideGameElements();
    }

    async handleAuthentication(userId) {
        const isAuthenticated = await this.authService.authenticate(userId);
        
        if (isAuthenticated) {
            this.startGame();
        } else {
            this.authUI.showError();
        }
    }

    startGame() {
        this.authUI.hide();
        this.showGameElements();
        if (!this.game) {
            this.game = new Game(this.canvas);
        }
        this.game.start();
    }

    hideGameElements() {
        this.canvas.style.display = 'none';
        document.querySelector('.score').style.display = 'none';
    }

    showGameElements() {
        this.canvas.style.display = 'block';
        document.querySelector('.score').style.display = 'block';
    }
}