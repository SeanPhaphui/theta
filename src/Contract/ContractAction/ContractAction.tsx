import { Button } from "@mui/material";
import React from "react";
import "./ContractAction.css";

interface ContractActionProps {
    disabled: boolean;
    onContractActionChange: () => void;
}

const ContractAction: React.FC<ContractActionProps> = (props) => {
    const { disabled, onContractActionChange } = props;

    return (
        <div className="ContractAction">
                <Button
                    className="add"
                    variant="contained"
                    disabled={disabled}
                    onClick={() => {
                        onContractActionChange();
                    }}
                >
                    Add
                </Button>
        </div>
    );
};

export default ContractAction;
