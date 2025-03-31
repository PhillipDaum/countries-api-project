import express from "express"; //external module for using express
import pg from "pg";
const { Client } = pg; //external module for using postgres with node

const config = {
  user: process.env.USER,
  host: process.env.HOST,
  database: process.env.DATABASE,
  password: process.env.PASSWORD,
  port: process.env.DATABASE_PORT,
  ssl: true
}

const app = express();
const port = 3000;

app.use(express.json());

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

// adding reccomended from GPT
app.use((req, res, next) => {
  if (req.url.endsWith('.js')) {
    res.type('application/javascript');
  }
  next();
});


// API ENDPOINTS countries are saved with cca3 codes
// Retrieve all country clicked counts
app.get("/counts/", async (req, res) => {
  let countries = await getAllCountryCounts();
  let JSONcountries = JSON.stringify(countries);
  res.send(JSONcountries);
});
const getAllCountryCounts = async () => {
  const client = new Client(config);
  await client.connect();
  let result = await client.query("SELECT * FROM country_counts");
  await client.end();
  return result.rows;
};

// Retrieve a specific country's clicked count
app.get("/counts/:cca3", async (req, res) => {
  let country = await getSpecificCountryCount(req.params.cca3);
  let JSONcountry = JSON.stringify(country);
  res.send(JSONcountry);
});
const getSpecificCountryCount = async (cca3) => {
  const client = new Client(config);
  await client.connect();
  let result = await client.query(
    `SELECT search_count FROM country_counts WHERE cca3 = '${cca3}'`
  );
  await client.end();
  return result.rows;
};

// Add one to a specific county's count
app.get("/update-count/:cca3", async (req, res) => {
  await updateSpecificCountryCount(req.params.cca3);
  res.send(`${req.params.cca3} updated`);
});
const isCountryAlreadyInCountryCounts = async (cca3) => {
  const client = new Client(config);
  await client.connect();
  let result = await client.query(
    `SELECT * FROM country_counts WHERE cca3 = '${cca3}'`
  );
  await client.end();
  return result.rows;
};
const updateSpecificCountryCount = async (cca3) => {
  const client = new Client(config);
  await client.connect();
  let isCountryInDatabase = await isCountryAlreadyInCountryCounts(cca3);
  if (isCountryInDatabase.length < 1) {
    await client.query(
      `INSERT INTO country_counts (cca3, search_count) VALUES('${cca3}', 1)`
    );
  } else {
    await client.query(
      `UPDATE country_counts SET search_count = search_count + 1 WHERE cca3 = '${cca3}'`
    );
  }
  await client.end();
};

// Create a new user profile
app.post("/add-user/", async (req, res) => {
  await addOneUser(req.body);
  res.send(`New user profile added.`);
});
const addOneUser = async (obj) => {
  const client = new Client(config);
  await client.connect();
  await client.query(
    `INSERT INTO users (full_name, country, email, bio) VALUES ('${obj.fullName}', '${obj.country}', '${obj.email}', '${obj.bio}');`
  );
  await client.end();
};

// Retrieve user's profile
app.get("/users/:id", async (req, res) => {
  let userProfile = await getUserProfile(req.params.id);
  let JSONUserProfile = JSON.stringify(userProfile);
  res.send(JSONUserProfile);
});
const getUserProfile = async (userId) => {
  const client = new Client(config);
  await client.connect();
  let result = await client.query(
    `SELECT * FROM users WHERE user_id = '${userId}'`
  );
  await client.end();
  return result.rows;
};

// Add a country to saved countries
app.get("/add-saved-country/:cca3", async (req, res) => {
  await saveOneCountry(req.params.cca3);
  res.send(`${req.params.cca3} saved`);
});
const isCountryAlreadyInSavedCountries = async (cca3) => {
  const client = new Client(config);
  await client.connect();
  let result = await client.query(
    `SELECT * FROM saved_countries WHERE cca3 = '${cca3}'`
  );
  await client.end();
  return result.rows;
};
const saveOneCountry = async (cca3) => {
  const client = new Client(config);
  await client.connect();
  let isCountryInDatabase = await isCountryAlreadyInSavedCountries(cca3);
  console.log(isCountryInDatabase);
  if (isCountryInDatabase.length < 1) {
    await client.query(`INSERT INTO saved_countries (cca3) VALUES ('${cca3}')`);
  } else {
    // add error handling to user here?
    console.log(`${cca3} is already saved`);
  }
  await client.end();
};

// Retrieve all Saved Countries
app.get("/saved-countries", async (req, res) => {
  let savedCountries = await getSavedCountries();
  let JSONSavedCountries = JSON.stringify(savedCountries);
  res.send(JSONSavedCountries);
})
const getSavedCountries = async () => {
  const client = new Client(config);
  await client.connect();
  let result = await client.query(
    `SELECT * FROM saved_countries`
  );
  await client.end();
  return result.rows;
}
