import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import "./App.css";
import Contract, { ContractObject } from "./Contract/Contract";
import "./font.css";
import ContractDialog from "./ContractDialog/ContractDialog";
import ContractCards from "./ContractCard/ContractCard";
import { useState } from "react";
import dayjs from "dayjs";
import { timeProgress } from "./Utils/Utils";

function App() {
    const testContracts: ContractObject[] = [
        {
            ticker: "GOOGL",
            optionType: "Call",
            strikePrice: "$120",
            startDate: dayjs('2023-05-10'),
            expireDate: dayjs('2023-06-16'),
            sellPrice: "+$170",
            optionCount: 1,
            timeProgress: timeProgress(dayjs('2023-05-10'),dayjs('2023-06-16')),
        },
        {
          ticker: "AMC",
          optionType: "Put",
          strikePrice: "$20",
          startDate: dayjs('2023-05-01'),
          expireDate: dayjs('2023-06-16'),
          sellPrice: "+$120",
          optionCount: 3,
          timeProgress: timeProgress(dayjs('2023-05-01'),dayjs('2023-06-16')),
      },
    ];
    const [contract, setContracts] = useState<ContractObject[]>(testContracts);

    function contractsHandler(contracts: ContractObject): void {
        setContracts((prevArray) => [contracts, ...prevArray]);
    }

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <div className="App">
                <header className="App-header">
                    <ContractDialog onAddConract={contractsHandler} />
                    {contract && <ContractCards contracts={contract} />}
                </header>
            </div>
        </LocalizationProvider>
    );
}

export default App;
