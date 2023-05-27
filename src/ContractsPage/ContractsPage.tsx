import dayjs, { Dayjs } from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";
import minMax from "dayjs/plugin/minMax";
import React, { useEffect, useState } from "react";
import { ContractObject } from "../Contract/Contract";
import ContractDialog from "../ContractDialog/ContractDialog";
import { testContracts } from "../Utils/Utils";
import "./ContractsPage.css";

import ContractCardList from "../ContractCardList/ContractCardList";
import DataManager from "../DataManager/DataManager";
import D3ChartContainer from "./D3ChartContainer/D3ChartContainer";

dayjs.extend(minMax);
dayjs.extend(advancedFormat);

const ContractsPage: React.FC = () => {
    const [contracts, setContracts] = useState<ContractObject[]>(testContracts);
    const [earliestStartDate, setEarliestStartDate] = useState<Dayjs | null>(null);
    const [totalReturn, setTotalReturn] = useState<number>(0);

    useEffect(() => {
        const startDateArray = contracts.map((contract) => contract.startDate);
        const earliestDate = dayjs.min(startDateArray);
        setEarliestStartDate(earliestDate);

        const totalSellPrice: number = contracts.reduce(
            (totalReturn, contract) => {
                const returnFromContract =
                    contract.totalSellPrice - contract.totalBuyBackPrice;
                return totalReturn + returnFromContract;
            },
            0
        );
        setTotalReturn(totalSellPrice);
    }, [contracts]);

    function contractsHandler(contracts: ContractObject): void {
        console.log("ADD MORE CONTRACTS");
        setContracts((prevArray) => [contracts, ...prevArray]);
    }

    const updateTotalBuyBackPrice = (id: string, newPrice: number) => {
        const updatedContracts = contracts.map((contract) => {
            if (contract.id === id) {
                return { ...contract, totalBuyBackPrice: newPrice };
            }
            return contract;
        });
        setContracts(updatedContracts);
        console.log(updatedContracts);
    };

    const deleteContract = (id: string) => {
        const updatedContracts = contracts.filter((contract) => contract.id !== id);
        setContracts(updatedContracts);
        console.log(updatedContracts);
      };

    return (
        <div className="ContractsPage">
            <DataManager
                contracts={contracts}
                restoreContracts={(contracts) => setContracts(contracts)}
                clearContracts={() => setContracts([])}
            />
            <div className="title">Total Return</div>
            <div className="title">{"since " + earliestStartDate?.format("MMMM Do")}</div>
            <div className="title">{"$" + totalReturn.toLocaleString()}</div>
            <D3ChartContainer data={contracts} />
            <ContractDialog onAddConract={contractsHandler} />
            {contracts && <ContractCardList contracts={contracts} updateTotalBuyBackPrice={updateTotalBuyBackPrice} deleteContract={deleteContract}/>}
        </div>
    );
};

export default ContractsPage;
