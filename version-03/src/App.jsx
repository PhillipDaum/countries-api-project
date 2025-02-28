import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import HomePage from "./pages/HomePage";
import SavedCountries from "./pages/SavedCountries";
import CountryPage from "./pages/CountryPage";
import { Box } from "@chakra-ui/react";
import { Toaster, toaster } from "./components/ui/toaster"
import countriesData from "../data.js";
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth"
import SigninPage from "./pages/SigninPage";

// Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  databaseURL: import.meta.env.VITE_FIREBASE_DATABASE_URL,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
};

function App() {
  const [countries, setCountries] = useState([]);
  const [isSignedIn, setIsSignedIn] = useState(false);

  // Firebase
  const app = initializeApp(firebaseConfig);
  const database = getDatabase(app);
  const auth = getAuth(app)
  // Checks authentication status
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsSignedIn(true);
        console.log("user signed in", user.email);
      } else {
        setIsSignedIn(false);
        console.log("user is signed out");
      }
    });
    // cleanup function to prevent memory leaks
    // ask teachers about this
    return () => unsubscribe();
  }, [auth])
  // Sign out
  const signOutUser = async () => {
    try {
      await signOut(auth);
      toaster.create({
        description: "Sign out successful, come back soon!",
        type: "info"
      })
      console.log("they done signed out")
    } catch(error) {
      console.error(error)
    }
  }

  // Countries API call
  const fetchCountryData = async () => {
    try {
      const response = await fetch("https://restcountries.com/v3.1/all");
      const data = await response.json();
      // sorted alphabetically by common name
      const sorted = data.sort((a, b) =>
        a.name.common.localeCompare(b.name.common)
      );
      setCountries(sorted);
    } catch (error) {
      console.error("error fetching data from restcountries.com", error);
      setCountries(countriesData);
    }
  };
  useEffect(() => {
    fetchCountryData();
  }, []);

  return (
    <>
      <Header isSignedIn={isSignedIn} signOutUser={signOutUser} />
      <Box bg="bg.muted">
        <Routes>
          <Route path="/" element={<HomePage countries={countries} database={database} />} />
          <Route
            path="/saved-countries"
            element={<SavedCountries countries={countries} isSignedIn={isSignedIn} database={database} auth={auth} onAuthStateChanged={onAuthStateChanged}/>}
          />
          <Route path="/signin" element={<SigninPage auth={auth}/>}/>
          <Route
            path="/country-page/:oneCountry"
            element={<CountryPage countries={countries} database={database} auth={auth}/>}
          />
        </Routes>
      </Box>
      <Toaster />
    </>
  );
}

export default App;
