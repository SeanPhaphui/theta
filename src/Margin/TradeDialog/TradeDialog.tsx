import { Button, Dialog, TextField } from "@mui/material";
import React, { ChangeEvent, useEffect, useState } from "react";
import "./TradeDialog.css";

export interface TradeDialogProps {
    brokerageCash: number;
    trades: TradeObject[];
    recentPrice: number;
    onAddTrade: (trade: TradeObject) => void;
}

export interface TradeObject {
    stockPrice: number;
    amountBought: number;
}

const TradeDialog: React.FC<TradeDialogProps> = (props) => {
    const { brokerageCash, trades, recentPrice, onAddTrade } = props;
    const [percentDrop, setPercentDrop] = useState<number>(0);
    const [stockPrice, setStockPrice] = useState<number>(recentPrice);
    const [amountBought, setAmountBought] = useState<number>(0);
    const [totalCost, setTotalCost] = useState<number>(0);
    const [open, setOpen] = React.useState(false);

    const [errorMsg, setErrorMsg] = useState<string>("");
    const [disableTradeButton, setDisableTradeButton] = useState<boolean>(true);

    const getNewPrice = () => {
        const lastTrade = trades.length > 0 ? trades[trades.length - 1] : null;
        return (1 - percentDrop) * (lastTrade?.stockPrice ?? recentPrice);
    };

    const inputProps = {
        type: "tel",
        pattern: "[0-9]*\\.?[0-9]+",
        inputmode: "decimal",
    };

    const handleAmountBoughtChange = (e: ChangeEvent<HTMLInputElement>) => {
        const parsedAmount = parseFloat(e.target.value);
        setAmountBought(parsedAmount ?? 0);
    };

    const calculateTotalCost = () => {
        return stockPrice * amountBought;
    };

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    const handleDeposit = () => {
        const tradeObject: TradeObject = {
            stockPrice: stockPrice,
            amountBought: amountBought,
        };

        // Check if the brokerageCash is enough for the trade
        if (totalCost <= brokerageCash) {
            // If enough, add the trade
            onAddTrade(tradeObject);
            handleClose();
        }
    };

    useEffect(() => {
        if (amountBought) {
            const totalCost = calculateTotalCost();
            if (totalCost > brokerageCash) {
                setDisableTradeButton(true);
                setErrorMsg(
                    `Error: Cost of Trade ($${totalCost.toLocaleString()}) is higher than available brokerage cash ($${brokerageCash.toLocaleString()})`
                );
            } else {
                setDisableTradeButton(false);
                setErrorMsg("");
            }
        }
    }, [stockPrice, amountBought, brokerageCash, percentDrop]);

    useEffect(() => {
        const newStockPrice = getNewPrice();
        setStockPrice(newStockPrice);
    }, [percentDrop, recentPrice, trades]);

    useEffect(() => {
        setTotalCost(calculateTotalCost());
    }, [stockPrice, amountBought]);

    return (
        <div className="TradeDialog">
            <Button variant="outlined" onClick={handleClickOpen}>
                New Trade
            </Button>
            <Dialog onClose={handleClose} open={open}>
                <div className="trade-dialog-content">
                    <div className="item-top">
                        <TextField
                            label="Enter percent drop"
                            InputProps={{
                                endAdornment: "%",
                                inputProps: inputProps,
                            }}
                            onChange={(e: ChangeEvent<HTMLInputElement>) =>
                                setPercentDrop(parseInt(e.target.value) / 100)
                            }
                        />
                    </div>
                    <div className="item">{`New Price: $${stockPrice.toLocaleString()}`}</div>
                    <div className="item">
                        <TextField
                            label="Amount bought"
                            InputProps={{
                                inputProps: inputProps,
                            }}
                            onChange={handleAmountBoughtChange}
                        />
                    </div>
                    <div className="item">{`Total Cost: $${totalCost.toLocaleString()}`}</div>
                    <div className="item">{`Available Cash: $${brokerageCash.toLocaleString()}`}</div>
                    <div className="item" style={{ color: "red" }}>
                        {errorMsg}
                    </div>
                    <div className="item">
                        <Button
                            className="trade"
                            variant="contained"
                            disabled={disableTradeButton}
                            onClick={handleDeposit}
                        >
                            Add Trade
                        </Button>
                    </div>
                </div>
            </Dialog>
        </div>
    );
};

export default TradeDialog;
