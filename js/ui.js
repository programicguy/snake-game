export class UI {
    constructor(game, settings) {
        this.game = game;
        this.settings = settings;
        this.setupUI();
    }

    setupUI() {
        const container = document.querySelector('.game-container');
        
        // Create settings panel
        const settingsPanel = document.createElement('div');
        settingsPanel.className = 'settings-panel';
        settingsPanel.innerHTML = `
            <button id="settingsToggle">⚙️ Settings</button>
            <div class="settings-content hidden">
                <h3>Game Settings</h3>
                <div class="setting-group">
                    <label>Difficulty:</label>
                    <select id="difficulty">
                        <option value="easy">Easy</option>
                        <option value="normal" selected>Normal</option>
                        <option value="hard">Hard</option>
                    </select>
                </div>
                <div class="setting-group">
                    <label>Theme:</label>
                    <input type="color" id="snakeColor" value="${this.settings.current.theme.snake}">
                    <label>Snake Color</label>
                </div>
                <button id="applySettings">Apply Settings</button>
            </div>
        `;
        
        container.appendChild(settingsPanel);

        // Add event listeners
        const toggleBtn = document.getElementById('settingsToggle');
        const content = settingsPanel.querySelector('.settings-content');
        const applyBtn = document.getElementById('applySettings');

        toggleBtn.addEventListener('click', () => {
            content.classList.toggle('hidden');
        });

        applyBtn.addEventListener('click', () => {
            this.applySettings();
            content.classList.add('hidden');
        });
    }

    applySettings() {
        const difficulty = document.getElementById('difficulty').value;
        const snakeColor = document.getElementById('snakeColor').value;

        this.settings.update({
            difficulty,
            theme: {
                ...this.settings.current.theme,
                snake: snakeColor,
                snakeHead: this.adjustColor(snakeColor, -20)
            }
        });

        this.game.applySettings();
    }

    adjustColor(hex, percent) {
        const num = parseInt(hex.replace('#', ''), 16);
        const amt = Math.round(2.55 * percent);
        const R = (num >> 16) + amt;
        const G = (num >> 8 & 0x00FF) + amt;
        const B = (num & 0x0000FF) + amt;
        return '#' + (0x1000000 +
            (R < 255 ? (R < 1 ? 0 : R) : 255) * 0x10000 +
            (G < 255 ? (G < 1 ? 0 : G) : 255) * 0x100 +
            (B < 255 ? (B < 1 ? 0 : B) : 255)
        ).toString(16).slice(1);
    }
}