import React, { useState } from "react";
import { Formik, Form } from "formik";
import { Button, TextField, FormGroup } from "@material-ui/core";

import "date-fns";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker
} from "@material-ui/pickers";
import axios from "axios";

import validationSchema from "../../schemas/picoPlacaValidationSchema";

const Main = () => {
  const [values, setValues] = useState({
    plate: "",
    day: "",
    time: ""
  });

  const [message, setMessage] = useState("");
  const [selectedDate, setSelectedDate] = useState(new Date());

  const predictPicoPlacaHandler = async data => {
    try {
      const response = await axios.post(
        `http://localhost:4000/api/pico-placa/predict`,
        JSON.stringify(data),
        {
          headers: {
            "Content-Type": "application/json"
          }
        }
      );

      const message = response.data.message;
      setMessage(message);
    } catch (error) {
      console.log(error);
    }
  };

  // TODO: finish handling values form date and time picker
  const handleDateChange = date => {
    setSelectedDate(date);
  };

  return (
    <div>
      <Formik
        initialValues={values}
        validationSchema={validationSchema}
        onSubmit={(data, { setSubmitting }) => {
          setSubmitting(true);
          predictPicoPlacaHandler(data);
          setSubmitting(false);
        }}
      >
        {({ values, errors, isSubmitting, handleChange, handleBlur }) => (
          <Form>
            <FormGroup>
              <TextField
                label="Plate"
                variant="outlined"
                id="plate"
                name="plate"
                value={values.plate}
                placeholder="PIB1234"
                onChange={handleChange}
                onBlur={handleBlur}
                helperText={errors.plate}
                error={!!errors.plate}
              />
            </FormGroup>
            <br />
            <FormGroup>
              <TextField
                label="Day"
                variant="outlined"
                id="day"
                name="day"
                value={values.day}
                placeholder="Monday"
                onChange={handleChange}
                onBlur={handleBlur}
                helperText={errors.day}
                error={!!errors.day}
              />
            </FormGroup>

            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <KeyboardDatePicker
                disableToolbar
                variant="inline"
                format="dd/MM/yyyy"
                margin="normal"
                id="date-picker-inline"
                label="Select date"
                value={selectedDate}
                onChange={handleDateChange}
                helperText={errors.day}
                error={!!errors.day}
                KeyboardButtonProps={{
                  "aria-label": "change date"
                }}
              />
              <br />
              <KeyboardTimePicker
              variant="inline"
                margin="normal"
                id="time-picker"
                label="Time picker"
                value={selectedDate}
                onChange={handleDateChange}
                KeyboardButtonProps={{
                  "aria-label": "change time"
                }}
              />
            </MuiPickersUtilsProvider>
            <br />
            <FormGroup>
              <TextField
                label="Time"
                variant="outlined"
                id="time"
                name="time"
                value={values.time}
                placeholder="0700"
                onChange={handleChange}
                onBlur={handleBlur}
                helperText={errors.time}
                error={!!errors.time}
              />
            </FormGroup>
            <br />
            <div>
              <Button
                variant="contained"
                color="primary"
                disabled={isSubmitting}
                type="submit"
              >
                Can I drive?
              </Button>
            </div>
            <pre>{JSON.stringify(errors)}</pre>
          </Form>
        )}
      </Formik>
      {message && <div>{message}</div>}
    </div>
  );
};

export default Main;
