import React, { useState, useEffect, useRef } from "react";
import { useFormik } from "formik";
import axios from "axios";

import "./Main.css";

import validationSchema from "../../schemas/picoPlacaValidationSchema";

const Main = () => {
  const [predict, setPredict] = useState({
    plate: "",
    day: "",
    time: ""
  });

  const [message, setMessage] = useState("");

  const plateElRef = useRef(null);
  const dayElRef = useRef(null);
  const timeElRef = useRef(null);

  const predictPicoPlacaHandler = async e => {
    try {
      e.preventDefault();
      const plate = plateElRef.current.value;
      const day = dayElRef.current.value;
      const time = timeElRef.current.value;

      const data = { plate, day, time };

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
      <form>
        <div className="form-control">
          <label htmlFor="plate">Plate number</label>
          <input
            type="text"
            id="plate"
            ref={plateElRef}
            placeholder="Plate number"
          />
        </div>
        <div className="form-control">
          <label htmlFor="day">Day</label>
          <input type="text" id="day" ref={dayElRef} placeholder="Day" />
        </div>
        <div className="form-control">
          <label htmlFor="time">Time</label>
          <input type="text" id="time" ref={timeElRef} placeholder="Time" />
        </div>
        <div className="form-control">
          <button onClick={e => predictPicoPlacaHandler(e)}>Predict</button>
        </div>
      </form>
      {message && <div>{message}</div>}
    </div>
  );
};

export default Main;
