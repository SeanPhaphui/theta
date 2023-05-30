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
    updateContract: (contract: ContractObject) => void;
    deleteContract: (id: string) => void;
}

const ContractCardContainer: React.FC<ContractCardContainerProps> = (props) => {
    const { contract, viewStyle, updateContract, deleteContract } = props;

    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleContractUpdate = (contract: ContractObject) => {
        updateContract(contract);
        setOpen(false);
      };

    let containerClassName = viewStyle ? "ContractCardContainer3D" : "ContractCardContainer2D";

    return (
        <div className={containerClassName}>
            <ContractCard contract={contract} viewStyle={viewStyle} openDialog={handleClickOpen}/>
            <Dialog onClose={handleClose} open={open}>
                <DialogTitle>{contract.ticker + " " + contract.strikePrice + " " + contract.optionType}</DialogTitle>
                <ContractUpdater contract={contract} updateContract={handleContractUpdate} deleteContract={deleteContract}/>
            </Dialog>
        </div>
    );
};

export default ContractCardContainer;
