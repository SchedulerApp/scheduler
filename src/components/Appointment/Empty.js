import React from "react";

//Render element for adding a new appointment
export default function Empty(props) {
  return (
    
    <main className="appointment__add">
      <img
        onClick={props.onAdd}
        className="appointment__add-button"
        src="images/add.png"
        alt="Add"
      />
    </main>
    
  );
}