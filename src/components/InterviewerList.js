import React from "react";
import "components/InterviewerList.scss";
import InterviewerListItem from "components/InterviewerListItem";
import PropTypes from 'prop-types';

//Render a list of InterviewerListItem components passing in default props
//iterate through an array of objects and for each object render an HTML element
function InterviewerList(props) {
  
  const interviewers = props.interviewers.map((interviewer) => {
    return (
      <InterviewerListItem
        key = {interviewer.id}
        name = {interviewer.name}
        avatar = {interviewer.avatar}
        selected = {interviewer.id === props.value}
        setInterviewer = {() => props.onChange(interviewer.id)}
      />
    );
  });

  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">{interviewers}</ul>
    </section>
  );
}

//using propTypes to limit the interviewers prop to be an array
InterviewerList.propTypes = {
  interviewers: PropTypes.array.isRequired
};

export default InterviewerList;