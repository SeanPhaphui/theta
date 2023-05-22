import React, { useState, useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { MobileDatePicker } from "@mui/x-date-pickers";
import dayjs, { Dayjs } from "dayjs";
import {
  CircularProgress,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";
import "./font.css";
import Contract from "./Contract/Contract";

function App() {

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <div className="App">
        <header className="App-header">
          <Contract/>

        </header>
      </div>
    </LocalizationProvider>
  );
}

export default App;
