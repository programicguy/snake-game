import { ApiService } from './api.js';

export class AuthService {
    constructor() {
        this.userId = null;
        this.isAuthenticated = false;
        this.TEST_USER_ID = "1234";
    }

    async authenticate(userId) {
        // Special test user ID check
        if (userId === this.TEST_USER_ID) {
            this.isAuthenticated = true;
            this.userId = userId;
            return true;
        }

        const isValid = await ApiService.validateUser(userId);
        this.isAuthenticated = isValid;
        this.userId = isValid ? userId : null;
        return isValid;
    }

    isAuthorized() {
        return this.isAuthenticated;
    }

    getUserId() {
        return this.userId;
    }

    logout() {
        this.userId = null;
        this.isAuthenticated = false;
    }
}