import React from "react";
import {
    Dialog,
    DialogTitle
} from "@mui/material";
import { ContractObject } from "../../Contract/Contract";
import ContractCard from "./ContractCard/ContractCard";
import ContractUpdater from "./ContractUpdater/ContractUpdater";

interface ContractCardContainerProps {
    contract: ContractObject;
    updateTotalBuyBackPrice: (id: string, newPrice: number) => void;
}

const ContractCardContainer: React.FC<ContractCardContainerProps> = (props) => {
    const { contract, updateTotalBuyBackPrice } = props;

    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handlePriceUpdate = (id: string, newPrice: number) => {
        updateTotalBuyBackPrice(id, newPrice);
        setOpen(false);
      };

    return (
        <div className="ContractCardContainer">
            <ContractCard contract={contract} openDialog={handleClickOpen}/>
            <Dialog onClose={handleClose} open={open}>
                <DialogTitle>{contract.ticker + " " + contract.strikePrice + " " + contract.optionType}</DialogTitle>
                <ContractUpdater contract={contract} updateTotalBuyBackPrice={handlePriceUpdate}/>
            </Dialog>
        </div>
    );
};

export default ContractCardContainer;
