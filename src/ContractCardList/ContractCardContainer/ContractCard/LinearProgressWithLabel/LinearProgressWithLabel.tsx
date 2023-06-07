import React, { useEffect, useMemo, useState } from "react";
import { Box, LinearProgress, Typography } from "@mui/material";
import "./LinearProgressWithLabel.css";

export enum LinearLineColor {
    White = 'white',
    Green = 'green',
    Red = 'red'
}

interface LinearProgressWithLabelProps {
    value: number;
    percentTextColor: string;
    lineColor: LinearLineColor;
}

const LinearProgressWithLabel: React.FC<
    LinearProgressWithLabelProps
> = ({ value: initialValue, percentTextColor, lineColor }) => {
    const [value, setValue] = useState(0);

    useEffect(() => {
        const timeout = setTimeout(() => setValue(initialValue), 200); // Delay of 200ms
        return () => clearTimeout(timeout);
    }, [initialValue]);

    const adjustedValue = useMemo(() => {
        if (lineColor === LinearLineColor.Red) {
            return value < -100 ? 100 : -value;
        }
        return value;
    }, [value, lineColor]);

    return (
        <div className="LinearProgressWithLabel">
            <Box sx={{ display: "flex", alignItems: "center" }}>
                <Box sx={{ width: "100%", mr: 1 }}>
                    <LinearProgress
                        className={lineColor}
                        variant="determinate"
                        value={adjustedValue}
                    />
                </Box>
                <Box sx={{ minWidth: 35 }}>
                    <Typography
                        variant="body2"
                        color={percentTextColor}
                    >{`${value}%`}</Typography>
                </Box>
            </Box>
        </div>
    );
};

export default LinearProgressWithLabel;
