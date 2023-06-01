import React, { useEffect, useState } from "react";
import { Box, LinearProgress, Typography } from "@mui/material";
import "./LinearProgressWithLabel.css";

interface LinearProgressWithLabelProps {
    value: number;
    status: string;
    lineColor: string;
}

export const LinearProgressWithLabel: React.FC<LinearProgressWithLabelProps> = ({
    value: initialValue,
    status,
    lineColor,
  }) => {
    const [value, setValue] = useState(0);
  
    useEffect(() => {
      const timeout = setTimeout(() => setValue(initialValue), 200); // Delay of 200ms
      return () => clearTimeout(timeout);
    }, [initialValue]);
  
    return (
        <div className="LinearProgressWithLabel">
            <Box sx={{ display: "flex", alignItems: "center" }}>
                <Box sx={{ width: "100%", mr: 1 }}>
                    <LinearProgress className={lineColor} variant="determinate" value={value} />
                </Box>
                <Box sx={{ minWidth: 35 }}>
                    <Typography variant="body2" color={status}>{`${Math.round(
                        value
                    )}%`}</Typography>
                </Box>
            </Box>
        </div>
    );
};

export default LinearProgressWithLabel;
