import React, { useState, useEffect, useRef } from "react";
import axios from "axios";

import "./Main.css";

const Main = () => {
  const [predict, setPredict] = useState({
    plate: "",
    day: "",
    hour: "",
    hasPicoPlaca: false
  });

  const plateElRef = useRef(null);
  const dayElRef = useRef(null);
  const hourElRef = useRef(null);

  const predictPicoPlacaHandler = async e => {
    try {
      e.preventDefault();
      const plate = plateElRef.current.value;
      const day = dayElRef.current.value;
      const hour = hourElRef.current.value;

      const data = { plate, day, hour };

      const response = await axios.post(
        `http://localhost:4000/api/pico-placa/predict`,
        JSON.stringify(data),
        {
          headers: {
            "Content-Type": "application/json"
          }
        }
      );

      if (response.status !== 200 || response.status !== 201) {
        throw new Error("Failed to load resource");
      }
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
          <label htmlFor="hour">Hour</label>
          <input type="text" id="hour" ref={hourElRef} placeholder="Hour" />
        </div>
        <div className="form-control">
          <button onClick={e => predictPicoPlacaHandler(e)}>Predict</button>
        </div>
      </form>
      {predict.hasPicoPlaca && <div>Tiene pico y placa</div>}
    </div>
  );
};

export default Main;
