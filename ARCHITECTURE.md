# Project Architecture and Flow

This document provides an overview of the project's architecture, folder structure, and the main application flow.

## 1. Project Overview

This is a web-based email client application built with React and Vite. It uses Firebase for backend services, including user authentication (Firebase Auth) and data storage (Firestore). The application allows users to sign up, log in, send, and view emails. State management is handled by Zustand.

## 2. Core Technologies

-   **Frontend:** React, Vite
-   **Styling:** React Bootstrap, custom CSS (`pages.css`)
-   **Routing:** React Router DOM
-   **State Management:** Zustand
-   **Backend:** Firebase (Authentication and Firestore), Netlify Functions
-   **AI Services:** Google Gemini API

## 3. Folder Structure

The `src` directory is organized as follows:

-   `src/api/`: Contains the logic for interacting with the Firestore database (e.g., `mailApi.js`).
-   `src/assets/`: Holds global state management logic (`store.js`) and static assets.
-   `src/components/`: (Not explicitly shown, but a standard convention) Would contain reusable UI components.
-   `src/pages/`: Contains the main page components of the application, such as `Home.jsx`, `Login.jsx`, `Inbox.jsx`, etc.
-   `src/projectLayout/`: Contains components that manage the overall application layout and routing logic, like `AppLayout.jsx`, `Router.jsx`, and authentication gates.
-   `src/firebase.js`: Initializes and configures the Firebase application.
-   `src/main.jsx`: The main entry point of the React application.

-   `netlify/functions/`: Contains serverless functions deployed on Netlify.
    -   `summarizeEmail.js`: An endpoint that takes email content and uses the Gemini API to generate a summary.
    -   `lib/`: Contains helper modules for the serverless functions.
        -   `geminiService.js`: A service that interacts with the Google Gemini API.
        -   `geminiPrompt.js`: A module to construct the prompt for the Gemini API.

## 4. Architecture

The application follows a component-based architecture, which is standard for React applications.

-   **Entry Point:** `main.jsx` renders the root `App` component.
-   **Root Component:** `App.jsx` wraps the main `Router` component within an `AppShell`.
-   **Routing:** `projectLayout/Router.jsx` defines all the application's routes using `react-router-dom`. It separates public routes (like login/signup) from private/authenticated routes.
-   **Authentication Gates:**
    -   `PublicGate.jsx`: Protects public routes. If a user is logged in, it redirects them from the login/signup pages to the main application (`/`).
    -   `AuthGate.jsx`: Protects private routes. If a user is not logged in, it redirects them to the `/login` page.
-   **Layout:** `AppLayout.jsx` defines the main visual structure for the authenticated part of the application. It includes a `SideBar` and a main content area where the different pages are rendered via React Router's `<Outlet />`.
-   **State Management:** `assets/store.js` uses Zustand to create a global store. This store manages user authentication state (`user`, `loading`), the visibility of the sidebar (`showSideBar`), and provides actions to log out and manage the authentication state listener.
-   **API Layer:** `api/mailApi.js` abstracts the Firestore logic. It provides functions to `sendMail` and subscribe to real-time updates for the inbox (`subscribeInbox`) and sent items (`subscribeSent`).
-   **Serverless Functions:** The `netlify/functions` directory contains serverless functions that handle specific backend tasks.
    -   `summarizeEmail`: This function is an API endpoint that receives email content, constructs a prompt, and then calls the Google Gemini API (via the `geminiService.js`) to generate a concise summary of the email. This allows the client-side to offload the AI processing to the backend.

## 5. Main Application Flow

### 5.1. Authentication Flow

1.  **Initialization:** When the application loads, `assets/store.js`'s `initAuthListener` function is called. This sets up an `onAuthStateChanged` listener from Firebase Auth.
2.  **Loading State:** While the listener is determining the user's authentication status, the `loading` state in the Zustand store is `true`. Components like `AuthGate` and `PublicGate` show a spinner.
3.  **User Not Logged In:**
    -   The `user` object in the store is `null`.
    -   The user can only access routes protected by `PublicGate` (`/login`, `/signup`).
    -   Attempting to access a private route will result in a redirect to `/login` via `AuthGate`.
4.  **User Logged In:**
    -   The `user` object in the store is populated with the user's data from Firebase.
    -   The user is redirected from public routes to the main application (`/`) via `PublicGate`.
    -   The user can access all the private routes within the `AppLayout`.

### 5.2. Core Email Flow

1.  **Login:** The user logs in via the `/login` page. Upon successful authentication, Firebase's auth state changes, and the user is redirected to the application's home page (`/`).
2.  **Viewing Emails:**
    -   The `Inbox.jsx` and `Sent.jsx` pages use the `subscribeInbox` and `subscribeSent` functions from `mailApi.js` respectively.
    -   These functions set up real-time listeners to the user's "inbox" and "sent" collections in Firestore.
    -   The UI automatically updates whenever a new email is received or sent.
3.  **Summarizing Emails:**
    -   From the inbox, the user can trigger an AI-powered summary for a selected email.
    -   The client-side calls the `/netlify/functions/summarizeEmail` endpoint, sending the email's content.
    -   The serverless function processes the content and returns a summary, which is then displayed in the UI.
4.  **Composing and Sending Emails:**
    -   The user navigates to the `/compose` route.
    -   The `Compose.jsx` component renders a form to enter the recipient, subject, and body.
    -   Upon submission, the `sendMail` function from `mailApi.js` is called.
    -   `sendMail` creates a batch write to Firestore, adding the new email document to both the sender's "sent" collection and the recipient's "inbox" collection, ensuring both parties have a copy of the email.
