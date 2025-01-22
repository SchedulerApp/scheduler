import React from "react";
import classNames from "classnames";

import "components/Button.scss";

//create a default button element that dynamically changes style and name based on props passed in
export default function Button(props) {
    
   

  //classnames is a js module it takes in 2 parameters, a string and an object, the string will always return but the object will return the key(s) only if the value of that key equals to truthy. This module is better than using if statements
  let buttonClass = classNames(
    //button will always return as a classname since it's the default class
    'button',
    {
      //this will only return if "confirm" is passed as a prop, same for the pairs below
      "button--confirm": props.confirm,
      "button--danger": props.danger
    }
  );
  return (
    <button
      className={buttonClass}
      onClick={props.onClick}
      disabled={props.disabled}
    >
      {props.children}
    </button>
  );
}