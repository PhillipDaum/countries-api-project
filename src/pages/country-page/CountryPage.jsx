import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Image } from "@chakra-ui/react";
// make it a closeup of the card, but different
// add a button, it will add the common name of the country on the page to the saved countries
// or maybe I will just have it add it to the list

function CountryPage({ countries }) {
  const { oneCountry } = useParams();
  // const country = countries.filter((item) => item.name.common === oneCountry)[0];
  const [country, setCountry] = useState(null);
  useEffect(() => {
    setCountry(countries.filter((item) => item.name.common === oneCountry)[0]);
    console.log("hello", country);
  }, [countries]);

  return <>{!country ? <p>waiting</p> : <Image src={country.flags.svg} />}</>;
}

export default CountryPage;
