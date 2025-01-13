import { Card, Image } from "@chakra-ui/react";
import "./CountryCard.css";

// the card has:
// image of flag with no padding
// heading of the country name
// body has 3 things that look like key value pairs
//// Population, Region, Capitol

function CountryCard({ country }) {
  return (
    <Card.Root>
      <Card.Body>
        <Image src={country.flags.svg} />
        <div className="card-content">
          <h3>{country.name.common}</h3>
          <p>
            <span className="bold">Population: </span>
            {country.population.toLocaleString()}
          </p>
          <p>
            <span className="bold">Region: </span>
            {country.region}
          </p>
          <p>
            <span className="bold">Capitol: </span>
           {country.capital}
          </p>
        </div>
      </Card.Body>
    </Card.Root>
  );
}

export default CountryCard;
