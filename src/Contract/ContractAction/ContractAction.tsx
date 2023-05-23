import { Button } from "@mui/material";
import React from "react";
import "./ContractAction.css";

interface ContractActionProps {
    onContractActionChange: (recordContract: boolean) => void;
}

const ContractAction: React.FC<ContractActionProps> = (props) => {
    const { onContractActionChange } = props;

    return (
        <div className="ContractAction">
                <Button
                    className="add"
                    variant="contained"
                    onClick={() => {
                        onContractActionChange(true);
                    }}
                >
                    Add
                </Button>
        </div>
    );
};

export default ContractAction;
