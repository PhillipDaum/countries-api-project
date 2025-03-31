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

function SavedCountries({ countries, database }) {
  const { register, handleSubmit } = useForm();
  const [userProfile, setUserProfile] = useState(null);
  const [userSavedCountries, setUserSavedCountries] = useState(null);

  const onSubmit = async (data) => {
    try {
      const callURL = `/api/add-user/`
      const response = await fetch(callURL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json", // Specify JSON content
        },
        body: JSON.stringify(data)
      })
      let result = await response.text();
      console.log("success:", result);
    } catch (error) {
      console.error("error adding user:", error)
    }

  };

  // hardcoded in a user ID
  const getDatabseProfile = async () => {
    try {
      const id = 3;
      const callURL = `/api/users/${id}`;
      const response = await fetch(callURL, {
        method: "GET",
      });
      const data = await response.json();
      setUserProfile(data[0])
    } catch (error) {
      console.error("Error saving country:", error);
    }
  };
  const getDatabaseSavedCountries = async () => {
    try {
      const callURL = `/api/saved-countries`;
      const response = await fetch(callURL, {
        method: "GET",
      });
      let data = await response.json();
      data = data.map((item) => item.cca3);
      if (data.length > 0) {
        setUserSavedCountries(countries.filter((item) => data.includes(item.cca3)));
      };
    } catch (error) {
      console.error("Error getting saved countries:", error);
    }
  }

  useEffect(() => {
    getDatabseProfile();
    getDatabaseSavedCountries();
  }, [userSavedCountries]);

  return (
    <>
      <Box
        display="flex"
        padding="4"
        flexDirection="column"
        bg="bg.muted"
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
        {/* Added additional user profile in alternate condition to demonstrate API enpoint to add user */}
        {!userProfile ? (
          <form onSubmit={handleSubmit(onSubmit)} action="POST">
            <Fieldset.Root size="lg" maxW="lg" minW="md">
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
          <>
          <Text fontSize="lg">Welcome {userProfile.full_name}</Text>
          <form onSubmit={handleSubmit(onSubmit)} action="POST">
            <Fieldset.Root size="lg" maxW="lg" minW="md">
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
          </>
        )}
      </Box>
    </>
  );
}

export default SavedCountries;
