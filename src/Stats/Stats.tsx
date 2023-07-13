import { Box, Card, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { ContractObject } from "../Contract/Contract";
import { loadContractsFromLocalStorage, testContracts } from "../Utils/Utils";
import "./Stats.css";

const Stats: React.FC = () => {
    const [contracts, setContracts] = useState<ContractObject[]>(testContracts);
    const [sortedNetReturns, setSortedNetReturns] = useState<
        Record<string, number>
    >({});
    const [sortOrder, setSortOrder] = useState<"ascending" | "descending">(
        "descending"
    );

    const totalSellPrice: number = contracts.reduce((totalReturn, contract) => {
        const returnFromContract =
            contract.totalSellPrice - contract.totalBuyBackPrice;
        return totalReturn + returnFromContract;
    }, 0);

    // Then, in a useEffect hook, you can load the value from localStorage
    // when the component first mounts.
    useEffect(() => {
        const loadedContracts = loadContractsFromLocalStorage();
        if (loadedContracts) {
            setContracts(loadedContracts);
        }
    }, []);

    const calculateNetReturns = (
        contractObjects: ContractObject[]
    ): Record<string, number> => {
        const netReturns: Record<string, number> = {};

        contractObjects.forEach((contract) => {
            const { ticker, totalSellPrice, totalBuyBackPrice } = contract;
            const netReturn = totalSellPrice - totalBuyBackPrice;
            if (netReturns[ticker]) {
                netReturns[ticker] += netReturn;
            } else {
                netReturns[ticker] = netReturn;
            }
        });

        return netReturns;
    };

    const sortNetReturns = (
        netReturns: Record<string, number>,
        sortOrder: "ascending" | "descending"
    ): Record<string, number> => {
        return Object.entries(netReturns)
            .sort(([, valueA], [, valueB]) =>
                sortOrder === "ascending" ? valueA - valueB : valueB - valueA
            )
            .reduce((sortedNetReturns, [ticker, value]) => {
                sortedNetReturns[ticker] = value;
                return sortedNetReturns;
            }, {} as Record<string, number>);
    };

    const formatNetReturn = (netReturn: number): string => {
        const formattedNetReturn = Math.abs(netReturn).toLocaleString();
        return netReturn < 0
            ? `-$${formattedNetReturn}`
            : `+$${formattedNetReturn}`;
    };

    const handleSortToggle = () => {
        const newSortOrder =
            sortOrder === "ascending" ? "descending" : "ascending";
        setSortOrder(newSortOrder);
        const sortedNetReturns = sortNetReturns(
            calculateNetReturns(contracts),
            newSortOrder
        );
        setSortedNetReturns(sortedNetReturns);
    };

    useEffect(() => {
        const updatedNetReturns = calculateNetReturns(contracts);
        setSortedNetReturns(updatedNetReturns);
    }, [contracts]);

    return (
        <div className="Stats">
            <div className="title">
                <div>Option P/L</div>
                <div>{"$" + totalSellPrice.toLocaleString()}</div>
            </div>
            <button onClick={handleSortToggle}>
                Sort: {sortOrder === "descending" ? "High to Low" : "Low to High"}
            </button>
            <div className="netReturns">
                {Object.entries(sortedNetReturns).map(([ticker, netReturn]) => (
                    <div key={ticker}>
                        <Card className={netReturn > 0 ? "gain" : "loss"}>
                            <Box
                                sx={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    alignItems: "center",
                                }}
                            >
                                <Typography
                                    sx={{
                                        fontSize: 20,
                                        fontFamily: "IBMPlexSans-SemiBold",
                                    }}
                                >
                                    {ticker}
                                </Typography>
                                <Typography
                                    sx={{
                                        fontSize: 20,
                                        fontFamily: "IBMPlexSans-SemiBold",
                                    }}
                                >
                                    {formatNetReturn(netReturn)}
                                </Typography>
                            </Box>
                        </Card>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Stats;
