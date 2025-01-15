import { useParams } from "react-router-dom";
import { Image } from "@chakra-ui/react";
// make it a closeup of the card, but different

function CountryPage({ countries }) {
    const { oneCountry } = useParams();
    const country = countries.filter((item) => item.name.common === oneCountry)
    console.log("what this", country)
  return (
    <>
      <Image src={country[0].flags.svg} />
    </>
  );
}

export default CountryPage;
