import { useState, useEffect } from "react";
import "./Header.css";
import { Link } from "react-router";
import { Heading } from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoon as faSolidMoon } from "@fortawesome/free-solid-svg-icons";
import { faMoon as faRegularMoon } from "@fortawesome/free-regular-svg-icons";
import { faHeart } from "@fortawesome/free-regular-svg-icons";
import { useColorMode } from "../ui/color-mode";

function Header() {
  const { toggleColorMode, colorMode } = useColorMode();

  return (
    <header className="header">
      <nav className="nav">
        <Heading as="h1" size="3xl">
          <Link to="/">Where in the World?</Link>
        </Heading>
        <div className="right-side">
          <Heading as="h2" size="lg">
            <Link to="/saved-countries">
              <FontAwesomeIcon icon={faHeart} /> Saved Countries
            </Link>
          </Heading>
          <Heading size="lg">
            <a onClick={toggleColorMode}>
             {colorMode === "light" ? <FontAwesomeIcon icon={faSolidMoon} />  : <FontAwesomeIcon icon={faRegularMoon} />}  dark mode
            </a>
          </Heading>
        </div>
      </nav>
    </header>
  );
}

export default Header;
