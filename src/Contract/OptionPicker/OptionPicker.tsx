import { ToggleButton, ToggleButtonGroup } from "@mui/material";
import React, { useState } from "react";
import "./OptionPicker.css";

interface OptionPickerProps {
    onOptionChange: (option: string) => void;
}

const OptionPicker: React.FC<OptionPickerProps> = (props) => {
    const { onOptionChange } = props;
    const [alignment, setAlignment] = useState<string>();
    const handleChange = (
        event: React.MouseEvent<HTMLElement>,
        newAlignment: string
    ) => {
        setAlignment(newAlignment);
        onOptionChange(newAlignment);
    };

    return (
        <div className="OptionPicker">
            <ToggleButtonGroup
                color="primary"
                fullWidth
                value={alignment}
                exclusive
                onChange={handleChange}
            >
                <ToggleButton className="left-toggle-button" value="Call">
                    Call
                </ToggleButton>
                <ToggleButton className="right-toggle-button" value="Put">
                    Put
                </ToggleButton>
            </ToggleButtonGroup>
        </div>
    );
};

export default OptionPicker;
