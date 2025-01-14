import CountryCard from "../../components/country-card/CountryCard";
import { Grid, For, Container, Input } from "@chakra-ui/react";
import { Field } from "../../components/ui/field";
import { NativeSelectField, NativeSelectRoot } from "../../components/ui/native-select";
import { useForm } from "react-hook-form";

function HomePage({ countries }) {

  // figure out how to change grid to 1 col for mobile
  // changed the mapped thing to be the 
  return (
    <>
      <Container>
        <Field>
          <Input placeholder="search for a country..."/>
        </Field>

        <Field label="Region">
          <NativeSelectRoot>
            <NativeSelectField
              name="region"
              items={[
                "Africa",
                "America",
                "Asia",
                "Europe",
                "Oceania"
              ]}
            />
          </NativeSelectRoot>
        </Field>

      </Container>
      <Grid templateColumns="repeat(4, 1fr)" gap="3">
        <For each={countries}>
          {(country, index) =>  <CountryCard key={index} country={country} /> }
        </For>
      </Grid>
    </>
  );
}

export default HomePage;
