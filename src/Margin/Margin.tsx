import React, { ChangeEvent, useEffect, useState } from "react";
import DepositDialog from "./DepositDialog/DepositDialog";
import "./Margin.css";
import TradeDialog, { TradeObject } from "./TradeDialog/TradeDialog";
import { TextField } from "@mui/material";
import SetupDialog from "./SetupDialog/SetupDialog";

const Margin: React.FC = () => {
    const [ticker, setTicker] = useState<string>("Stock");
    const [initialMargin, setInitialMargin] = useState<number>(0.5);
    const [maintenanceMargin, setMaintenanceMargin] = useState<number>(0.25);
    const [brokerageCash, setBrokerageCash] = useState<number>(0);
    const [trades, setTrades] = useState<TradeObject[]>([]);
    const [initialStockPrice, setInitialStockPrice] = useState<number>(0);
    const [recentPrice, setRecentPrice] = useState<number>(0);
    const [avgCost, setAvgCost] = useState<number>(0);
    const [totalCost, setTotalCost] = useState<number>(0);
    const [totalValue, setTotalValue] = useState<number>(0);

    const [percentDrop, setPercentDrop] = useState<number>(0);

    const onAddInitialTrade = (trade: TradeObject, deposit: number) => {
        setRecentPrice(trade.stockPrice);
        const totalCost = trade.stockPrice * trade.amountBought;
        const newBrokerageCash = deposit - totalCost;
        setBrokerageCash(newBrokerageCash);
        setTrades((prevArray) => [...prevArray, trade]);
    };

    const onAddTicker = (ticker: string) => {
        setTicker(ticker);
    };

    const onAddDeposit = (deposit: number) => {
        setBrokerageCash((prevBrokerageCash) => {
            return prevBrokerageCash + deposit;
        });
    };

    const onAddTrade = (trade: TradeObject) => {
        setRecentPrice(trade.stockPrice);
        const totalCost = trade.stockPrice * trade.amountBought;
        const newBrokerageCash = brokerageCash - totalCost;
        setBrokerageCash(newBrokerageCash);
        setTrades((prevArray) => [...prevArray, trade]);
    };

    useEffect(() => {
        if (trades) {
            let totalCost = 0;
            let totalShares = 0;

            // Calculate total cost and total shares
            trades.forEach((trade) => {
                totalCost += trade.stockPrice * trade.amountBought;
                totalShares += trade.amountBought;
            });

            // Calculate average cost
            const avgCost = totalShares === 0 ? 0 : totalCost / totalShares;

            // Calculate total value of shares (assuming the current stock price is 200)
            const totalValue = totalShares * recentPrice; // Replace 200 with the actual current stock price

            setAvgCost(avgCost);
            setTotalValue(totalValue);
        }
    }, [trades]);

    const inputProps = {
        type: "tel",
        pattern: "[0-9]*\\.?[0-9]+",
        inputmode: "decimal",
    };

    const getStockDrop = () => {
        return initialStockPrice * (1 - percentDrop);
    };

    return (
        <div className="Margin">
            <div className="title">
                <div>Trade Tester</div>
            </div>
            <SetupDialog onAddInitialTrade={onAddInitialTrade} onAddTicker={onAddTicker} />
            <DepositDialog onAddDeposit={onAddDeposit} />
            {/* <div>{`Initial Margin: ${initialMargin.toLocaleString("en-US", {
                style: "percent",
            })}`}</div>
            <div>{`Maintenance Margin: ${maintenanceMargin.toLocaleString("en-US", {
                style: "percent",
            })}`}</div> */}
            <div style={{display: "flex", alignItems: "flex-start", flexDirection: "column"}}>
                <div>{`Brokerage Cash: $${brokerageCash.toLocaleString()}`}</div>
                <div>{`${ticker} Price: $${recentPrice.toLocaleString()}`}</div>
                <div>{`${ticker} Price + 10%: $${(recentPrice*1.1).toLocaleString()}`}</div>
                <div>{`${ticker} Value: $${totalValue.toLocaleString()}`}</div>
                <div>{`Avg Cost: $${avgCost.toLocaleString()}`}</div>
                <div>{`Exit At +10%: $${(avgCost*1.1).toLocaleString()} or +${(((avgCost*1.1)/recentPrice)*100-100).toLocaleString()}%`}</div>
            </div>
            <TradeDialog
                brokerageCash={brokerageCash}
                trades={trades}
                recentPrice={recentPrice}
                onAddTrade={onAddTrade}
            />
            <div>
                {trades.map((trade, index) => (
                    <div key={index}>
                        <div>{`Stock Price: $${trade.stockPrice.toLocaleString()}`}</div>
                        <div>{`Amount Bought: ${trade.amountBought.toLocaleString()}`}</div>
                        <hr />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Margin;
