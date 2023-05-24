import React, { useEffect, useRef, useState } from "react";
import "./ContractsPage.css";
import { testContracts } from "../Utils/Utils";
import { ContractObject } from "../Contract/Contract";
import ContractDialog from "../ContractDialog/ContractDialog";
import ContractCards from "../ContractCard/ContractCard";
import dayjs, { Dayjs } from "dayjs";
import DataManager from "../DataManager/DataManager";

const ContractsPage: React.FC = () => {
    const [contracts, setContracts] = useState<ContractObject[]>(testContracts);
    const [totalSellPrice, setTotalSellPrice] = useState<number>(0);

    useEffect(() => {
        const totalSellPrice: number = contracts.reduce(
            (total, contract) => total + contract.sellPrice,
            0
        );
        setTotalSellPrice(totalSellPrice);
    }, [contracts]);

    function contractsHandler(contracts: ContractObject): void {
        setContracts((prevArray) => [contracts, ...prevArray]);
    }

    return (
        <div className="ContractsPage">
            <div className="title">Total Return</div>
            <div className="title">{"$" + totalSellPrice.toLocaleString()}</div>
            <DataManager contracts={contracts} restoreContracts={(contracts) => setContracts(contracts)}/>
            <ContractDialog onAddConract={contractsHandler} />
            {contracts && <ContractCards contracts={contracts} />}
        </div>
    );
};

export default ContractsPage;
