import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import "./App.css";
import Contract, { ContractObject } from "./Contract/Contract";
import "./font.css";
import ContractDialog from "./ContractDialog/ContractDialog";
import ContractCards from "./ContractCard/ContractCard";
import { useEffect, useState } from "react";
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
            sellPrice: 700,
            optionCount: 1,
            timeProgress: timeProgress(dayjs('2023-05-10'),dayjs('2023-06-16')),
        },
        {
          ticker: "AMC",
          optionType: "Put",
          strikePrice: "$20",
          startDate: dayjs('2023-05-01'),
          expireDate: dayjs('2023-06-16'),
          sellPrice: 450,
          optionCount: 3,
          timeProgress: timeProgress(dayjs('2023-05-01'),dayjs('2023-06-16')),
      },
    ];
    const [contracts, setContracts] = useState<ContractObject[]>(testContracts);
    const [totalSellPrice, setTotalSellPrice] = useState<number>(0);

    function contractsHandler(contracts: ContractObject): void {
        setContracts((prevArray) => [contracts, ...prevArray]);
    }

    useEffect(() => {
      const totalSellPrice: number = contracts.reduce((total, contract) => total + contract.sellPrice, 0);
      setTotalSellPrice(totalSellPrice);
  }, [contracts]);

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <div className="App">
                <header className="App-header">
                    <div className="title">Total Return</div>
                    <div className="secondary-title">{"$" + totalSellPrice.toLocaleString()}</div>
                    <ContractDialog onAddConract={contractsHandler} />
                    {contracts && <ContractCards contracts={contracts} />}
                </header>
            </div>
        </LocalizationProvider>
    );
}

export default App;
