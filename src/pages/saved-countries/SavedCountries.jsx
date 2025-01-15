import { Grid, For } from "@chakra-ui/react";
import CountryCard from "../../components/country-card/CountryCard";

function SavedCountries({ userSavedCountries }) {
  return (
    <>
      <h2>My Saved Countries</h2>
      <Grid templateColumns="repeat(4, 1fr)" gap="3">
        <For each={userSavedCountries}>
          {(country, index) => <CountryCard key={index} country={country} />}
        </For>
      </Grid>

      {/* user profile object here */}
    </>
  );
}

export default SavedCountries;
