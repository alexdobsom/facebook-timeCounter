import React, { useState, useEffect } from "react";

const Counter = () => {
  const [isStarted, setIsStarted] = useState(false);
  const [isReset, setIsReset] = useState(true);
  const [seconds, setSeconds] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [hours, setHours] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (isStarted === false) return;
      if (minutes >= 59) {
        setHours(prev => prev + 1);
        setMinutes(0);
      }
      if (seconds >= 59) {
        setMinutes(prev => prev + 1);
        setSeconds(0);
      } else {
        setSeconds(prev => prev + 1);
      }
    }, 1000);
    return () => clearTimeout(timer);
  }, [seconds, isStarted]);

  const startCounter = () => {
    setIsStarted(prev => !prev);
    setIsReset(false);
  };
  const resetTime = () => {
    setIsStarted(false);
    setIsReset(true);
    setSeconds(0);
    setMinutes(0);
    setHours(0);
  };

  const ss = seconds.toString().padStart(2, "0");
  const mm = minutes.toString().padStart(2, "0");
  const hh = hours.toString().padStart(2, "0");

  // const handleSubmit = e => {
  //   e.preventDefault();
  //   e.target.value = 0;
  // };

  return (
    <div>
      <div className="timerContainer">
        <div className="liveLabel">
          <p className={!isStarted && `dim-text`}>Live</p>
        </div>
        <div className="time">
          <p className={hours === 0 && `dim`}>{hh}</p>
          <p className="dim-text">:</p>
          <p className={minutes === 0 && hours <= 0 && `dim`}>{mm}</p>
          <p className="dim-text">:</p>
          <p className={seconds === 0 && minutes <= 0 && `dim`}>{ss}</p>
        </div>
      </div>
      {/* <form className="inputContainer" onSubmit={e => handleSubmit(e)}>
        <input
          placeholder={hours}
          type="number"
          min="0"
          max="23"
          step="1"
          onChange={e => setHours(e.target.value)}
        />
        <input
          placeholder={minutes}
          type="number"
          min="0"
          max="59"
          step="1"
          onChange={e => setMinutes(e.target.value)}
        />
        <input
          placeholder={seconds}
          type="number"
          min="0"
          max="59"
          step="1"
          onChange={e => setSeconds(e.target.value)}
        />
        <button type="submit" value="Clear">
          Clear
        </button>
      </form> */}
      <div className="buttonsContainer">
        <button onClick={startCounter} className="buttonsContainer__button">
          {isStarted ? "Pause" : "Start"} Counter
        </button>
        <button
          disabled={isReset ? true : false}
          onClick={resetTime}
          className="buttonsContainer__button"
        >
          Reset Time
        </button>
      </div>
    </div>
  );
};

export default Counter;
