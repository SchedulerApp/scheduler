//Create a connection using pg module
const pg = require("pg");

const client = new pg.Client({
  connectionString: process.env.DATABASE_URL || "",
  ssl: process.env.DATABASE_URL ? { rejectUnauthorized: false } : false
});

//client variable can be required from anywhere within this app, it is used for creating javascript functions that query data to and from the Postgres database.
client
  .connect()
  .catch(e => console.log(`Error connecting to Postgres server:\n${e}`));

module.exports = client;
