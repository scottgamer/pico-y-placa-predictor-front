import React from "react";

import "./Main.css";

const Main = () => {
  return (
    <div>
      <form>
        <div className="form-control">
          <label htmlFor="plate">Plate number</label>
          <input
            type="text"
            id="plate"
            // ref={plateElRef}
            placeholder="Plate number"
          />
        </div>
      </form>
    </div>
  );
};

export default Main;
