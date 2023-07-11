import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import "./App.css";
import "./font.css";
import Home from "./Home/Home";
import { Route, Routes } from "react-router-dom";
import Stats from "./Stats/Stats";

function App() {
    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <div className="App">
                <header className="App-header">
                    <Routes>
                        <Route path="/" element={<Home/>}/>
                        <Route path="/stats" element={<Stats/>}/>
                    </Routes>
                </header>
            </div>
        </LocalizationProvider>
    );
}

export default App;
