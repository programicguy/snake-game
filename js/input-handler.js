export class InputHandler {
    constructor(settings) {
        this.settings = settings;
        this.pressedKeys = new Set();
        this.handlers = new Map();
        this.setupEventListeners();
    }

    setupEventListeners() {
        window.addEventListener('keydown', (event) => {
            if (this.isGameControl(event.code)) {
                event.preventDefault();
                if (!this.pressedKeys.has(event.code)) {
                    this.pressedKeys.add(event.code);
                    this.executeHandlers(event);
                }
            }
        });

        window.addEventListener('keyup', (event) => {
            this.pressedKeys.delete(event.code);
        });

        // Prevent scrolling with arrow keys
        window.addEventListener('scroll', (event) => {
            if (Array.from(this.pressedKeys).some(key => this.isGameControl(key))) {
                event.preventDefault();
            }
        }, { passive: false });
    }

    isGameControl(code) {
        const { controls } = this.settings.current;
        return Object.values(controls).includes(code);
    }

    on(action, callback) {
        this.handlers.set(action, callback);
    }

    executeHandlers(event) {
        const { controls } = this.settings.current;
        
        switch (event.code) {
            case controls.up:
                this.handlers.get('up')?.();
                break;
            case controls.down:
                this.handlers.get('down')?.();
                break;
            case controls.left:
                this.handlers.get('left')?.();
                break;
            case controls.right:
                this.handlers.get('right')?.();
                break;
            case controls.pause:
                this.handlers.get('pause')?.();
                break;
        }
    }
}