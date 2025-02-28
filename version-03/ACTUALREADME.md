# Where in the World?

## Description
"Where in the World?" is a web application that enables users to explore detailed information about countries worldwide. Authenticated users can save their favorite countries for easy access in future sessions.

## Features
- **User Authentication:** Secure email/password registration and login using Firebase Authentication.
- **Save Favorite Countries:** Authenticated users can bookmark countries, with data persisted in Firebase Realtime Database.
- **Responsive UI:** Built with React, Vite, and Chakra UI for a seamless user experience across devices.
- **Real-Time Data:** Fetches up-to-date country information from the REST Countries API.
- **User Feedback:** Provides clear messages for actions and errors to enhance usability.


## Tech Stack
<!-- where does netlify go?  -->
- **Frontend:** [React](https://react.dev/) (bootstrapped with [Vite](https://vite.dev/)), [Chakra UI](https://chakra-ui.com/)
- **Backend & Data:** [Firebase Authentication](https://firebase.google.com/docs/auth), [Firebase Realtime Database](https://firebase.google.com/docs/database), [REST Countries API](https://restcountries.com/)

## Installation
**Prerequisites**: This requires [Node.js](https://nodejs.org/) in order to run locally. 
<!-- fix this add repo also its a subfolder!-->
1. **Clone The Repository:**
   ```bash
   git clone <repository-url>
   cd <repository-directory>
2. **Install Dependencies:**   
   ```bash
   npm install
3. **Set up Firebase**
- Create a project in the [Firebase Console](https://console.firebase.google.com/)
- Enable Realtime Database
- Enable Email/Password Authentication
4. **Configure Environment Variables:**
- Create a `.env` file in the root directory. 
- Add your Firebase configuration details:
   ```bash   
5. **Run The Application**
    ```bash
    npm run dev

## Attribution
This project began from a Frontend Mentor design modfied by AnnieCannons.

## License
This project is licensed under the MIT license. 
