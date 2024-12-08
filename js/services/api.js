import axios from 'axios';

const API_BASE_URL = 'https://fakestoreapi.com/'; // Replace with your actual API endpoint

export class ApiService {
    static async validateUser(userId) {
        try {
            const response = await axios.get(`${API_BASE_URL}/products/${userId}`);
            return response.data.isValid;
        } catch (error) {
            console.error('Error validating user:', error);
            return false;
        }
    }
}