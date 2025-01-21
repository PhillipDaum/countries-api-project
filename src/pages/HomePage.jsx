/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import CountryCard from "../components/CountryCard";
import { InputGroup } from "../components/ui/input-group";
import { SimpleGrid, For, Flex, Input, Box } from "@chakra-ui/react";
import { Field } from "../components/ui/field";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { createListCollection } from "@chakra-ui/react";
import {
  SelectContent,
  SelectItem,
  SelectRoot,
  SelectTrigger,
  SelectValueText,
} from "../components/ui/select";
import { useForm } from "react-hook-form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function HomePage({ countries }) {

  // SELECTED COUNTRIES WHICH DISPLAY
  const [userSelectedCountries, setUserSelectedCountries] = useState([]);
  // initially sets userSelectedCountries to countries (from the API)
  useEffect(() => {
    setUserSelectedCountries(countries);
  }, [countries]);


  // REGION SELECTION
  // Works with createListCollection and Select component
  const [value, setValue] = useState(''); // value of the select component
  const regions = createListCollection({
    items: [
      { label: "All Regions", value: "All Regions" },
      { label: "Africa", value: "Africa" },
      { label: "Americas", value: "Americas" },
      { label: "Antarctic", value: "Antarctic" },
      { label: "Asia", value: "Asia" },
      { label: "Europe", value: "Europe" },
      { label: "Oceania", value: "Oceania" },
    ],
  });
  // This useEffect is causing issues with other pages - look in console. 
  useEffect(() => {
    if (value[0] === "All Regions" || value === '') { 
      setUserSelectedCountries(countries)
    } else {
      setUserSelectedCountries( countries.filter((item) => item.region === value[0]))
    }
  }, [value, countries])


  // SEARCH COMPONENT
  // Destructuring react-hook-form
  const {
    register,
    formState: { errors },
  } = useForm();
  //Search for a country
  const handleSearch = (e) =>
    setUserSelectedCountries(
      countries.filter((item) =>
        new RegExp(e.target.value, "i").test(item.name.official)
      )
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
              <SelectRoot
                collection={regions}
                value={value}
                width="10rem"
                onValueChange={(e) => setValue(e.value)}
              >
                <SelectTrigger>
                  <SelectValueText placeholder="Select Region" />
                </SelectTrigger>
                <SelectContent>
                  {regions.items.map((region) => (
                    <SelectItem item={region} key={region.value}>
                      {region.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </SelectRoot>
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
