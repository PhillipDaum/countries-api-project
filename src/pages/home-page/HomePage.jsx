/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import CountryCard from "../../components/country-card/CountryCard";
import { InputGroup } from "../../components/ui/input-group";
import { SimpleGrid, For, Flex, Input, Box } from "@chakra-ui/react";
import { Field } from "../../components/ui/field";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import {
  NativeSelectField,
  NativeSelectRoot,
} from "../../components/ui/native-select";
import { useForm } from "react-hook-form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function HomePage({ countries }) {
  // figure out how to change grid to 1 col for mobile

  const [userSelectedCountries, setUserSelectedCountries] = useState([]);

  useEffect(() => {
    setUserSelectedCountries(countries);
  }, [countries]);

  // Destructuring
  const {
    register,
    formState: { errors },
  } = useForm();

  const handleSearch = (e) =>
    setUserSelectedCountries(
      countries.filter((item) =>
        new RegExp(e.target.value, "i").test(item.name.official)
      )
    );
  const handleRegionChange = (e) =>
    setUserSelectedCountries(
      countries.filter((item) => item.region === e.target.value)
    );

  return (
    <>
      <Box padding="3">
        <Flex justify="space-between" paddingBottom="2">
          {/* Search Input Form */}
          <form>
            <Field
              invalid={!!errors.framework}
              errorText={errors.framework?.message}
            >
              <InputGroup
              startElement={<FontAwesomeIcon icon={faMagnifyingGlass} />}
              >
                <Input
                  {...register("search", {
                    required: "Please enter a search term",
                  })}
                  onChange={handleSearch}
                  placeholder={`search for a country...`}
                />
              </InputGroup>
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
        </Flex>
        <SimpleGrid
          columns={{ base: 1, md: 3, lg: 4 }}
          gap={{ base: "1rem", xl: "1.5rem" }}
        >
          <For each={userSelectedCountries}>
            {(country, index) => <CountryCard key={index} country={country} />}
          </For>
        </SimpleGrid>
      </Box>
    </>
  );
}

export default HomePage;
