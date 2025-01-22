import React from "react";
import classNames from "classnames";

import "components/DayListItem.scss";

//This renders a single HTML element. In the left menu. these work as buttons but they also display information: Week Day, spots remaining
//Depending on the state it displays different styles: default style, not selected, selected, hover(handled by scss), schedule is full for the day (0 spots remaining)
export default function DayListItem(props) {
  //classnames is a js module it takes in 2 parameters, a string and an object, the string will always return but the object will return the key(s) only if the value of that key equals to truthy. This module is better than using if statements
  let dayClass = classNames(
    //button will always return as a classnames since it's the default class
    'day-list__item',
    {
      //this will only return if "confirm" is passed as a prop, same for the pairs below
      "day-list__item--selected": props.selected,
      "day-list__item--full": (props.spots === 0)
    }
  );
  
  //display different text string depending on what comes in as props.spots
  const formatSpots = (props) => {
    if (props.spots === 1) {
      return props.spots + " spot remaining";
    }

    if (props.spots > 1) {
      return props.spots + " spots remaining";
    }

    if (props.spots === 0) {
      return "no spots remaining";
    }
  };

  return (
    <li
      data-testid="day"
      onClick={() => props.setDay(props.name)}
      className={dayClass}
    >
      <h2 className="text--regular">{props.name}</h2>
      <h3 className="text--light">{formatSpots(props)}</h3>
    </li>
  );
}