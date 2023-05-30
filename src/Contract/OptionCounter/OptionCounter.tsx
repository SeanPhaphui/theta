import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { Button, ButtonGroup } from "@mui/material";
import React, { useState } from "react";
import "./OptionCounter.css";

interface OptionCounterProps {
    optionCount?: number;
    onOptionCountChange: (optionCount: number) => void;
}

const OptionCounter: React.FC<OptionCounterProps> = (props) => {
    const { optionCount, onOptionCountChange } = props;

    const [count, setCount] = useState<number>(optionCount ? optionCount : 1);

    return (
        <div className="OptionCounter">
            <div>
                {"Quantity: " + count}
            </div>
            <ButtonGroup>
                <Button
                    aria-label="reduce"
                    onClick={() => {
                        setCount(Math.max(count - 1, 1));
                        onOptionCountChange(Math.max(count - 1, 1));
                    }}
                >
                    <RemoveIcon fontSize="small" />
                </Button>
                <Button
                    aria-label="increase"
                    onClick={() => {
                        setCount(count + 1);
                        onOptionCountChange(count + 1);
                    }}
                >
                    <AddIcon fontSize="small" />
                </Button>
            </ButtonGroup>
        </div>
    );
};

export default OptionCounter;
