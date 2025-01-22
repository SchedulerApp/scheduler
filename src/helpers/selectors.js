//state is an object containing days(an array of objects that contains days of the week and related appointments) and appointments(an object of objects containing information regarding each appointment). The function below returns an array of all appointments for a specific day(informed in the second argument)
export function getAppointmentsForDay(state, day) {
  const final = [];
  let appointments;

  //if days data is empty return an empty array
  if (state.days.length === 0) {
    return final;
  }

  //checking the object key for all appointments occurring in the specified date(coming from the argument)
  for (let i of state.days) {
    if (day === i.name) {
      appointments = i.appointments;
    }
  }

  //if the day informed through the argument is not found return an empty array
  if (!appointments) {
    return final;
  }

  //pushing into the final array all objects containing the info on appointments for the specified day
  for (let i of appointments) {
    final.push(state.appointments[`${i}`]);
  }
  return final;
}


//return an object that contains the interview data if it is passed an object that contains an interviewer. Otherwise, the function should return null.
export function getInterview(state, interview) {
  if (interview === null) {
    return null;
  }

  const final = {
    student: interview.student,
    interviewer: state.interviewers[`${interview.interviewer}`]
  };
 
  return final;
}

//takes in a day and the state object and returns an array of all interviewers
export function getInterviewersForDay(state, day) {
  const final = [];
  let interviewersId;

  //if days data is empty return an empty array
  if (state.days.length === 0) {
    return final;
  }

  //checking the object key for all appointments occurring in the specified date(coming from the argument)
  for (let i of state.days) {
    if (day === i.name) {
      interviewersId = i['interviewers'];
    }
  }
  
  //if the day informed through the argument is not found return an empty array
  if (!interviewersId) {
    return final;
  }
  
  //pushing into the final array name of interviewers available on the specified day
  for (let i of interviewersId) {
    if (state.interviewers[`${i}`]) {
      final.push(state.interviewers[`${i}`]);
    }
  }
  return final;
}