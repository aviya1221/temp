# Gemini Mail - React Email Application

This is a responsive email application built with React, simulating a modern mail client. The application is architected with a serverless backend using Firebase, which handles both user authentication and the primary data storage through Firestore. It includes features like an inbox, sent items, a compose screen, and AI-powered email summarization via the Google Gemini API.

## Features

- **User Authentication**: Secure sign-up and login functionality handled by Firebase Authentication.
- **Real-time Mailbox**: View your inbox and sent items with real-time updates from Firestore.
- **Compose and Send**: A simple and intuitive interface for composing and sending emails.
- **AI-Powered Summarization**: Emails can be summarized using a serverless function that calls the Google Gemini API.
- **Responsive Design**: A mobile-friendly layout built with React-Bootstrap that works on any device.
- **Client-Side State Management**: Efficient and lightweight state management using Zustand.
- **Serverless Architecture**: The backend logic is handled by Netlify Functions, and the database is managed by Google Firestore.

## Technologies Used

- **Frontend**:
  - React
  - Vite
  - React-Bootstrap
  - React Router
  - Zustand (for state management)
  - Day.js (for date formatting)

- **Backend & Database**:
  - **Firebase**:
    - Firebase Authentication
    - Firestore (as the database)
  - **Netlify**:
    - Serverless Functions (for the Gemini API integration)
    - Hosting

- **AI**:
  - Google Gemini API

## Getting Started

Follow these instructions to get a local copy of the project up and running.

### Prerequisites

- Node.js (v18 or later)
- npm (or a similar package manager)
- A Firebase project with Authentication and Firestore enabled.
- A Google Gemini API key.
- [Netlify CLI](https://docs.netlify.com/cli/get-started/)

### Installation & Setup

1.  **Clone the repository:**
    ```sh
    git clone <your-repository-url>
    cd emailProj
    ```

2.  **Install dependencies:**
    ```sh
    npm install
    ```

3.  **Set up Firebase:**
    - Create a Firebase project in the [Firebase Console](https://console.firebase.google.com/).
    - Enable Email/Password authentication in the "Authentication" section.
    - Create a Firestore database in the "Firestore" section.
    - In your project settings, find your Firebase configuration object.
    - Replace the placeholder configuration in `src/firebase.js` with your own project's keys.

    ```javascript
    // src/firebase.js

    // Your Firebase configuration
    const firebaseConfig = {
      apiKey: "YOUR_API_KEY",
      authDomain: "YOUR_AUTH_DOMAIN",
      projectId: "YOUR_PROJECT_ID",
      storageBucket: "YOUR_STORAGE_BUCKET",
      messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
      appId: "YOUR_APP_ID",
      measurementId: "YOUR_MEASUREMENT_ID"
    };
    ```

4.  **Set up Environment Variables for Netlify:**
    - Create a `.env` file in the root of the project.
    - Add your Google Gemini API key to this file. This key will be used by the `summarizeEmail` Netlify function.
    ```
    GEMINI_API_KEY=your_google_gemini_api_key
    ```

5.  **Run the development server:**
    The project uses the Netlify CLI to run the frontend and the serverless functions together.
    ```sh
    npm run dev
    ```
    This will start the Vite development server and the Netlify functions emulator. Your application will be available at `http://localhost:8888`.

## Deployment

This project is configured for easy deployment with Netlify.

1.  Connect your GitHub repository to a new site on Netlify.
2.  Configure the build settings:
    - **Build command**: `npm run build` or `vite build`
    - **Publish directory**: `dist`
3.  Add your `GEMINI_API_KEY` as an environment variable in the Netlify site settings.
4.  Deploy! Netlify will automatically build your site and deploy the serverless functions.