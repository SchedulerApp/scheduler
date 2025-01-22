--This file is used to reset the db, when visiting the route http://localhost:8001/api/debug/reset. The files that run when this event is triggered are all files located in the db/schema folder

--Before running "npm run db:reset" you need to manually create the database(CREATE DATABASE scheduler_development)

DROP TABLE IF EXISTS available_interviewers CASCADE;
DROP TABLE IF EXISTS interviews CASCADE;
DROP TABLE IF EXISTS interviewers CASCADE;
DROP TABLE IF EXISTS appointments CASCADE;
DROP TABLE IF EXISTS days CASCADE;

CREATE TABLE days (
  id SERIAL PRIMARY KEY NOT NULL,
  name VARCHAR(255) NOT NULL
);

CREATE TABLE appointments (
  id SERIAL PRIMARY KEY NOT NULL,
  time VARCHAR(255) NOT NULL,
  day_id INTEGER REFERENCES days(id) ON DELETE CASCADE
);

CREATE TABLE interviewers (
  id SERIAL PRIMARY KEY NOT NULL,
  name VARCHAR(255) NOT NULL,
  avatar VARCHAR(255) NOT NULL
);

CREATE TABLE interviews (
  id SERIAL PRIMARY KEY NOT NULL,
  student VARCHAR(255) NOT NULL,
  interviewer_id INTEGER REFERENCES interviewers(id) ON DELETE CASCADE,
  appointment_id INTEGER UNIQUE REFERENCES appointments(id) ON DELETE CASCADE
);

CREATE TABLE available_interviewers (
  id SERIAL PRIMARY KEY NOT NULL,
  day_id INTEGER REFERENCES days(id) ON DELETE CASCADE,
  interviewer_id INTEGER REFERENCES interviewers(id) ON DELETE CASCADE
);
