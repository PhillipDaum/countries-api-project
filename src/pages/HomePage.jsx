/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import CountryCard from "../components/CountryCard";
import { InputGroup } from "../components/ui/input-group";
import { SimpleGrid, For, Flex, Input, Box } from "@chakra-ui/react";
import { Field } from "../components/ui/field";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import {
  NativeSelectField,
  NativeSelectRoot,
} from "../components/ui/native-select";
import { useForm } from "react-hook-form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// Issues:
// Change background color to the one's from the figma
// The NativeSelectField has a background of white with white writing in darkmode on chrome in Linux
// Also, it does not set back all countries. I would like it to do that for Region (all) or something like that

function HomePage({ countries }) {
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
          {/* These are in two different forms for layout, maybe there is a better way */}
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
