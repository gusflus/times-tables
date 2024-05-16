import React, { useState } from "react";
import "../App.css";

const Choose = () => {
  const [currentValue, setCurrentValue] = useState<string>("0");

  return (
    <div className="App">
      <h3>Practice your times tables</h3>
      <p>enter a number betweem 1 and 12: </p>
      <input
        type="number"
        value={currentValue}
        onChange={(e) => setCurrentValue(e.target.value)}
      />
      <a href={`/#/practice/${currentValue}`}>
        <button>Submit</button>
      </a>
    </div>
  );
};

export default Choose;
