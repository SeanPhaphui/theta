import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import "./App.css";
import Contract from "./Contract/Contract";
import "./font.css";
import ContractDialog from "./ContractDialog/ContractDialog";

function App() {

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <div className="App">
        <header className="App-header">
          <ContractDialog/>

        </header>
      </div>
    </LocalizationProvider>
  );
}

export default App;
