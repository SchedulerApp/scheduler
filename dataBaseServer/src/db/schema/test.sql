-- This app features code testing. The data below is generated separately so that tests aren't being performed on the main database (see readme file located in the reactServer folder for more information). 
-- When running tests on cypress run the server using the command; `npm run test:server` to run tests on a separate database.
-- after firing the command `npm run test:server` for the first time go to the url <http://localhost:8001/api/debug/reset> in order to trigger this file and generate data for testing.

WITH days(day) AS (
  VALUES ( 'Monday' ), ( 'Tuesday' )
)
INSERT INTO days (name)
SELECT day FROM days;

WITH times(time) AS (
	VALUES ('12pm'), ('1pm')
)
INSERT INTO appointments (time, day_id)
SELECT time, id as day_id FROM days, times ORDER BY day_id, time;

INSERT INTO interviewers (name, avatar)
VALUES
  ('Sylvia Palmer', 'https://i.imgur.com/LpaY82x.png'),
  ('Tori Malcolm', 'https://i.imgur.com/Nmx0Qxo.png');

INSERT INTO available_interviewers (day_id, interviewer_id)
SELECT 1 as day_id, interviewers.interviewer_id FROM ( SELECT id AS interviewer_id FROM interviewers ) interviewers;

INSERT INTO available_interviewers (day_id, interviewer_id)
SELECT 2 as day_id, interviewers.interviewer_id FROM ( SELECT id AS interviewer_id FROM interviewers ) interviewers;

INSERT INTO interviews (student, interviewer_id, appointment_id) VALUES ('Archie Cohen', 1, 1);