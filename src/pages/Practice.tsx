import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../App.css";

// user input number from 1 - 12

const Practice = () => {
  const { number: n } = useParams();
  const number = parseInt(n ? n : "12", 10);

  const [value1, setValue1] = useState<number>(0);
  const [value2, setValue2] = useState<number>(0);
  const [currentSolution, setCurrentSolution] = useState<string>("0");

  const [previousAnswers, setPreviousAnswers] = useState<number[]>([]);

  const [previousValues, setPreviousValues] = useState<
    { number: number; amount: number }[]
  >([]);

  const onCheck = () => {
    if (value1 * value2 === parseInt(currentSolution, 10)) {
      generateNewValues();
      setPreviousAnswers([]);
      setCurrentSolution("0");
    } else {
      // incorrect answer
      if (previousAnswers.includes(parseInt(currentSolution, 10))) {
        alert("Answer already tried, try again");
      } else {
        setPreviousAnswers((prev) => [...prev, parseInt(currentSolution, 10)]);
        alert("Incorrect value, try again");
      }
    }
  };

  const appendtoPreviouseValues = (v1: number, v2: number) => {
    if (v1 === v2) {
      const index = previousValues.findIndex((pv) => pv.number === v1);
      if (index === -1) {
        setPreviousValues((prev) => [...prev, { number: v1, amount: 2 }]);
      } else {
        const newValues = [...previousValues];
        newValues[index].amount += 2;
        setPreviousValues(newValues);
      }

      return;
    }

    const index1 = previousValues.findIndex((pv) => pv.number === v1);
    if (index1 === -1) {
      setPreviousValues((prev) => [...prev, { number: v1, amount: 1 }]);
    } else {
      const newValues = [...previousValues];
      newValues[index1].amount += 1;
      setPreviousValues(newValues);
    }

    const index2 = previousValues.findIndex((pv) => pv.number === v2);
    if (index2 === -1) {
      setPreviousValues((prev) => [...prev, { number: v2, amount: 1 }]);
    } else {
      const newValues = [...previousValues];
      newValues[index2].amount += 1;
      setPreviousValues(newValues);
    }
  };

  const generateNewValues = () => {
    const newValue1 = generateRandomNumber();
    const newValue2 = generateRandomNumber();
    setValue1(newValue1);
    setValue2(newValue2);

    appendtoPreviouseValues(newValue1, newValue2);

    setTimeout(() => {
      console.log(previousValues);
    }, 1000);
  };

  const generateRandomNumber = () => {
    const newNumber = Math.floor(Math.random() * number) + 1;

    const counts = {};
    let total = 0;

    for (const value of previousValues) {
      counts[value.number] = (counts[value.number] || 0) + 1;
      total++;
    }

    const averageCount = total / number;

    const ratio = (counts[newNumber] || 0) / averageCount;

    const significantRatio = 1.25;
    if (ratio > significantRatio) {
      return generateRandomNumber();
    }

    return newNumber;
  };

  const handleReset = () => {
    setValue1(0);
    setValue2(0);
    setCurrentSolution("0");
    setPreviousAnswers([]);
    setPreviousValues([]);
  };

  useEffect(() => {
    if (number < 1 || number > 12) {
      window.history.back();
      alert("Invalid number, please enter a number between 1 and 12");
    }

    generateNewValues();
    return handleReset;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [number]);

  return (
    <div className="App">
      <div>
        <h3>Checking times tables below {number + 1}</h3>
        <p>
          {value1} x {value2} ={" "}
        </p>
        <input
          type="number"
          value={currentSolution}
          onChange={(e) => setCurrentSolution(e.target.value)}
        />
        <button onClick={onCheck}>Check</button>
      </div>
      <div>
        {/* show the previousValues */}
        <h3>Previous Values</h3>
        <ul>
          {previousValues
            .sort((o1, o2) => o1.number - o2.number)
            .map((pv) => (
              <li key={pv.number}>
                <p>{pv.number}</p>
                <p>Generated: {pv.amount}</p>
              </li>
            ))}
        </ul>
      </div>
      <button onClick={() => window.history.back()}>Back</button>
    </div>
  );
};

export default Practice;
