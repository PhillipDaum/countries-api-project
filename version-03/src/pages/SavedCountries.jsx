/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import {
  Grid,
  For,
  Heading,
  Button,
  Fieldset,
  Input,
  Stack,
  Textarea,
  Text,
  Box,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { Field } from "../components/ui/field";
import CountryCard from "../components/CountryCard";
import { ref, set, child, get } from "firebase/database";

// It Works!!
/// there is now the same issue with the saved countries showing up late
// and now doesn't say welcome name. 


function SavedCountries({ countries, database, auth, onAuthStateChanged }) {
  const { register, handleSubmit } = useForm();
  const [userProfile, setUserProfile] = useState(null);
  const [userSavedCountries, setUserSavedCountries] = useState(null);

  const onSubmit = (data) => {
    if (!userProfile) {
      set(ref(database, "users/" + auth.currentUser.uid), {
        // add numbering system later
        fullName: data.fullName,
        country: data.country,
        email: data.email,
        bio: data.bio,
      });
      setUserProfile(data);
    }
  };

  // INTERACT WITH DATABASE
  // change numbering later
  const getDatabseProfile = async () => {
    const dbRef = ref(database);
    try {
      await get(child(dbRef, `users/${auth.currentUser.uid}`)).then((snapshot) => {
        if (snapshot.exists()) {
          setUserProfile(snapshot.val());
        } else {
          console.log("no data");
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log("User signed in:", user.email);
  
        const userSavedCountriesRef = ref(database, `users/${user.uid}/savedCountries`);
        onValue(userSavedCountriesRef, (snapshot) => {
          const savedCountries = snapshot.val() || [];
          console.log("Saved Countries:", savedCountries);
        });
      } else {
        console.log("User is signed out");
      }
    });
  
    return () => unsubscribe(); // Cleanup listener when component unmounts
  }, []);


  const getDatabaseSavedCountries = async () => {
    const dbRef = ref(database);
    try {
      await get(child(dbRef, `users/${auth.currentUser.uid}/savedCountries`)).then((snapshot) => {
        if (snapshot.exists()) {
          let databaseSavedCountries = snapshot.val();
          console.log(databaseSavedCountries)
          let savedCountryObjects = countries.filter((item) => databaseSavedCountries.includes(item.name.common));    
          // it's not getting countries quick enough sometimes. When I reoload just this page, so I think it may be the API    
          setUserSavedCountries(savedCountryObjects)
        } else {
          console.log("no data")
        }
      });
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    getDatabseProfile();
    getDatabaseSavedCountries();
  }, []);

  return (
    <>
      <Box
        display="flex"
        padding="4"
        flexDirection="column"
        height="vh"
        gap="8"
      >
        <Heading as="h2" size="xl">
          My Saved Countries
        </Heading>
        {userSavedCountries && userSavedCountries.length > 0 ? (
          <Grid templateColumns="repeat(4, 1fr)" gap="3">
            <For each={userSavedCountries}>
              {(country, index) => (
                <CountryCard key={index} country={country} />
              )}
            </For>
          </Grid>
        ) : (
          <p>Your saved countries will show up here!</p>
        )}
        {!userProfile ? (
          <form onSubmit={handleSubmit(onSubmit)} action="">
            <Fieldset.Root size="lg" maxW="lg" minW="md">
              {/* maybe remove stack component */}
              <Stack>
                <Fieldset.Legend>My Profile</Fieldset.Legend>
              </Stack>
              <Fieldset.Content>
                <Field>
                  <Input
                    {...register("fullName", { required: true })}
                    placeholder="Full Name"
                  />
                </Field>
                <Field>
                  <Input
                    {...register("email", { required: true })}
                    placeholder="email"
                    type="email"
                  />
                </Field>
                <Field>
                  <Input
                    {...register("country", { required: true })}
                    placeholder="country"
                  />
                </Field>
                <Field>
                  <Textarea
                    {...register("bio", { required: false })}
                    placeholder="Bio"
                  />
                </Field>
              </Fieldset.Content>
              <Button type="submit" alignSelf="flex-start">
                Submit
              </Button>
            </Fieldset.Root>
          </form>
        ) : (
          <Text fontSize="lg">Welcome {userProfile.fullName}</Text>
        )}
      </Box>
    </>
  );
}

export default SavedCountries;
