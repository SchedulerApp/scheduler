import React from "react";
import DayListItem from "components/DayListItem";

//Render a list of <DayListItem> components passing in default props
//iterate through an array of objects and for each object render an HTML element
export default function DayList(props) {
  const days = props.days.map((day) => {
     
    return (
      <DayListItem
        key = {day.id}
        name = {day.name}
        spots = {day.spots}
        selected = {day.name === props.value}
        setDay = {props.onChange}
      />
    );
  });

  return (
    <ul>
      {days}
    </ul>
  );

}