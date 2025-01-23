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

// fix styling issues, padding between components
// make welcome look better

function SavedCountries({ countries }) {
  const { register, handleSubmit } = useForm();
  const [userProfile, setUserProfile] = useState(null);
  const [userSavedCountries, setUserSavedCountries] = useState(null);
  
  const onSubmit = (data) => {
    if (!userProfile) { 
      localStorage.setItem("profile", JSON.stringify(data));
      setUserProfile(data);
    } 
  };

  // INTERACT WITH LOCAL STORAGE
  // would it be better for these to be in two separate useEffects? 
  useEffect(() => {
    if (localStorage.getItem("profile")) {
      let profileInfo = JSON.parse(localStorage.getItem("profile"));
      setUserProfile(profileInfo);
    };
    if (localStorage.getItem("savedCountries")){
      console.log("it goes")
      let savedCountries = JSON.parse(localStorage.getItem("savedCountries"));
      savedCountries = countries.filter((item) => savedCountries.includes(item.name.common))
      setUserSavedCountries(savedCountries)
    }
  }, [countries]);


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
          <Fieldset.Root size="lg" maxW="lg" midW="md">
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
