import React, { useState } from "react";
import { Formik, Form } from "formik";
import {
  Button,
  TextField,
  FormControl,
  FormHelperText,
  FormGroup,
  InputLabel,
  Select,
  MenuItem
} from "@material-ui/core";

import axios from "axios";

import CONSTANTS from "../../config/constants";
import validationSchema from "../../schemas/picoPlacaValidationSchema";

const Main = () => {
  const [values, setValues] = useState({
    plate: "",
    day: "",
    time: "07:00"
  });

  const [message, setMessage] = useState("");

  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

  const predictPicoPlacaHandler = async data => {
    try {
      const time = data.time.replace(":", "");
      const values = { ...data, time };

      const response = await axios.post(
        `${CONSTANTS.API}/api/pico-placa/predict`,
        JSON.stringify(values),
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

  const menuItemDays = () => {
    const menuItemDaysComponent = days.map(day => {
      return (
        <MenuItem key={day} value={day}>
          {day}
        </MenuItem>
      );
    });
    return menuItemDaysComponent;
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
              <FormControl error={!!errors.day}>
                <InputLabel id="day" style={{ paddingLeft: "6%" }}>
                  Day
                </InputLabel>
                <Select
                  labelId="day"
                  variant="outlined"
                  id="day"
                  name="day"
                  value={values.day}
                  placeholder="Day"
                  onChange={handleChange}
                  onBlur={handleBlur}
                >
                  {menuItemDays()}
                </Select>
                {errors.day && <FormHelperText>{errors.day}</FormHelperText>}
              </FormControl>
            </FormGroup>
            <br />
            <FormGroup>
              <TextField
                type="time"
                label="Time"
                variant="outlined"
                id="time"
                name="time"
                value={values.time}
                onChange={handleChange}
                onBlur={handleBlur}
                helperText={errors.time}
                error={!!errors.time}
                inputProps={{
                  step: 300
                }}
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
            {/* <pre>{JSON.stringify(errors)}</pre> */}
          </Form>
        )}
      </Formik>
      {message && <div>{message}</div>}
    </div>
  );
};

export default Main;
