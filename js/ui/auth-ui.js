export class AuthUI {
    constructor(onAuthenticated) {
        this.onAuthenticated = onAuthenticated;
        this.container = document.querySelector('.game-container');
        this.setupAuthUI();
    }

    setupAuthUI() {
        const authPanel = document.createElement('div');
        authPanel.className = 'auth-panel';
        authPanel.innerHTML = `
            <div class="auth-content">
                <h2>Welcome to Snake Game</h2>
                <div class="auth-form">
                    <input type="text" id="userId" placeholder="Enter your User ID" class="auth-input">
                    <button id="loginBtn" class="auth-button">Start Game</button>
                </div>
                <p class="test-hint">Test ID: 1234</p>
                <p id="authError" class="auth-error hidden">Invalid user ID. Please try again.</p>
            </div>
        `;
        
        this.container.appendChild(authPanel);
        this.setupEventListeners();
    }

    setupEventListeners() {
        const loginBtn = document.getElementById('loginBtn');
        const userIdInput = document.getElementById('userId');

        loginBtn.addEventListener('click', () => {
            const userId = userIdInput.value.trim();
            if (userId) {
                this.onAuthenticated(userId);
            }
        });

        userIdInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                const userId = userIdInput.value.trim();
                if (userId) {
                    this.onAuthenticated(userId);
                }
            }
        });
    }

    showError() {
        const errorElement = document.getElementById('authError');
        errorElement.classList.remove('hidden');
    }

    hide() {
        const authPanel = document.querySelector('.auth-panel');
        authPanel.style.display = 'none';
    }

    show() {
        const authPanel = document.querySelector('.auth-panel');
        authPanel.style.display = 'block';
        document.getElementById('authError').classList.add('hidden');
        document.getElementById('userId').value = '';
    }
}