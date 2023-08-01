import { Button, Dialog, TextField } from "@mui/material";
import React, { ChangeEvent, useState } from "react";
import "./DepositDialog.css";

export interface DepositDialogProps {
    onAddDeposit: (deposit: number) => void;
}

const DepositDialog: React.FC<DepositDialogProps> = (props) => {
    const { onAddDeposit } = props;
    const [depositAmount, setDepositAmoount] = useState<number>(0);
    const [open, setOpen] = React.useState(false);

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
        onAddDeposit(depositAmount);
        handleClose();
    };

    return (
        <div className="DepositDialog">
            <Button variant="outlined" onClick={handleClickOpen}>
                Deposit More Cash
            </Button>
            <Dialog onClose={handleClose} open={open}>
                <div className="deposit-dialog-content">
                    <div className="item-top">
                        <TextField
                            label="Deposit amount"
                            InputProps={{
                                startAdornment: "$",
                                inputProps: inputProps,
                            }}
                            onChange={(e: ChangeEvent<HTMLInputElement>) =>
                                setDepositAmoount(parseInt(e.target.value))
                            }
                        />
                    </div>
                    <div className="item">
                        <Button className="deposit" variant="contained" onClick={handleDeposit}>Deposit</Button>
                    </div>
                </div>
            </Dialog>
        </div>
    );
};

export default DepositDialog;
