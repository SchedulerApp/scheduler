//for more info on what each of these routs are serving refer to the readme file located in the dataBaseServer folder

const router = require("express").Router();

module.exports = db => {
  router.get("/interviewers", (request, response) => {
    db.query(`SELECT * FROM interviewers`).then(({ rows: interviewers }) => {
      response.json(
        interviewers.reduce(
          (previous, current) => ({ ...previous, [current.id]: current }),
          {}
        )
      );
    });
  });

  return router;
};
