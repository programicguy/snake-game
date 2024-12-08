# Snake Game Documentation

This documentation outlines the features, improvements, and technical structure of the customizable Snake Game. The game is designed for an engaging and secure user experience with enhanced controls, UI, and authentication flow.

---

## **Features**

### **Customizable Settings**
- **Difficulty Levels**: Choose from Easy, Normal, and Hard, which dynamically adjust game speed and scoring.
- **Snake Customization**: 
  - Change the snake's color using a real-time color picker.
  - Automatic adjustment of the snake's head color for better visibility.
- **Persistent Settings**: User settings are saved in `localStorage` and automatically applied on the next visit.

### **Improved Controls**
- **Pause Functionality**: Pause and resume the game using the Space bar.
- **Responsive Keyboard Handling**: Enhanced responsiveness for smooth gameplay.
- **Browser Compatibility**: Prevents default browser scrolling when using arrow keys for navigation.

### **Enhanced UI**
- **Settings Panel**: Includes a toggle button for easy access to game settings.
- **Modern Styling**: Clean and intuitive design for an improved user experience.

---

## **Technical Structure**

### **Code Organization**
- **Modular Design**: 
  - `settings.js`: Manages settings-related logic.
  - `input-handler.js`: Handles keyboard controls and input responsiveness.
  - `ui.js`: Manages the settings interface and user interactions.
- **Enhanced Rendering**: Renderer supports theming for a polished visual experience.

### **Game Improvements**
- **Dynamic Scoring**: Difficulty-based score multipliers.
- **Smooth Animations**: Refined transitions and controls for fluid gameplay.
- **Pause/Resume**: Seamless pausing functionality for enhanced player control.

---

## **Authentication Flow**

### **User Login**
- Users must log in with their **User ID** to access the game.
- The **User ID** is validated against a backend API.
- The game starts only upon successful authentication.

### **New Modules**
- **`ApiService`**: Handles secure communication with the backend API.
- **`AuthService`**: Manages the authentication state and related logic.
- **`AuthUI`**: Provides the user interface for the authentication process.
- **`GameManager`**: Oversees game initialization and integrates authentication flow.

### **Security Features**
- Game elements remain hidden until authentication is completed.
- Secure API handling and error management for failed authentication attempts.
- Error messages guide users when invalid credentials are entered.

---

## **User Experience**

### **Login Process**
1. Enter your **User ID** in the login screen.
2. On successful validation, the game starts automatically.
3. If validation fails, an error message is displayed.

### **Additional Details**
- Smooth transitions between the login and game interface.
- Clear and user-friendly error handling.

---

## **Setup Instructions**

### **Downloading and Running the Game Locally**
Follow these steps to set up and run the game on your local machine:

1. **Clone the Repository**
   ```bash
   git clone https://github.com/programicguy/snake-game.git
   ```
2. **Navigate to the Project Directory**
   ```bash
   cd snake-game
   ```
3. **Install Dependencies**
   Make sure you have [Node.js](https://nodejs.org) installed. Then, run:
   ```bash
   npm install
   ```
4. **Start the Development Server**
   ```bash
   npm run dev
   ```
5. **Access the Game**
   Open your browser and go to [http://localhost:3000](http://localhost:3000).

---

## **Configuration**

- Update the `API_BASE_URL` in `api.js` with your backend API endpoint.
  - The endpoint must return a response in the format: 
    ```json
    { "isValid": boolean }
    ```
