import React, { useEffect, useState } from "react";
import "./Stats.css";
import { ContractObject } from "../Contract/Contract";
import dayjs from "dayjs";
import { testContracts } from "../Utils/Utils";

const Stats: React.FC = () => {
    const [contracts, setContracts] = useState<ContractObject[]>(testContracts);
    // Then, in a useEffect hook, you can load the value from localStorage
    // when the component first mounts.
    useEffect(() => {
        const storedContracts = localStorage.getItem("Contracts");
        if (storedContracts) {
            let contracts: ContractObject[] = JSON.parse(storedContracts);
            contracts = contracts.map((contract) => ({
                ...contract,
                startDate: dayjs(contract.startDate),
                expireDate: dayjs(contract.expireDate),
            }));
            setContracts(contracts);
        }
    }, []);

    console.log(contracts);

    function calculateNetReturns(
        contractObjects: ContractObject[]
    ): Record<string, number> {
        const netReturns: Record<string, number> = {};

        contractObjects.forEach((contract) => {
            const { ticker, totalSellPrice, totalBuyBackPrice } = contract;
            const netReturn = totalSellPrice - totalBuyBackPrice;
            console.log("ticker: ", ticker);
            console.log("totalSellPrice: ", totalSellPrice);
            console.log("totalBuyBackPrice: ", totalBuyBackPrice);
            console.log("---------------------------------------------");
            if (netReturns[ticker]) {
                netReturns[ticker] += netReturn;
            } else {
                netReturns[ticker] = netReturn;
            }
        });

        return netReturns;
    }

    const netReturns = calculateNetReturns(contracts);
    console.log(netReturns);

    function formatNetReturn(netReturn: number): string {
        const formattedNetReturn = Math.abs(netReturn).toLocaleString();
        return netReturn < 0
            ? `-$${formattedNetReturn}`
            : `$${formattedNetReturn}`;
    }

    return (
        <div className="Stats">
            <div className="title">Option P/L</div>
            <div className="netReturns">
                {Object.entries(netReturns).map(([ticker, netReturn]) => (
                    <div key={ticker}>
                        <span className="ticker">{ticker}: </span>
                        <span className="netReturn">
                            {formatNetReturn(netReturn)}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Stats;
