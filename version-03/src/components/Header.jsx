import { Link, useLocation } from "react-router";
import { Heading, Flex, Box, Text } from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoon as faSolidMoon } from "@fortawesome/free-solid-svg-icons";
import { faMoon as faRegularMoon } from "@fortawesome/free-regular-svg-icons";
import { faHeart as faSolidHeart } from "@fortawesome/free-solid-svg-icons";
import { faHeart as faRegularHeart } from "@fortawesome/free-regular-svg-icons";
import { useColorMode } from "./ui/color-mode";

// should it be sticky?

function Header({ isSignedIn, signOutUser }) {
  // for light and dark mode
  const { toggleColorMode, colorMode } = useColorMode();

  // for conditionally rendering heart icon for saved countries page
  const location = useLocation();
  const isSavedCountriesPage = location.pathname === "/saved-countries";

  return (
    <Box shadow="lg" bg="bg.panel" as="header">
        <Flex 
          as="nav"
          padding="1rem"
          justifyContent="space-between"
          alignItems="center" 
          flexDirection={{ base: "column", md: "row" }}
        >
          <Heading as="h1" size="3xl">
            <Link to="/">Where in the World?</Link>
          </Heading>
          <Flex flexDirection="row" gap="1rem">
          <Heading as="h2" size="lg">
            { isSignedIn ? (
              <Text cursor="pointer" onClick={signOutUser}>Sign out</Text>
            ) : (
              <Link to="/signin">
              Sign up/in
            </Link>
            )}
          </Heading>
            <Heading as="h2" size="lg">
              <Link to="/saved-countries">
                <FontAwesomeIcon
                  icon={isSavedCountriesPage ? faSolidHeart : faRegularHeart}
                />{" "}
                Saved Countries
              </Link>
            </Heading>
            <Heading cursor="pointer" size="lg">
              <a onClick={toggleColorMode}>
                <FontAwesomeIcon
                  icon={colorMode === "light" ? faRegularMoon : faSolidMoon}
                />{" "}
                dark mode
              </a>
            </Heading>
          </Flex>
        </Flex>
    </Box>
  );
}

export default Header;
