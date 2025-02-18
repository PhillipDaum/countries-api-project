/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import { Box, Image, Text, Flex } from "@chakra-ui/react";
import { ref, onValue, set } from "firebase/database";

function CountryCard({ country, database }) {
  const countSearches = () => {
    let keyName = country.name.common;
    let value;
    onValue(ref(database, "counts/" + `${keyName}/`), (snapshot) => {
      value = snapshot.val();
    } );
    if (value) {
      value++;
      set(ref(database, 'counts/' + `${keyName}/`), value);
    } else {
      set(ref(database, 'counts/' + `${keyName}/`),  1 );
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
              { country.name.common === "South Africa" || country.name.common === "Palestine" ? country.capital.join(", ") : country.capital}
            </Text>
          </Flex>
        </Box>
      </Box>
    </Link>
  );
}

export default CountryCard;
