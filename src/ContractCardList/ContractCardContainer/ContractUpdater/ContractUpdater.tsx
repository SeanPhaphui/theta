import React, { ChangeEvent, useEffect, useState } from "react";
import { Button, TextField } from "@mui/material";
import { ContractObject } from "../../../Contract/Contract";
import "./ContractUpdater.css";
import OptionCounter from "../../../Contract/OptionCounter/OptionCounter";

interface ContractUpdaterProps {
    contract: ContractObject;
    updateContract: (contract: ContractObject) => void;
    deleteContract: (id: string) => void;
}

const ContractUpdater: React.FC<ContractUpdaterProps> = (props) => {
    const { contract, updateContract, deleteContract } = props;

    const inputProps = {
        type: "number",
        pattern: "[0-9]*",
    };

    const [buyBackPrice, setBuyBackPrice] = useState<number>(0);
    const [optionCount, setOptionCount] = useState<number>(
        contract.optionCount
    );
    const [disabled, setDisabled] = useState<boolean>(true);

    const handleContractUpdate = () => {
        const updatedTotalSellPrice = (contract.totalSellPrice / contract.optionCount) * optionCount

        const totalBuyBackPrice = optionCount > 1 ? buyBackPrice * optionCount : buyBackPrice;
        const updatedContract: ContractObject = {
            ...contract, // Copy all properties from the original object
            // Update the desired properties
            totalSellPrice: updatedTotalSellPrice,
            optionCount: optionCount,
            totalBuyBackPrice: totalBuyBackPrice,
        };
        updateContract(updatedContract);
    };

    const handleContractDeletion = () => {
        const id = contract.id;
        deleteContract(id);
    };

    useEffect(() => {
        if (buyBackPrice) {
            setDisabled(false);
        } else {
            setDisabled(true);
        }
    }, [buyBackPrice]);

    useEffect(() => {
        if (optionCount !== contract.optionCount) {
          setDisabled(false); // Set disabled to false when optionCount changes
        }
      }, [optionCount, contract.optionCount]);

    return (
        <div className="ContractUpdater">
            <div className="item">
                <TextField
                    label="Individual buy back price"
                    InputProps={{
                        startAdornment: "$",
                        inputProps: inputProps,
                    }}
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                        setBuyBackPrice(Number(e.target.value))
                    }
                />
            </div>
            <div className="item">
                <OptionCounter
                    optionCount={contract.optionCount}
                    onOptionCountChange={(optionCount: number) =>
                        setOptionCount(optionCount)
                    }
                />
            </div>
            <div className="item-bottom">
                <Button
                    className="add"
                    variant="contained"
                    disabled={disabled}
                    onClick={handleContractUpdate}
                >
                    Update
                </Button>
                <Button
                    className="delete"
                    variant="contained"
                    onClick={handleContractDeletion}
                >
                    Delete contract
                </Button>
            </div>
        </div>
    );
};

export default ContractUpdater;
