import React, { useState, useEffect } from 'react';
import './App.css';
import logo from '../images/magodeltiempo.jpg'

const App = () => {
  const [minutes, setMinutes] = useState(25);
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [isBreak, setIsBreak] = useState(false);

  useEffect(() => {
    let interval = null;

    if (isActive) {
      interval = setInterval(() => {
        if (seconds === 0) {
          if (minutes === 0) {
            if (isBreak) {
              setMinutes(25);
              setSeconds(0);
              setIsBreak(false);
            } else {
              setMinutes(5);
              setSeconds(0);
              setIsBreak(true);
            }
          } else {
            setMinutes(minutes - 1);
            setSeconds(59);
          }
        } else {
          setSeconds(seconds - 1);
        }
      }, 1000);
    } else if (!isActive && seconds !== 0) {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [isActive, seconds, minutes, isBreak]);

  const toggleTimer = () => setIsActive(!isActive);
  const resetTimer = () => {
    setIsActive(false);
    setMinutes(25);
    setSeconds(0);
    setIsBreak(false);
  };

  return (
    <div className="timer">
      <img src={logo} alt="Logo" className="logo" />
      <h1>{isBreak ? 'Break de tiempo!' : 'Reloj Pomodoro'}</h1>
      <div className="time">
        {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
      </div>
      <button onClick={toggleTimer}>
        {isActive ? 'Pausa' : 'Empezar'}
      </button>
      <button onClick={resetTimer}>Resetear</button>
    </div>
  );
};

export default App;
