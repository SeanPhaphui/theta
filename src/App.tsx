import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import "./App.css";
import Contract, { ContractObject } from "./Contract/Contract";
import "./font.css";
import ContractDialog from "./ContractDialog/ContractDialog";
import ContractCards from "./ContractCard/ContractCard";
import { useEffect, useRef, useState } from "react";
import dayjs from "dayjs";
import { timeProgress } from "./Utils/Utils";

function App() {
    const testContracts: ContractObject[] = [
        {
            ticker: "GOOGL",
            optionType: "Call",
            strikePrice: "$120",
            startDate: dayjs("2023-05-10"),
            expireDate: dayjs("2023-06-16"),
            sellPrice: 700,
            optionCount: 1,
            timeProgress: timeProgress(
                dayjs("2023-05-10"),
                dayjs("2023-06-16")
            ),
        },
        {
            ticker: "AMC",
            optionType: "Put",
            strikePrice: "$20",
            startDate: dayjs("2023-05-01"),
            expireDate: dayjs("2023-06-16"),
            sellPrice: 450,
            optionCount: 3,
            timeProgress: timeProgress(
                dayjs("2023-05-01"),
                dayjs("2023-06-16")
            ),
        },
    ];
    console.log(testContracts);
    const [contracts, setContracts] = useState<ContractObject[]>(testContracts);
    const [totalSellPrice, setTotalSellPrice] = useState<number>(0);

    function contractsHandler(contracts: ContractObject): void {
        setContracts((prevArray) => [contracts, ...prevArray]);
    }

    useEffect(() => {
        const totalSellPrice: number = contracts.reduce(
            (total, contract) => total + contract.sellPrice,
            0
        );
        setTotalSellPrice(totalSellPrice);
    }, [contracts]);

    const exportToJSON = () => {
        const jsonContent = JSON.stringify(contracts, null, 2);
        const dataURI =
            "data:application/json;charset=utf-8," +
            encodeURIComponent(jsonContent);

        const link = document.createElement("a");
        link.href = dataURI;
        link.download = "contracts.json";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const inputFileRef = useRef<HTMLInputElement>(null);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                const jsonContent = reader.result as string;
                const restoredContracts: ContractObject[] =
                    JSON.parse(jsonContent);

                // Use the restoredContracts array as needed
                console.log(restoredContracts);
                setContracts(restoredContracts);
            };
            reader.readAsText(file);
        }
    };

    const handleButtonClick = () => {
        if (inputFileRef.current) {
            inputFileRef.current.click();
        }
    };

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <div className="App">
                <header className="App-header">
                    <div className="title">Total Return</div>
                    <div className="secondary-title">
                        {"$" + totalSellPrice.toLocaleString()}
                    </div>
                    {/* <button onClick={exportToJSON}>Export JSON</button>
                    <div>
                        <input
                            type="file"
                            ref={inputFileRef}
                            accept=".json"
                            style={{ display: "none" }}
                            onChange={handleFileChange}
                        />
                        <button onClick={handleButtonClick}>
                            Restore Contracts
                        </button>
                    </div> */}
                    <ContractDialog onAddConract={contractsHandler} />
                    {contracts && <ContractCards contracts={contracts} />}
                </header>
            </div>
        </LocalizationProvider>
    );
}

export default App;
