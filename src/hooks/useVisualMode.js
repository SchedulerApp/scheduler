import { useState } from "react";

//custom hook that keep track of previous state, so that you can go back one step
export function useVisualMode(initialMode) {
  const [mode, setMode] = useState(initialMode);
  const [history, setHistory] = useState([initialMode]);
  
  //transition to the next state
  function transition(newMode, replace = false) {

    if (replace) {
      setHistory((prev) => [...prev]);
      setMode(newMode);
    } else {
      //add the newest state to history(this method of storing data is called stack data structure. Where you store info in an array and to go back one step you use history.pop() to delete the last value(which would be the current), the access the last data value of the array)
      setHistory((prev) => [...prev, newMode]);
      setMode(newMode);
    }
  }
  
  //store previous state
  function back() {
    //This checks if the history has at least more than one item, otherwise the code that comes next would delete the last remaining item from the array then try to access a a null array
    if (history.length > 1) {
      //we are going to use .pop() method, this will mutate the array, so we need to make a copy of the original array beforehand
      let historyCopy = [...history];
      historyCopy.pop();
      setHistory(historyCopy);
      setMode(historyCopy[historyCopy.length - 1]);
    }
  }

  return {mode, transition, back};
}