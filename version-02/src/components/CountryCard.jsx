import { Link } from "react-router-dom";
import { Box, Image, Text, Flex } from "@chakra-ui/react";

// add an onClick to the link that pushes to the local storage count and then country name and the number

function CountryCard({ country }) {
  const countSearches = () => {
    let keyName = country.fifa + "count";
    if (localStorage.getItem(keyName)) {
      let value = Number(JSON.parse(localStorage.getItem(keyName)));
      value++;
      localStorage.setItem(keyName, value)
      console.log("local", localStorage.getItem(keyName))
    } else {
      localStorage.setItem(keyName, "1")
    }
  };

  return (
    <Link to={`/country-page/${country.name.common}`} onClick={countSearches}>
      <Box
        bg="bg.panel"
        borderRadius="lg"
        overflow="hidden"
        _hover={{
          boxShadow: "lg",
          transform: "scale(1.05)",
          transition: "0.2s ease-in-out",
        }}
      >
        {/* Country Flag */}
        <Image
          src={country.flags.svg}
          alt={`${country.name.common} flag`}
          w="100%"
        />

        {/* Card Body */}
        <Box p="4">
          {/* Country Name */}
          <Text fontSize="xl" fontWeight="bold" mb="2">
            {country.name.common}
          </Text>

          {/* Details */}
          <Flex direction="column" gap="1">
            <Text fontSize="sm">
              <Text as="span" fontWeight="semibold">
                Population:{" "}
              </Text>
              {country.population.toLocaleString()}
            </Text>
            <Text fontSize="sm">
              <Text as="span" fontWeight="semibold">
                Region:{" "}
              </Text>
              {country.region}
            </Text>
            <Text fontSize="sm">
              <Text as="span" fontWeight="semibold">
                Capital:{" "}
              </Text>
              {/* why does this not work sometimes? It even throws an error with the undefined */}
              {/* {country.capital.join(", ") || "N/A"} */}
              {/* {country.capital} */}
            </Text>
          </Flex>
        </Box>
      </Box>
    </Link>
  );
}

export default CountryCard;
