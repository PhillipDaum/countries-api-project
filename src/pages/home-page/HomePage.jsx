/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import CountryCard from "../../components/country-card/CountryCard";
import { Grid, For, Container, Input } from "@chakra-ui/react";
import { Field } from "../../components/ui/field";
import {
  NativeSelectField,
  NativeSelectRoot,
} from "../../components/ui/native-select";
import { useForm } from "react-hook-form";

function HomePage({ countries }) {
  // figure out how to change grid to 1 col for mobile

  const [userSelectedCountries, setUserSelectedCountries] = useState([]);

  useEffect(() => {
    setUserSelectedCountries(countries);
  }, [countries]);

  // Destructuring, I think
  const {
    register,
    formState: { errors },
  } = useForm();

  const handleSearch = (e) => setUserSelectedCountries(countries.filter((item) => new RegExp(e.target.value, "i").test(item.name.official)))
  const handleRegionChange = (e) => setUserSelectedCountries(countries.filter((item) => item.region === e.target.value));

  return (
    <>
      <Container>
        {/* Search Input Form */}
        <form>
          <Field
            invalid={!!errors.framework}
            errorText={errors.framework?.message}
          >
            <Input
              {...register("search", {
                required: "Please enter a search term",
              })}
              onChange={handleSearch}
              placeholder="search for a country..."
            />
          </Field>
        </form>
        <form>
          <Field>
            <NativeSelectRoot>
              <NativeSelectField
                placeholder="Region"
                name="region"
                items={[
                  "Africa",
                  "Americas",
                  "Antarctic",
                  "Asia",
                  "Europe",
                  "Oceania",
                ]}
                onChange={handleRegionChange}
              />
            </NativeSelectRoot>
          </Field>
        </form>
      </Container>
      <Grid templateColumns="repeat(4, 1fr)" gap="3">
        <For each={userSelectedCountries}>
          {(country, index) => <CountryCard key={index} country={country} />}
        </For>
      </Grid>
    </>
  );
}

export default HomePage;
