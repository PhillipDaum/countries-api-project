import {
  Grid,
  For,
  Heading,
  Button,
  Fieldset,
  Input,
  Stack,
  Textarea,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { Field } from "../../components/ui/field";
import CountryCard from "../../components/country-card/CountryCard";

// put in a box with padding
// conditional rendering isn't working correctly for userSavedCountries

function SavedCountries({ userSavedCountries, setUserProfile }) {
  const { register, handleSubmit, reset } = useForm();
  const onSubmit = (data) => {
    setUserProfile(data);
    reset();
  };

  return (
    <>
      <Heading as="h2" size="xl">
        My Saved Countries
      </Heading>
      {!userSavedCountries ? (
        <p>nothing yet</p>
      ) : (
        <Grid templateColumns="repeat(4, 1fr)" gap="3">
          <For each={userSavedCountries}>
            {(country, index) => <CountryCard key={index} country={country} />}
          </For>
        </Grid>
      )}

      {/* user profile */}
      <form onSubmit={handleSubmit(onSubmit)} action="">
        <Fieldset.Root size="lg" maxW="md">
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
  );
}

export default SavedCountries;
