import { Autocomplete, Button, Dialog, TextField } from "@mui/material";
import React, { ChangeEvent, useEffect, useState } from "react";
import tickers from "./../../.resources/tickers.json";
import "./SetupDialog.css";

export interface SetupDialogProps {
    onAddInitialTrade: (trade: TradeObject, deposit: number) => void;
    onAddTicker: (ticker: string) => void;
}

export interface TradeObject {
    stockPrice: number;
    amountBought: number;
}

const SetupDialog: React.FC<SetupDialogProps> = (props) => {
    const { onAddInitialTrade, onAddTicker } = props;
    const [startingDeposit, setStartingDeposit] = useState<number>();
    const [ticker, setTicker] = useState<string>();
    const [stockPrice, setStockPrice] = useState<number>();
    const [amountBought, setAmountBought] = useState<number>();
    const [open, setOpen] = React.useState(false);

    const [errorMsg, setErrorMsg] = useState<string>("");

    const [disableDoneButton, setDisableDoneButton] = useState<boolean>(true);

    const onAutocompleteChange = (event: any, newInputValue: string) => {
        setTicker(newInputValue.toUpperCase());
    };

    const inputProps = {
        type: "tel",
        pattern: "[0-9]*\\.?[0-9]+",
        inputmode: "decimal",
    };

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    const handleDeposit = () => {
        const tradeObject: TradeObject = {
            stockPrice: stockPrice!,
            amountBought: amountBought!,
        };

        onAddInitialTrade(tradeObject, startingDeposit!);
        if (ticker) {
            onAddTicker(ticker);
        }
        handleClose();
    };

    useEffect(() => {
        if (startingDeposit && stockPrice && amountBought) {
            // Calculate the total cost of the trade
            const totalCost = stockPrice * amountBought;
            console.log("totalCost", totalCost);
            if (totalCost > startingDeposit) {
                setDisableDoneButton(true);
                setErrorMsg(
                    `Error: Cost of Trade ($${totalCost.toLocaleString()}) is higher than starting cash ($${startingDeposit.toLocaleString()})`
                );
            } else {
                setDisableDoneButton(false);
                setErrorMsg("");
            }
        }
    }, [stockPrice, amountBought, startingDeposit]);

    return (
        <div className="SetupDialog">
            <Button variant="outlined" onClick={handleClickOpen}>
                Setup Initial Trade
            </Button>
            <Dialog onClose={handleClose} open={open}>
                <div className="setup-dialog-content">
                    <div className="item-top">
                        <TextField
                            label="Enter starting cash"
                            InputProps={{
                                startAdornment: "$",
                                inputProps: inputProps,
                            }}
                            onChange={(e: ChangeEvent<HTMLInputElement>) =>
                                setStartingDeposit(parseInt(e.target.value))
                            }
                        />
                    </div>
                    <div className="item">
                        <Autocomplete
                            freeSolo
                            options={tickers.map((option) => option.ticker)}
                            renderInput={(params) => <TextField {...params} label="Stock ticker" />}
                            onInputChange={onAutocompleteChange}
                        />
                    </div>
                    <div className="item">
                        <TextField
                            label="Initial stock price"
                            InputProps={{
                                startAdornment: "$",
                                inputProps: inputProps,
                            }}
                            onChange={(e: ChangeEvent<HTMLInputElement>) =>
                                setStockPrice(parseInt(e.target.value))
                            }
                        />
                    </div>
                    <div className="item">
                        <TextField
                            label="Amount bought"
                            InputProps={{
                                inputProps: inputProps,
                            }}
                            onChange={(e: ChangeEvent<HTMLInputElement>) =>
                                setAmountBought(parseInt(e.target.value))
                            }
                        />
                    </div>
                    <div className="item" style={{ color: "red" }}>
                        {errorMsg}
                    </div>
                    <div className="item">
                        <Button
                            className="done"
                            variant="contained"
                            disabled={disableDoneButton}
                            onClick={handleDeposit}
                        >
                            Done
                        </Button>
                    </div>
                </div>
            </Dialog>
        </div>
    );
};

export default SetupDialog;
