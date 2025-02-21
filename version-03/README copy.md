# Where in the World?

A country explorer web app featuring secure email/password authentication, user-specific saved country data, and a clean, responsive UI.

## Table of Contents

- [Description](#description)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Usage](#usage)
- [Authentication & Database](#authentication--database)
- [Error Handling & UX](#error-handling--ux)
- [Future Enhancements](#future-enhancements)
- [License](#license)

## Description

"Where in the World?" is a web application that lets users explore countries via data from the REST Countries API. Users can sign up or log in via a secure email/password flow using the Firebase SDK. Once authenticated, users can save their favorite countries, which are persisted in Firebase’s Realtime Database for future sessions.

## Features

- **User Authentication:** Secure sign up and login with Firebase Authentication.
- **Saved Countries:** Each user can save and retrieve their selected countries.
- **Responsive UI:** Built with React, Vite, and Chakra UI.
- **Real-Time Data:** Integration with the REST Countries API for up-to-date country data.
- **User Feedback:** Clear, context-sensitive UX messages and error handling.

## Tech Stack

- **Frontend:** React (with Vite), Chakra UI
- **Backend & Data:** Firebase (Authentication & Realtime Database), REST Countries API
- **Future:** Transition to a custom SQL API layer and advanced local storage mechanisms.

## Installation

1. **Clone The Repository:**
   ```bash
   git clone <repository-url>
2. **Install Dependencies:**
   ```bash
   git clone <repository-url>
3. **Configure Environment Variables:**
   ```bash
   git clone <repository-url>
4. **Run The Application**
    ```bash
    npm run dev

## Usage

- **Authentication:** Users can sign up or log in to access personalized features.
- **Saving Countries:** After selecting a country, logged-in users can save it to their profile. These saved countries are retrieved on subsequent logins.
- **Navigation:** The app provides seamless navigation between the homepage, country details, and saved countries page.

## Authentication & Database

- **Firebase Authentication:** Utilizes email/password authentication. Upon sign-in, authentication tokens are securely stored in the browser (IndexedDB), enabling persistent user sessions.
- **Realtime Database:** User profiles and saved country data are stored under unique user IDs, ensuring that each user's data is isolated and retrievable across sessions.

## Error Handling & UX

- **User-Centric Error Messages:** Only display essential error messages (e.g., password validation, email already in use) to the user.
- **Console Logging:** Detailed error logs and debugging information are kept in the console for developers.
- **Feedback Mechanisms:** Clear success messages and prompts enhance the overall user experience.

## Future Enhancements

- **Custom SQL API Layer:** Plan to migrate from Firebase’s NoSQL to a more robust SQL-based data management system.
- **Enhanced Local Storage:** Improvements to data caching and offline capabilities.
- **Expanded Features:** Additional user personalization and advanced country search/filtering options.

## License

This project is licensed under the [MIT License](LICENSE).
