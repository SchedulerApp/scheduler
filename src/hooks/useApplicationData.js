import { useState, useEffect } from "react";
import axios from "axios";

//Manages the state changes from the component rendered in Application.js file
export default function useApplicationData() {
  //setting the default states
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  //When an interview is booked or deleted the amount of spots remaining for the particular day is updated within this function.
  function updateSpots(appointments) {

    //hold the index for the selected day
    let index;
    let mutatedDays = {};
    let remainingSpots = 0;

    //loop through days, find the selected day and set index to the corresponding day
    state.days.map((day) =>{
      if (state.day === day.name) {
        return index = day.id - 1;
      }
      return null;
    });

    //when index is assigned a value use that to find the spots remaining for the selected day and update the value
    if (index !== undefined) {
      
      //count remaining spots
      state.days[index].appointments.map((appointmentId)=>{
        if (!appointments[`${appointmentId}`].interview) {
          return remainingSpots += 1;
        }
        return null;
      });
      
      //change the day array
      mutatedDays = {
        ...state.days,
        [index]: {...state.days[index], spots: remainingSpots}
      };

    }

    //this is the new array of days to place in state
    const mutatedDaysArr = Object.values(mutatedDays);
    

    if (mutatedDaysArr.length > 0) {
      return mutatedDaysArr;
    }
    return null;
  }

  //The function is called in the components/Appointment/index.js file as a passed down prop. It creates an object using current state values then sends that info through an API request in order to save a new appointment in the database. After all that it updates the current state with the new data that wat typed in the form(this is triggered when the save button is clicked)
  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    const days = updateSpots(appointments);
    
    return axios
      // .put(`http://localhost:8001/api/appointments/${id}`,
      .put(`http://54.236.160.67:8001/api/appointments/${id}`,
        appointment
      )
      .then(() => {
        
        setState({
          ...state,
          days,
          appointments
        });

      });
  }

  //Find the appointment by the passed in id and set it equal to null, then do an API request to delete the selected appointment and when the request is resolved update the state to also remove the appointment
  function cancelInterview(id) {
    
    const interview = {
      ...state.appointments[id],
      interview: null
    };
    const appointments = {
      ...state.appointments,
      [id]: interview
    };

    const days = updateSpots(appointments);
   

    return axios
      // .delete(`http://localhost:8001/api/appointments/${id}`)
      .delete(`http://54.236.160.67:8001/api/appointments/${id}`)
      .then(() => {
        setState({
          ...state,
          days,
          appointments
        });
      });
  }

  //updates the day value inside state object
  const setDay = day => setState((prev) => ({ ...prev, day }));

  //API request to the database for days array

  useEffect(() => {

    //this axios API request is used to reset the database every time a new user accesses the website, so that there is no accumulation of unexpected info for the next user
    // axios.get("http://localhost:8001/api/debug/reset")
    axios.get("http://54.236.160.67:8001/api/debug/reset")

          //as soon as the database is reset all of the default database info is loaded and displayed to the user. Every time the page refreshed the database will go back to the default values
         .then(() =>{

          Promise.all([
            // axios.get("http://localhost:8001/api/days"),
            axios.get("http://54.236.160.67:8001/api/days"),
            // axios.get("http://localhost:8001/api/appointments"),
            axios.get("http://54.236.160.67:8001/api/appointments"),
            // axios.get("http://localhost:8001/api/interviewers")
            axios.get("http://54.236.160.67:8001/api/interviewers")
          ])
            .then((all) => {
              setState((prev) => {
                if (all[0].data) {
                  return ({
                    ...prev,
                    days: all[0].data,
                    appointments: all[1].data,
                    interviewers: all[2].data
                  });
                } else {
                  return ({
                    ...prev,
                    days: all[0],
                    appointments: all[1],
                    interviewers: all[2]
                  });
                }
              });
            });
      

         })

    
  },[]);

  const finalObj = {
    state,
    setDay,
    bookInterview,
    cancelInterview,
  };
  return finalObj;
}