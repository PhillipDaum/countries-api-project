import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Image, Flex, Card, Box, Text, SimpleGrid } from "@chakra-ui/react";
import { Button } from "../components/ui/button";

// back button arrow is not aligned correctly
// save button is in wrong spot for mobile
// remove border
// add border radius to flag 

function CountryPage({ countries, setUserSavedCountries }) {
  const { oneCountry } = useParams();
  const [country, setCountry] = useState(null);
  const [borderCountries, setBorderCountries] = useState([]);

  useEffect(() => {
    setCountry(countries.filter((item) => item.name.common === oneCountry)[0]);
  }, [countries, oneCountry]); // oneCountry is here so boardering countries can be clicked to go to that country page

  useEffect(() => {
    if (country && "borders" in country) {
      setBorderCountries(
        countries.filter((item) => country.borders.includes(item.fifa))
      );
    }
  }, [country]);

  const handleSetUserSavedCountries = () => {
    if (country) {
      setUserSavedCountries((prevData) => {
        if (
          prevData.some(
            (savedCountry) => savedCountry.name.common === country.name.common
          )
        ) {
          return prevData;
        }
        return [...prevData, country];
      });
    }
  };

  return (
    <>
      {!country ? (
        <Flex justifyContent="center" alignItems="center" height="100vh">
          <Text>Loading...</Text>
        </Flex>
      ) : (
        <Flex flexDirection="column" padding="3rem" maxW="vw">
          {/* How is this button method for screen readers? */}
          <Link to="/">
            <Button
              aria-label={`Save ${country.name.common} to your saved countries`}
              maxW="5rem"
            >
              ← Back
            </Button>
          </Link>
          <Box paddingTop="1rem">
            <Card.Root
              display="flex"
              flexDirection={{ base: "column", md: "row" }} // "column" for small screens, "row" for larger screens
            >
              <Flex
                flexDirection="column"
                justifyContent="center"
                alignItems="center"
              >
                <Image
                  width="100%"
                  // there is no placeholder yet
                  // what are the question marks for?
                  src={country.flags?.svg || "placeholder-image-url"}
                  alt={country.flags?.alt || "Flag not available"}
                />
              </Flex>
              <Flex
                flexDirection="column"
                padding="1rem"
                width="100%"
              >
                <Box>
                  <Card.Body>
                    <Box>
                      <Flex justifyContent="space-between" gap="1rem" paddingBottom="1rem">
                        <Card.Title>{country.name.common}</Card.Title>
                        <Button
                          onClick={handleSetUserSavedCountries}
                          aria-label={`Save ${country.name.common} to your saved countries`}
                        >
                          Save Country
                        </Button>
                      </Flex>
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
                        {country.capital || "N/A"}
                      </Text>
                      <Text fontSize="sm">
                        <Text as="span" fontWeight="semibold">
                          Searched For:{" "}
                        </Text>
                        {/* change, I will need a variable or something to do this. This is for a later date */}
                        fake number
                      </Text>
                    </Box>
                  </Card.Body>
                  <Card.Footer>
                    {/* now they go over one another!  */}
                    <Flex wrap="wrap" gap=".5rem" alignItems="center">
                      <Text fontSize="sm" fontWeight="semibold">
                        Bordering Countries:{" "}
                      </Text>
                      {borderCountries.length === 0 ? (
                        <Text fontSize="sm">None</Text>
                      ) : (
                        // should the key be the index? or is this good?
                        borderCountries.map((item) => (
                          <Link
                            key={item.name.common}
                            to={`/country-page/${item.name.common}`}
                          >
                            <Button>{item.name.common}</Button>
                          </Link>
                        ))
                      )}
                    </Flex>
                  </Card.Footer>
                </Box>
              </Flex>
            </Card.Root>
          </Box>
        </Flex>
      )}
    </>
  );
}

export default CountryPage;
