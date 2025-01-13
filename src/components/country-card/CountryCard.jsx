import { Card, Image } from "@chakra-ui/react";
import "./CountryCard.css";

// the card has:
// image of flag with no padding
// heading of the country name
// body has 3 things that look like key value pairs
//// Population, Region, Capitol

function CountryCard({country}) {
  return (
    <Card.Root>
      <Card.Body>
       <Image src={country.flags.svg}/>
      </Card.Body>   
    </Card.Root>
  );
}

export default CountryCard;
