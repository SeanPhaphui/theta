import React, { ChangeEvent, useEffect, useState } from "react";
import { Button, TextField } from "@mui/material";
import { ContractObject } from "../../../Contract/Contract";
import "./ContractUpdater.css";

interface ContractUpdaterProps {
    contract: ContractObject;
    updateTotalBuyBackPrice: (id: string, newPrice: number) => void;
}

const ContractUpdater: React.FC<ContractUpdaterProps> = (
    props
) => {
    const { contract, updateTotalBuyBackPrice } = props;

    const inputProps = {
        type: "number",
        pattern: "[0-9]*",
    };

    const [buyBackPrice, setBuyBackPrice] = useState<number>();
    const [disabled, setDisabled] = useState<boolean>(true);

    const handlePriceUpdate = () => {
        if (!buyBackPrice) {
          return;
        }
      
        const id = contract.id;
        const totalBuyBackPrice = contract.optionCount > 1 ? buyBackPrice * contract.optionCount : buyBackPrice;
        updateTotalBuyBackPrice(id, totalBuyBackPrice);
      };

    useEffect(() => {
        if (buyBackPrice) {
            setDisabled(false);
        } else {
            setDisabled(true);
        }
    }, [buyBackPrice]);

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
            <div className="item">{"Quantity: " + contract.optionCount}</div>
            <div className="item">
                <Button
                    className="add"
                    variant="contained"
                    disabled={disabled}
                    onClick={handlePriceUpdate}
                >
                    Update
                </Button>
            </div>
        </div>
    );
};

export default ContractUpdater;