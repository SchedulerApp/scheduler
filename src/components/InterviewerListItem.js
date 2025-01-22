import React from "react";
import classNames from "classnames";
import "components/InterviewerListItem.scss";


//this is renders a single item for an interviewer
//Depending on the state it displays different styles
export default function InterviewerListItem(props) {
  
  //apply different classes depending on the state
  let interviewerClass = classNames(
    "interviewers__item",
    {
      "interviewers__item--selected": props.selected
    }
  );

  return (
    <li
      className={interviewerClass}
      onClick={props.setInterviewer}
    >
      <img
        className="interviewers__item-image"
        src={props.avatar}
        alt={props.name}
      />
      {props.selected && props.name}
    </li>
  );
}