import React from "react";
import {
    Dialog,
    DialogTitle
} from "@mui/material";
import { ContractObject } from "../../Contract/Contract";
import ContractCard from "./ContractCard/ContractCard";
import ContractUpdater from "./ContractUpdater/ContractUpdater";
import './ContractCardContainer.css'

interface ContractCardContainerProps {
    contract: ContractObject;
    viewStyle: boolean;
    updateTotalBuyBackPrice: (id: string, newPrice: number) => void;
    deleteContract: (id: string) => void;
}

const ContractCardContainer: React.FC<ContractCardContainerProps> = (props) => {
    const { contract, viewStyle, updateTotalBuyBackPrice, deleteContract } = props;

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

    let containerClassName = viewStyle ? "ContractCardContainer3D" : "ContractCardContainer2D";

    return (
        <div className={containerClassName}>
            <ContractCard contract={contract} viewStyle={viewStyle} openDialog={handleClickOpen}/>
            <Dialog onClose={handleClose} open={open}>
                <DialogTitle>{contract.ticker + " " + contract.strikePrice + " " + contract.optionType}</DialogTitle>
                <ContractUpdater contract={contract} updateTotalBuyBackPrice={handlePriceUpdate} deleteContract={deleteContract}/>
            </Dialog>
        </div>
    );
};

export default ContractCardContainer;
