import React, {useState} from 'react';
import Button from "components/Button";
import InterviewerList from "components/InterviewerList.js";
import "components/Appointment/styles.scss";

//Render element to create edit or delete a new appointment
export default function Form(props) {
  
  const [student, setStudent] = useState(props.student || "");
  const [interviewer, setInterviewer] = useState(props.interviewer || null);
  const [error, setError] = useState("");

  const reset = () => {
    setStudent("");
    setInterviewer(null);
  };
  const cancel = () => {
    reset();
    props.onCancel();
  };

  //Checks if a name was typed into the form and if an instructor was selected, otherwise don't save the appointment
  const validate = () => {
    if (student && interviewer) {
      setError("");
      return props.onSave(student, interviewer);
    }

    if (!interviewer) {
      setError("Please select an interviewer");
    }

    if (!student) {
      setError("Student name cannot be blank");
    }
  };

  return (

    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form onSubmit={event => event.preventDefault()} autoComplete="off">
          <input
            className="appointment__create-input text--semi-bold"
            name="name"
            type="text"
            placeholder="Enter Student Name"
            value={student}
            //The student state stores the info typed into the form. If an existing interview is edited the student state will automatically be populated with the name of the student from the appointment being edited
            onChange={(event) => {
              setError("");
              setStudent(event.target.value);
            }}
            data-testid="student-name-input"
          />
          <section className="appointment__validation">
            {error}
          </section>
        </form>
        <InterviewerList
          interviewers={props.interviewers}
          value={interviewer}
          onChange = {setInterviewer}
        />
      </section>
      
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button onClick={cancel} danger>
            Cancel
          </Button>
          
          <Button
            onClick={
              validate
            }
            confirm
          >Save
          </Button>

        </section>
      </section>
    </main>

  );
}