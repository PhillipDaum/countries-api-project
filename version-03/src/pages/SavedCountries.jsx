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
import { ref, set, onValue } from "firebase/database";


function SavedCountries({ countries, database }) {
  const { register, handleSubmit } = useForm();
  const [userProfile, setUserProfile] = useState(null);
  const [userSavedCountries, setUserSavedCountries] = useState(null);

  const onSubmit = (data) => {
    if (!userProfile) { 
      set(ref(database, 'users/' + 1), { // add numbering system later 
        fullName: data.fullName,
        country: data.country,
        email: data.email,
        bio: data.bio,
      });
      setUserProfile(data);
    } 
  };

  // INTERACT WITH DATABASE
  // would it be better for these to be in two separate useEffects? 
  // change numbering later 
  // only works second time, is it an async issue? 
  /// removed countries from dependency array
  useEffect(() => {
    let databaseProfile;
    onValue(ref(database, 'users/' + 1), (snapshot) => {
      databaseProfile = snapshot.val();
    });
    let databaseSavedCountries;
    onValue(ref(database, `users/${1}/savedCountries`), (snapshot) => {
      databaseSavedCountries = snapshot.val();
    });
    if (databaseProfile) {
      setUserProfile(databaseProfile);
    };
    if (databaseSavedCountries){
      console.log(databaseSavedCountries)
      let setTheseSavedCountries = countries.filter((item) => databaseSavedCountries.includes(item.name.common))
      setUserSavedCountries(setTheseSavedCountries)
    }
  }, []);


  return (
    <>
      <Box display="flex" padding="4" flexDirection="column" height="vh" gap="8">
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
        ) }
        { !userProfile ? (
          <form onSubmit={handleSubmit(onSubmit)} action="">
          <Fieldset.Root size="lg" maxW="lg" minW="md">
            <Stack>
              <Fieldset.Legend>My Profile</Fieldset.Legend>
            </Stack>
            <Fieldset.Content>
              <Field >
                <Input
                  {...register("fullName", { required: true })}
                  placeholder="Full Name"
                />
              </Field>
              <Field>
                <Input
                  {...register("email", { required: true })}
                  placeholder="email"
                  type="Email"
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
