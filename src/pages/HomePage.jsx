import CountryCard from "../components/country-card/CountryCard";

function HomePage({ countries }) {
  return (
    <>
      <h2>hello</h2>
      {countries.map((country, index) => (
          <CountryCard key={index} country={country} />
      ))}
    </>
  );
}

export default HomePage;
