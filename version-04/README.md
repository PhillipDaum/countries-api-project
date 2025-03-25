# Version 4

## Frontend
1. Refactor code so user actions are tied to calling API fetch request to "localhost:3000/endpoint".
2. If browser displays CORS issue, check in. 

## Web Server/API
1. Creating a folder in the root countries-api folder, calling it 'server'.
2. Inside of the server folder, create the web sever instance:
    - npm init,  express, pg, .gitignore, src
3. Add config file to connect to database.
4. Build our express app (in index.js), starting with imports and express boilerplate code. 
5. Reference API endpoint document, and create the endpoints and helper functions for each user action. 
6. Test with Postman.

## Database
1. Create schema for the tables that I will need in my database.
    - CREATE TABLE commands, list columns and data types
    - saved_countries, users, country_count
2. Connect to our local database using PGadmin.
3. Run commands to create our dta tables.
