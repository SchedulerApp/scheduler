import React from "react";
import { render, cleanup, fireEvent, waitForElement, getByText, prettyDOM, getAllByTestId, getByAltText, getByPlaceholderText, queryByText, waitForElementToBeRemoved } from "@testing-library/react";

import Application from "components/Application";
import axios from "axios";

afterEach(cleanup);

describe("Form", () => {
  it("defaults to Monday and changes the schedule when a new day is selected",
    () => {
      const { getByText } = render(<Application />);

      return waitForElement(() => getByText("Monday"))
        .then(() => {
          fireEvent.click(getByText("Tuesday"));
          expect(getByText("Leopold Silvers")).toBeInTheDocument();
        });
    });

  it("loads data, books an interview and reduces the spots remaining for the first day by 1",
    async() => {
    //render application
      const { container } = render(<Application />);

      //wait till the DOM is fully loaded (this is checked by waiting till an element with the name "Archie Cohen" has been loaded)
      await waitForElement(() => getByText(container, "Archie Cohen"));
      const appointments = getAllByTestId(container, "appointment");
      const appointment = appointments[0];

      //click add new interview button
      fireEvent.click(getByAltText(appointment, "Add"));
      //add a student name to form
      fireEvent.change(
        getByPlaceholderText(
          //in <article> element there is an attribute called data-testid="appointment", by selecting "appointment we are zeroing into the HTML element we intend to interact with"
          appointment,
          //The form has a text input field with a placeholder text; "enter student name", bellow we are referencing that text to overwrite it with the desired value
          /enter student name/i), {
          //target will set a value to a prop inside <article element>
          target: { value: "Lydia Miller-Jones" }
        });

      //set an interviewer
      fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));
      //save changes
      fireEvent.click(getByText(appointment, "Save"));
      //Check if the status changed to "Saving"
      expect(getByText(appointment, "Saving")).toBeInTheDocument();
      //Wait until the element with the name "Lydia Miller-Jones" is displayed/loaded.
      await waitForElement(() => queryByText(appointment, "Lydia Miller-Jones"));
    
      const day = getAllByTestId(container, "day").find(day =>
        queryByText(day, "Monday")
      );
    
      //Check that after adding an appointment there are no more spots remaining
      expect(getByText(day, "no spots remaining")).toBeInTheDocument();

    //the console log below will display the HTML element we are manipulating
    //console.log(prettyDOM(appointment))
    });

  it("loads data, cancels an interview and increases the spots remaining for Monday by 1", async() => {
    // 1. Render the Application.
    const { container } = render(<Application />);
    
    // 2. Wait until the text "Archie Cohen" is displayed.
    await waitForElement(() => getByText(container, "Archie Cohen"));
    
    // 3. Click the "Delete" button on the booked appointment.
    const appointment = getAllByTestId(container, "appointment").find(
      appointment => queryByText(appointment, "Archie Cohen")
    );
    fireEvent.click(getByAltText(appointment, "Delete"));
    
    // 4. Check that the confirmation message is shown.
    expect(getByText(appointment, "Are you sure you would like to delete?")).toBeInTheDocument();
    
    // 5. Click the "Confirm" button on the confirmation.
    fireEvent.click(getByText(appointment, "Confirm"));
    
    // 6. Check that the element with the text "Deleting" is displayed.
    expect(getByText(appointment, "Deleting")).toBeInTheDocument();
    
    // 7. Wait until the element with the "Add" button is displayed.
    await waitForElement(() => getByAltText(appointment, "Add"));
    
    // 8. Check that the DayListItem with the text "Monday" also has the text "2 spots remaining".
    const day = getAllByTestId(container, "day").find(day =>
      queryByText(day, "Monday")
    );
    expect(getByText(day, "2 spots remaining")).toBeInTheDocument();
    
  });
  
  it("loads data, edits an interview and keeps the spots remaining for Monday the same", async() => {
    // 1. Render the Application.
    const { container } = render(<Application />);
    
    // 2. Wait until the text "Archie Cohen" is displayed.
    await waitForElement(() => getByText(container, "Archie Cohen"));
    
    // 3. Click the "Edit" button on the booked appointment.
    const appointment = getAllByTestId(container, "appointment")
      .find(
        appointment => queryByText(appointment, "Archie Cohen")
      );
    fireEvent.click(getByAltText(appointment, "Edit"));
      
    // 4. Change student name
    fireEvent.change(
      getByPlaceholderText(
        appointment,
        /enter student name/i), {
        target: { value: "Lydia Miller-Jones" }
      }
    );
          
    // 5. Change interviewer
    fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));
    // 6. Click Save
    fireEvent.click(getByText(appointment, "Save"));
    // 7. Check that it is in saving mode
    expect(getByText(appointment, "Saving")).toBeInTheDocument();
    // 8. Wait until the element with the name "Lydia Miller-Jones" is displayed/loaded.
    await waitForElement(() => queryByText(appointment, "Lydia Miller-Jones"));
    
    const day = getAllByTestId(container, "day").find(day =>
      queryByText(day, "Monday")
    );
    
    // 9. Check that the DayListItem with the text "Monday" also has the text "1 spots remaining".
    expect(getByText(day, "1 spot remaining")).toBeInTheDocument();
  });
  
  it("shows the save error when failing to save an appointment", async() => {
    //trigger a failure when performing a put request
    axios.put.mockRejectedValueOnce();

    // 1. Render the Application.
    const { container } = render(<Application />);
    
    // 2. Wait until the text "Archie Cohen" is displayed.
    await waitForElement(() => getByText(container, "Archie Cohen"));
    
    // 3. Click the "Edit" button on the booked appointment.
    const appointment = getAllByTestId(container, "appointment").find(
      appointment => queryByText(appointment, "Archie Cohen")
    );
    fireEvent.click(getByAltText(appointment, "Edit"));
    
    // 5. Change interviewer
    fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));
    // 6. Click Save
    fireEvent.click(getByText(appointment, "Save"));
    // 7. Check that it is in saving mode
    expect(getByText(appointment, "Saving")).toBeInTheDocument();
    // 8. wait for saving mode to be removed
    await waitForElementToBeRemoved(() => getByText(appointment, "Saving"));
    // 9. Check that it could not save
    expect(getByText(appointment, "Could not save appointment")).toBeInTheDocument();
  });

  it("shows the delete error when failing to delete an existing appointment", async() => {
    //trigger a failure when performing a delete request
    axios.delete.mockRejectedValueOnce();

    // 1. Render the Application.
    const { container } = render(<Application />);
    
    // 2. Wait until the text "Archie Cohen" is displayed.
    await waitForElement(() => getByText(container, "Archie Cohen"));
    
    // 3. Click the "Delete" button on the booked appointment.
    const appointment = getAllByTestId(container, "appointment").find(
      appointment => queryByText(appointment, "Archie Cohen")
    );
    fireEvent.click(getByAltText(appointment, "Delete"));
    
    // 4. Check that the confirmation message is shown.
    expect(getByText(appointment, "Are you sure you would like to delete?")).toBeInTheDocument();
    
    // 5. Click the "Confirm" button on the confirmation.
    fireEvent.click(getByText(appointment, "Confirm"));
    
    // 6. Check that the element with the text "Deleting" is displayed.
    expect(getByText(appointment, "Deleting")).toBeInTheDocument();
    // 8. wait for deleting mode to be removed
    await waitForElementToBeRemoved(() => getByText(appointment, "Deleting"));
    // 9. Check that it could not delete
    expect(getByText(appointment, "Could not delete appointment")).toBeInTheDocument();
  });
});
