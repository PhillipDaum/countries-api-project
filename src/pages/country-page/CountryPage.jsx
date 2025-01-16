import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Image, Flex, Card, Box, Text } from "@chakra-ui/react";
import { Button } from "../../components/ui/button";

function CountryPage({ countries, setUserSavedCountries }) {
  const { oneCountry } = useParams();
  const [country, setCountry] = useState(null);
  const [borderCountries, setBorderCountries] = useState([]);

  useEffect(() => {
    setCountry(countries.filter((item) => item.name.common === oneCountry)[0]);
  }, [countries, oneCountry]);

  // why does this throw an error sometimes?
  useEffect(() => {
    if (country) {
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
          // or maybe a toast?
          return prevData;
        }
        return [...prevData, country];
      });
    }
  };

  return (
    <>
      {!country ? (
        <p>waiting</p>
      ) : (
        <Flex flexDirection="column" padding="3rem" maxW="vw">
          <Link to="/">
            <Button maxW="5rem">← Back</Button>
          </Link>
          <Box paddingTop="1rem">
            <Card.Root flexDirection="row" overflow="hidden" maxW="xxl">
              <Image
                width="1/2"
                src={country.flags.svg}
                alt={country.flags.alt}
              />
              <Flex flexDirection="row">
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
                        {/* change, I will need a variable or something to do this */}
                        {/* fake number */}
                      </Text>
                    </Box>
                  </Card.Body>
                  <Card.Footer>
                    <Text fontSize="sm" fontWeight="semibold">
                      Bordering Countries:{" "}
                    </Text>
                    {!borderCountries ? (
                      <p>waiting</p>
                    ) : (
                      borderCountries.map((item, index) => (
                        <Link
                          key={index}
                          to={`/country-page/${item.name.common}`}
                        >
                          <Button key={index}>{item.name.common}</Button>
                        </Link>
                      ))
                    )}
                  </Card.Footer>
                </Box>
                <Button onClick={handleSetUserSavedCountries}>
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
