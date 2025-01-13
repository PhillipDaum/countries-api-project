import CountryCard from "../components/country-card/CountryCard";

function HomePage({ countries }) {
  return (
    <>
      <h2>hello</h2>
      {countries.map((country) => (
          <CountryCard country={country} />
      ))}
    </>
  );
}

export default HomePage;
