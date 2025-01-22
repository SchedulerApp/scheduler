const fs = require("fs");
const path = require("path");

const express = require("express");
const bodyparser = require("body-parser");
const helmet = require("helmet");
const cors = require("cors");

const app = express();

const db = require("./db");

//setup routs
const days = require("./routes/days");
const appointments = require("./routes/appointments");
const interviewers = require("./routes/interviewers");

//this function is used to reset the database when visiting the route <http://localhost:8001/api/debug/reset>
function read(file) {
  return new Promise((resolve, reject) => {
    fs.readFile(
      file,
      {
        encoding: "utf-8"
      },
      (error, data) => {
        if (error) return reject(error);
        resolve(data);
      }
    );
  });
}

module.exports = function application(
  ENV,
  actions = { updateAppointment: () => {} }
) {
  app.use(cors());
  app.use(helmet());
  app.use(bodyparser.json());

  app.use("/api", days(db));
  app.use("/api", appointments(db, actions.updateAppointment));
  app.use("/api", interviewers(db));

  //the home route displays a message on the browser when viewing the url http://localhost:8001/
  app.get('/', (req, res) => {
   res.json('Scheduler App Database');
  });

  //reset database
  if (ENV === "development" || ENV === "test") {
    Promise.all([
      //calling read function to reset database
      read(path.resolve(__dirname, `db/schema/create.sql`)),
      read(path.resolve(__dirname, `db/schema/${ENV}.sql`))
    ])
      .then(([create, seed]) => {
        app.get("/api/debug/reset", (request, response) => {
          db.query(create)
            .then(() => db.query(seed))
            .then(() => {
              console.log("Database Reset");
              response.status(200).send("Database Reset");
            });
        });
      })
      .catch(error => {
        console.log(`Error setting up the reset route: ${error}`);
      });
  }

  app.close = function() {
    return db.end();
  };

  return app;
};
