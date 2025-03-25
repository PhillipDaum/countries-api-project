CREATE TABLE country_counts (
    cca3 VARCHAR PRIMARY KEY,
    search_count INT
);

CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    full_name VARCHAR,
    country VARCHAR,
    email VARCHAR,
    bio VARCHAR
);
INSERT INTO users ( full_name, country, email, bio)
VALUES
    ('Bob Barker', 'United States', 'bob@priceisright.com', 'the price is wrong'),
    ('Philliam', 'Antarctica', 'phil@philiam.com', 'the price is right'),
    ('Carmen Sandiego', 'Guatemala', 'carmen@place.com', 'actually from everywhere');

CREATE TABLE saved_countries (
    id SERIAL PRIMARY KEY,
    cca3 VARCHAR
);
