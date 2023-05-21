import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { MobileDatePicker } from '@mui/x-date-pickers';
import dayjs, { Dayjs } from 'dayjs';
import { CircularProgress } from '@mui/material';

function App() {
  const [start, setStart] = useState<Dayjs | null>(null);
  const [exp, setExp] = useState<Dayjs | null>(null);
  const [current, setCurrent] = useState<number>(0);
  const [days, setDays] = useState<number | null>(null);

  const currentDate = dayjs();

  useEffect(() => {
    calculateDaysBetweenDates();
  }, [start, exp]);

  const calculateDaysBetweenDates = () => {
    if (start && exp) {
      const totalDays = exp.diff(start, 'day');
      const daysPassed = currentDate.diff(start, 'day');
      const percentage = (daysPassed / totalDays) * 100;
      setCurrent(Math.round(percentage));
      setDays(totalDays);
    }
  };

  const firstDateHandler = (newValue: Dayjs | null) => {
    setStart(newValue);
  };

  const secondDateHandler = (newValue: Dayjs | null) => {
    setExp(newValue);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.tsx</code> and save to reload.
          </p>
          <a className="App-link" href="https://reactjs.org" target="_blank" rel="noopener noreferrer">
            Learn React
          </a>
          <MobileDatePicker value={start} onChange={firstDateHandler} />
          <MobileDatePicker value={exp} onChange={secondDateHandler} />
          {days !== null && <div>{current + '%'}</div>}
          {days !== null && <CircularProgress variant="determinate" value={current} />}
        </header>
      </div>
    </LocalizationProvider>
  );
}

export default App;
