import { Link } from "react-router-dom";
import { Card, Image } from "@chakra-ui/react";
import "./CountryCard.css";

// image of flag with no padding
// can click the whole thing and it will go to the specific country page

function CountryCard({ country }) {
  return (
    <Link to={`/country-page/${country.name.common}`}>
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
    </Link>
  );
}

export default CountryCard;
