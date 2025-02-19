/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { Image, Flex, Card, Box, Text } from "@chakra-ui/react";
import { Button } from "../components/ui/button";
import { ref, set, onValue, get } from "firebase/database";
import { Toaster, toaster } from "../components/ui/toaster"

// save button is in wrong spot for mobile
// 
// maybe change button colors
function CountryPage({ countries, database, auth }) {
  const { oneCountry } = useParams();
  const [country, setCountry] = useState(null);
  const [borderCountries, setBorderCountries] = useState([]);
  const [countryCounts, setCountryCounts] = useState({});

  useEffect(() => {
    setCountry(countries.filter((item) => item.name.common === oneCountry)[0]);
  }, [countries, oneCountry]); // oneCountry is here so boardering countries can be clicked to go to that country page

  useEffect(() => {
    if (country && "borders" in country) {
      setBorderCountries(
        // would this cause any issues for countries withoug FIFA codes?
        countries.filter((item) => country.borders.includes(item.fifa))
      );
    }
  }, [country]);

  const saveCountries = () => {
    const user = auth.currentUser;

    if (!user) {
      console.log("User is not signed in.")
      toaster.create({
        description: "User must sign in to save countries",
        type: "warning"
      })
      return;
    }

    const userId = user.uid;
    const userSavedCountriesRef = ref(database, `users/${userId}/savedCountries`);

    // refactor? 
    get(userSavedCountriesRef).then((snapshot) => {
      let databaseSavedCountries = snapshot.val();
  
      if (databaseSavedCountries) {
        if (databaseSavedCountries.includes(country.name.common)) {
          toaster.create({
            description: `${country.name.common} is already in your saved countries.`,
            type: "warning"
          })
        } else {
          set(userSavedCountriesRef, [...databaseSavedCountries, country.name.common]);
          toaster.create({
            description: `${country.name.common} saved!`,
            type: "success"
          })
          console.log("saved it! 1");
          // add toast
        }
      } else {
        set(userSavedCountriesRef, [country.name.common]);
        console.log("saved it! 2")
        // add toast
      }
    });
  };

  // updates country counts from database
  // it works but the console log only works the second time  
  useEffect(() => {
    onValue(ref(database, "counts/"), (snapshot) => {
      console.log(snapshot.val())
      setCountryCounts(snapshot.val());
    });
    console.log("country counts", countryCounts);
  }, []);

  return (
    <>
      {!country ? (
        <Flex justifyContent="center" alignItems="center" height="100vh">
          <Text>Loading...</Text>
        </Flex>
      ) : (
        <Flex flexDirection="column" padding="3rem" height="100vh" maxW="vw">
          {/* How is this button method for screen readers? */}
          <Link to="/">
            <Button
              aria-label="Go back"
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
              <Flex flexDirection="column" padding="1rem" width="100%">
                <Box>
                  <Card.Body>
                    <Box>
                      <Flex
                        justifyContent="space-between"
                        gap="1rem"
                        paddingBottom="1rem"
                      >
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
                        {country.name.common === "South Africa" ||
                        country.name.common === "Palestine"
                          ? country.capital.join(", ")
                          : country.capital}
                      </Text>
                      <Text fontSize="sm">
                        <Text as="span" fontWeight="semibold">
                          Searched For:{" "}
                        </Text>
                        {/* change, I will need a variable or something to do this. This is for a later date */}
                        { country.name.common in countryCounts ? countryCounts[country.name.common] : "0" }
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
                            <Button bg="gray.focusRing">
                              {item.name.common}
                            </Button>
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
      <Toaster />
    </>
  );
}

export default CountryPage;
