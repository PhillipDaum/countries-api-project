import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { Image, Flex, Card, Box, Text } from "@chakra-ui/react";
import { Button } from "../components/ui/button";

// save button is in wrong spot for mobile
// change button colors

function CountryPage({ countries }) {
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

  const saveCountries = () => {
    if (localStorage.getItem("savedCountries")){
      let savedCountriesLocal = JSON.parse(localStorage.getItem("savedCountries"));
      if (savedCountriesLocal.includes(country.name.common)){
        console.log("you already saved this country")
        // maybe add a toast or something to let them know
      } else {
        let updatedData = JSON.stringify([...savedCountriesLocal, country.name.common])
        localStorage.setItem("savedCountries", updatedData)
      }
    } else {
      let savedCountriesArrStr = `[\"${country.name.common}\"]`;
      localStorage.setItem("savedCountries", savedCountriesArrStr)
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
              <FontAwesomeIcon icon={faArrowLeft} /> Back
            </Button>
          </Link>
          <Box paddingTop="1rem">
            <Card.Root
              display="flex"
              border="none"
              flexDirection={{ base: "column", md: "row" }} // "column" for small screens, "row" for larger screens
            >
              <Flex
                flexDirection="column"
                justifyContent="center"
                alignItems="center"
              >
                <Image
                  width="100%"
                  borderRadius=".5rem"
                  // what are the question marks for?
                  src={country.flags?.svg || "/no-image.jpg"}
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
                          onClick={saveCountries}
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
                        { country.name.common === "South Africa" || country.name.common === "Palestine" ? country.capital.join(", ") : country.capital}
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
                            {/* adding colors and borders */}
                            <Button bg="gray.focusRing" >{item.name.common}</Button>
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
