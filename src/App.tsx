import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import "./App.css";
import ContractsPage from "./ContractsPage/ContractsPage";
import "./font.css";

function App() {
    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <div className="App">
                <header className="App-header">
                    <ContractsPage/>
                </header>
            </div>
        </LocalizationProvider>
    );
}

export default App;
