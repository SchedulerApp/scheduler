# Interview Scheduler API server
 This server holds and serves the data that is displayed in the scheduler app, it is served separately from the client interface react server

## Create the DB
1. start postgres with the command `sudo -i -u postgres to start postgres` then `psql` to enter the postgres environment
2. Run the command `CREATE ROLE development LOGIN PASSWORD 'development';` to create the database user.
3. Create a database under the new user with the command `CREATE DATABASE scheduler_development WITH OWNER = development;`.

## Setup
1. Install server dependencies using the `npm install` command from dataBaseServer directory. 
2. Start the web server using the `npm start` command. The app will be served at <http://localhost:8001/>.
3. Go to the url <http://localhost:8001/api/debug/reset> in order to generate the data inside the scheduler_development database

## Routes

- <http://localhost:8001/api/days>

  - Use GET method when performing an API request

  - Response:

```json
[
  {
    "id": 1,
    "name": "Monday",
    "appointments": [1, 2],
    "interviewers": [1, 2],
    "spots": 0
  }
]
```

- <http://localhost:8001/api/appointments>

  - Use GET method when performing an API request

  - Response:

```json
{
  "1": {
    "id": 1,
    "time": "12pm",
    "interview": {
      "student": "Lydia Miller-Jones",
      "interviewer": 1
    }
  },
  "2": {
    "id": 2,
    "time": "1pm",
    "interview": {
      "student": "Archie Cohen",
      "interviewer": 2
    }
  }
}
```

- <http://localhost:8001/api/appointments/:id>

  - Use PUT method when performing an API request

  - Data to send in the body of the API request:

```json
{
  "interview": {
    "student": String,
    "interviewer": Number
  }
}
```

- <http://localhost:8001/api/appointments/:id>

  - Use DELETE method when performing an API request, the id parameter should be the id of the appointment you wish to delete

- <http://localhost:8001/api/interviewers>
  - Use GET method when performing an API request

  - Response:

```json
{
  "1": {
    "id": 1,
    "name": "Sylvia Palmer",
    "avatar": "https://i.imgur.com/LpaY82x.png"
  },
  "2": {
    "id": 2,
    "name": "Tori Malcolm",
    "avatar": "https://i.imgur.com/Nmx0Qxo.png"
  }
}
```

## Database for testing
- The react app features code testing(see readme file located in the reactServer folder for more information). 
- When running tests on cypress run the database server using the command; `npm run test:server` so that the tests run on a separate database.
- after firing the command `npm run test:server` for the first time go to the url <http://localhost:8001/api/debug/reset> in order to generate the data inside the scheduler_test database
- for more information on running Jest tests and storybook, refer to the README file located in the reactServer folder

## Dependencies
- "jest": "^24.8.0"
- "body-parser": "^1.18.3",
- "cors": "^2.8.5",
- "dotenv": "^7.0.0",
- "express": "^4.16.4",
- "helmet": "^3.18.0",
- "pg": "^8.5.0",
- "socket.io": "^2.2.0",
- "ws": "^7.0.0"