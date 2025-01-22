import React from "react";

import "components/Application.scss";
import DayList from "components/DayList";
import Appointment from "components/Appointment";

import {getAppointmentsForDay} from '../helpers/selectors.js';
import {getInterviewersForDay} from '../helpers/selectors.js';
import {getInterview} from '../helpers/selectors.js';
import useApplicationData from '../hooks/useApplicationData.js';

export default function Application() {
  //variables below manages the state changes from the component rendered in Application.js file
  const {
    state,
    setDay,
    bookInterview,
    cancelInterview,
  } = useApplicationData();

  //set an array with all appointments for a selected day
  const dailyAppointments = getAppointmentsForDay(state, state.day);

  //set an array with all interviewers for a selected day
  const dailyInterviewers = getInterviewersForDay(state, state.day);
  
  //render loop through data and one appointment for each object in the array
  const renderAppointment = dailyAppointments.map((appointment) => {
    
    const interview = getInterview(state, appointment.interview);
    return (
      <Appointment
        key={appointment.id}
        id={appointment.id}
        time={appointment.time}
        interview={interview}
        interviewers={dailyInterviewers}
        bookInterview={bookInterview}
        cancelInterview={cancelInterview}
      />
    );
  });

  //inside nav element add DayList(this element renders one button per each object in an array, this array is defined as "days" declared as an attribute witch is a prop that is then accessed by the elements created within the DayList element)
  
  return (
    <main className="layout">
      
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        
        <nav className="sidebar__menu">
          <DayList
            days={state.days}
            value={state.day}
            onChange={setDay}
          />
        </nav>
        
        <img
          className="sidebar__lhl sidebar--centered"
        />
      </section>

      <section className="schedule">
        {renderAppointment}
        <Appointment key="last" time="5pm/" />
      </section>

    </main>
  );
}
