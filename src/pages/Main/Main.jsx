import React, { useState } from "react";
import { Formik, Form } from "formik";
import { Button, TextField } from "@material-ui/core";
import axios from "axios";

import "./Main.css";

import validationSchema from "../../schemas/picoPlacaValidationSchema";

const Main = () => {
  const [values, setValues] = useState({
    plate: "",
    day: "",
    time: ""
  });

  const [message, setMessage] = useState("");

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

  return (
    <div>
      <Formik
        initialValues={values}
        // validate={values => {}}
        onSubmit={(data, { setSubmitting }) => {
          setSubmitting(true);
          predictPicoPlacaHandler(data);
          setSubmitting(false);
        }}
      >
        {({ values, isSubmitting, handleChange, handleBlur, handleSubmit }) => (
          <Form>
            <TextField
              label="Plate"
              variant="outlined"
              id="plate"
              name="plate"
              value={values.plate}
              placeholder="PIB1234"
              onChange={handleChange}
              onBlur={handleBlur}
            />

            <TextField
              label="Day"
              variant="outlined"
              id="day"
              name="day"
              value={values.day}
              placeholder="Monday"
              onChange={handleChange}
              onBlur={handleBlur}
            />
            <TextField
              label="Time"
              variant="outlined"
              id="time"
              name="time"
              value={values.time}
              placeholder="0700"
              onChange={handleChange}
              onBlur={handleBlur}
            />

            <div>
              <Button disabled={isSubmitting} type="submit">
                Can I drive?
              </Button>
            </div>
          </Form>
        )}
      </Formik>
      {message && <div>{message}</div>}
    </div>
  );
};

export default Main;
