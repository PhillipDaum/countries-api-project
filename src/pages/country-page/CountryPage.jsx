import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Image, Grid } from "@chakra-ui/react";
import { Button } from "../../components/ui/button";
import SavedCountries from "../saved-countries/SavedCountries";

function CountryPage({ countries, setUserSavedCountries}) {
  const { oneCountry } = useParams();
  const [country, setCountry] = useState(null);
  useEffect(() => {
    setCountry(countries.filter((item) => item.name.common === oneCountry)[0]);
  }, [countries]);

  const handleSetUserSavedCountries = () => {
    if (country) {
      setUserSavedCountries((prevData) => {
        if (prevData.some((savedCountry) => savedCountry.name.common === country.name.common  )) {
          // or maybe a toast?
          return prevData
        }
       return [...prevData, country]});
    }
    
  };

  return (
    <>
      {!country ? (
        <p>waiting</p>
      ) : (
        <Grid templateColumns="repeat(2, 1fr)" gap="3">
          <Image src={country.flags.svg} />
          <Button onClick={handleSetUserSavedCountries}>Save Country</Button>
        </Grid>
      )}
    </>
  );
}

export default CountryPage;
