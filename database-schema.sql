
-- counting table for all user COUNTRIES (country_id, country_name, search_count integer)
CREATE TABLE country_counts (
    country_id VARCHAR PRIMARY KEY,
    country_name VARCHAR,
    search_count INT
);
INSERT INTO country_counts (country_id, country_name, search_count)
VALUES  
    ('001', 'Mexico', 3),
    ( '002', 'United States', 2),
    ( '004', 'Germany', 1);

-- USERS (user_id PRIMARY KEY, full_name, country, email, bio)
CREATE TABLE users (
    user_id VARCHAR PRIMARY KEY,
    full_name VARCHAR,
    country VARCHAR,
    email VARCHAR,
    bio VARCHAR
);
INSERT INTO users (user_id, full_name, country, email, bio)
VALUES
    ('0012', 'Bob Barker', 'United States', 'bob@priceisright.com', 'the price is wrong'),
    ('0013', 'Philliam', 'Antarctica', 'phil@philiam.com', 'the price is right'),
    ( '0019', 'Carmen Sandiego', 'Guatemala', 'carmen@place.com', 'actually from everywhere');

-- SAVED COUNTRIES (id, user_id, country_id, common_name)
CREATE TABLE saved_countries (
    id VARCHAR PRIMARY KEY,
    user_id VARCHAR,
    country_id VARCHAR,
    common_name VARCHAR
);
INSERT INTO saved_countries (id, user_id, country_id, common_name)
VALUES
 ('1234', '0012', '134124','Columbia'),
 ('1235', '0012', '004', 'Germany'),
 ('1236', '0012', '001', 'Mexico');