import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Image, Flex, Card, Box, Text, SimpleGrid } from "@chakra-ui/react";
import { Button } from "../../components/ui/button";

// There are some layout issues on this page
// The Save country button shold be up at the top
// the flags aren't behaving correctly 
// the border countries squish up ontop of one another

function CountryPage({ countries, setUserSavedCountries }) {
  const { oneCountry } = useParams();
  const [country, setCountry] = useState(null);
  const [borderCountries, setBorderCountries] = useState([]);

  useEffect(() => {
    setCountry(countries.filter((item) => item.name.common === oneCountry)[0]);
  }, [countries, oneCountry]); // oneCountry is here so you can click and go to the other countries

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
            <Button aria-label={`Save ${country.name.common} to your saved countries`} maxW="5rem">← Back</Button>
          </Link>
          <Box paddingTop="1rem">
            <Card.Root
              flexDirection={["column", "row"]} // "column" for small screens, "row" for larger screens
              overflow="hidden"
              maxW="xxl"
            >
              {/* what are these question marks for? */}
              <Image
                width={["100%", "50%"]}
                src={country.flags?.svg || "placeholder-image-url"}
                alt={country.flags?.alt || "Flag not available"}
              />
              <Flex
                flexDirection="column"
                padding="1rem"
                width={["100%", "50%"]}
              >
                <Box>
                  <Card.Body>
                    <Card.Title>{country.name.common}</Card.Title>
                    <Box>
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
                    <Text fontSize="sm" fontWeight="semibold">
                      Bordering Countries:{" "}
                    </Text>
                    {/* now they go over one another!  */}
                    <SimpleGrid columns={[2, 3]} spacing={2}>
                      {borderCountries.length === 0 ? (
                        <Text fontSize="sm">None</Text>
                      ) : (
                        // should the key be the index? or is this good?
                        borderCountries.map((item) => (
                          <Link key={item.name.common} to={`/country-page/${item.name.common}`}>
                            <Button>{item.name.common}</Button>
                          </Link>
                        ))
                      )}
                    </SimpleGrid>
                  </Card.Footer>
                </Box>
                <Button onClick={handleSetUserSavedCountries} aria-label={`Save ${country.name.common} to your saved countries`}>
                  Save Country
                </Button>
              </Flex>
            </Card.Root>
          </Box>
        </Flex>
      )}
    </>
  );
}

export default CountryPage;
