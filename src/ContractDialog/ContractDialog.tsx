import React from "react";
import "./ContractDialog.css";
import { Button, Dialog, DialogTitle } from "@mui/material";
import Contract from "../Contract/Contract";

const ContractDialog: React.FC = () => {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = (value: string) => {
        setOpen(false);
    };

    return (
        <div className="ContractDialog">
            <Button variant="outlined" onClick={handleClickOpen}>
                Open simple dialog
            </Button>
            <Dialog onClose={handleClose} open={open}>
                <DialogTitle>GOOGL</DialogTitle>
                <Contract/>
            </Dialog>
        </div>
    );
};

export default ContractDialog;
