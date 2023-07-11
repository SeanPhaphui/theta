import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import "./App.css";
import "./font.css";
import Home from "./Home/Home";

function App() {
    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <div className="App">
                <header className="App-header">
                    <Home/>
                </header>
            </div>
        </LocalizationProvider>
    );
}

export default App;
