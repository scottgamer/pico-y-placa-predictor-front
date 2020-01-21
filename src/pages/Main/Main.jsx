import React, { useState, useEffect, useRef } from "react";

import "./Main.css";

const Main = () => {
  const [predict, setPredict] = useState({
    plate: "",
    day: "",
    hour: ""
  });

  const plateElRef = useRef(null);
  const dayElRef = useRef(null);
  const hourElRef = useRef(null);

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
          <input
            type="text"
            id="hour"
            ref={hourElRef}
            placeholder="hour number"
          />
        </div>
      </form>
    </div>
  );
};

export default Main;
