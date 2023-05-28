import dayjs, { Dayjs } from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";
import minMax from "dayjs/plugin/minMax";
import React, { useEffect, useState } from "react";
import { ContractObject } from "../Contract/Contract";
import ContractDialog from "../ContractDialog/ContractDialog";
import { testContracts } from "../Utils/Utils";
import "./ContractsPage.css";

import ContractCardList from "../ContractCardList/ContractCardList";
import DataManager from "../DataManager/DataManager";
import D3ChartContainer from "./D3ChartContainer/D3ChartContainer";
import { Button, Snackbar } from "@mui/material";
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

dayjs.extend(minMax);
dayjs.extend(advancedFormat);

const ContractsPage: React.FC = () => {
    const [open, setOpen] = React.useState(false);
    const [contractId, setContractId] = useState<string>("");
    const [contracts, setContracts] = useState<ContractObject[]>(testContracts);
    const [earliestStartDate, setEarliestStartDate] = useState<Dayjs | null>(null);
    const [totalReturn, setTotalReturn] = useState<number>(0);


    useEffect(() => {
        const startDateArray = contracts.map((contract) => contract.startDate);
        const earliestDate = dayjs.min(startDateArray);
        setEarliestStartDate(earliestDate);

        const totalSellPrice: number = contracts.reduce(
            (totalReturn, contract) => {
                const returnFromContract =
                    contract.totalSellPrice - contract.totalBuyBackPrice;
                return totalReturn + returnFromContract;
            },
            0
        );
        setTotalReturn(totalSellPrice);
    }, [contracts]);

    function contractsHandler(contract: ContractObject): void {
        console.log("ADD MORE CONTRACTS");
        setContracts((prevArray) => [contract, ...prevArray]);
        setContractId(contract.id);
        setOpen(true);
    }

    const updateTotalBuyBackPrice = (id: string, newPrice: number) => {
        const updatedContracts = contracts.map((contract) => {
            if (contract.id === id) {
                return { ...contract, totalBuyBackPrice: newPrice };
            }
            return contract;
        });
        setContracts(updatedContracts);
        console.log(updatedContracts);
    };

    const deleteContract = (id: string) => {
        const updatedContracts = contracts.filter((contract) => contract.id !== id);
        setContracts(updatedContracts);
        console.log(updatedContracts);
    };

    useEffect(() => {
        const ContractCardList = document.querySelectorAll<HTMLElement>(".ContractCardList");
        ContractCardList.forEach((cardBlock) => {
            
            Array.from(cardBlock.children).forEach((card, i) => {
                const zIndex = cardBlock.children.length - i;
                (card as HTMLElement).style.transform = `translateY(${i}px)`;
                (card as HTMLElement).style.zIndex = `${zIndex}`;
                (card as HTMLElement).style.bottom = `${Math.min(cardBlock.children.length +2, 75)}px`;
            });
        });
    }, [contracts]);

    const handleClose = (event: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
          return;
        }
    
        setOpen(false);
    };

    const handleUndo = () => {
        const updatedContracts = contracts.filter((contract) => contract.id !== contractId);
        setContracts(updatedContracts);
        console.log(updatedContracts);
        setOpen(false);
    };

    const action = (
        <React.Fragment>
          <Button color="secondary" size="small" onClick={handleUndo}>
            UNDO
          </Button>
          <IconButton
            size="small"
            aria-label="close"
            color="inherit"
            onClick={handleClose}
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        </React.Fragment>
    );

    return (
        <div className="ContractsPage">
            <DataManager
                contracts={contracts}
                restoreContracts={(contracts) => setContracts(contracts)}
                clearContracts={() => setContracts([])}
            />
            <div className="title">Total Return</div>
            <div className="title">{"since " + earliestStartDate?.format("MMMM Do")}</div>
            <div className="title">{"$" + totalReturn.toLocaleString()}</div>
            <D3ChartContainer data={contracts} />
            <ContractDialog onAddConract={contractsHandler} />
            {contracts && <ContractCardList contracts={contracts} updateTotalBuyBackPrice={updateTotalBuyBackPrice} deleteContract={deleteContract}/>}
            <Snackbar
                open={open}
                autoHideDuration={4000}
                onClose={handleClose}
                message="Contract added"
                action={action}
            />
        </div>
    );
};

export default ContractsPage;
