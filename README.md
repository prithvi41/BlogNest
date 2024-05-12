# BlogNest Backend REST APIs
## Description
 - A Blog App where authors can create and read blogs on different topics.
 - APIs include to add/register a user, CRUD operations for post management, filter post by author or topics. login/register functionality with password hashing, user authorization using JWT.
## Local installation 
#### Prerequisites
  - Ensure you have node.js, npm, and Postgres(for local pg servers) installed on your local machine.
#### Clone the Repository 
```bash
$ git clone https://github.com/prithvi41/BlogNest.git
```
#### install dependencies 
- Navigate to the project directory and install the required dependencies using npm
```bash
$ cd BlogNest
$ npm install
```
#### set up environment variables 
 - Create a .env file in the root directory of the project and configure the following environment variables 
```plaintext
PORT=3000
PGHOST=localhost
PGPORT=5432
PGDB=your_database
PGUSER=your_database_username
PGPASSWORD=your_database_password
SECRET_KEY=your_secret_key_for_jwt
```
#### Database setup 
- Set up the PostgreSQL database and initialize the schema by running the provided SQL script (schema.sql) in your PostgreSQL client.
#### Start the Application 
```plaintext
node index.js
```
- Your app should now be running on localhost:3000.
  

