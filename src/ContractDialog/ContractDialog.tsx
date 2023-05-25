import React, { useEffect, useState } from "react";
import "./ContractDialog.css";
import {
    Autocomplete,
    Button,
    Dialog,
    DialogTitle,
    Paper,
    TextField,
} from "@mui/material";
import Contract, { ContractObject } from "../Contract/Contract";
import tickers from "./../.resources/tickers.json";

interface ContractDialogProps {
    onAddConract: (contract: ContractObject) => void;
}

const ContractDialog: React.FC<ContractDialogProps> = (props) => {
    const { onAddConract } = props;
    const [open, setOpen] = React.useState(false);
    const [disableAddContract, setDisableAddContract] = useState(true);

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    const onAutocompleteChange = (event: any, newInputValue: string) => {
        setPreTicker(newInputValue.toUpperCase());
        newInputValue !== "" ? setDisableAddContract(false): setDisableAddContract(true);
    }

    const handleCloseAndAdd = (contract: ContractObject) => {
        onAddConract(contract);
        setOpen(false);
    };

    const [preTicker, setPreTicker] = useState<string>();

    return (
        <div className="ContractDialog">
            <Autocomplete
                className="input-bottom"
                freeSolo
                options={tickers.map((option) => option.ticker)}
                renderInput={(params) => (
                    <TextField {...params} label="Stock ticker" />
                )}
                onInputChange={onAutocompleteChange}
            />
            <Button
                variant="outlined"
                disabled={disableAddContract}
                onClick={handleClickOpen}
            >
                Add contract
            </Button>
            <Dialog onClose={handleClose} open={open}>
                <DialogTitle>{preTicker}</DialogTitle>
                {preTicker && (
                    <Contract ticker={preTicker} onAdd={handleCloseAndAdd} />
                )}
            </Dialog>
        </div>
    );
};

export default ContractDialog;
