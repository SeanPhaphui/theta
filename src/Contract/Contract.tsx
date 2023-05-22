import {
    CircularProgress,
    TextField,
    ToggleButton,
    ToggleButtonGroup,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import "./Contract.css";
import { MobileDatePicker } from "@mui/x-date-pickers";
import dayjs, { Dayjs } from "dayjs";
import OptionPicker from "./OptionPicker/OptionPicker";

const Contract: React.FC = () => {
    const [option, setOption] = useState<string>();
    const onOptionChangeHandler = (option: string) => {
        setOption(option);
    };

    const [start, setStart] = useState<Dayjs | null>(dayjs());
    const [exp, setExp] = useState<Dayjs | null>(null);
    const [current, setCurrent] = useState<number>(0);
    const [days, setDays] = useState<number | null>(null);

    const currentDate = dayjs();

    useEffect(() => {
        calculateDaysBetweenDates();
    }, [start, exp]);

    const calculateDaysBetweenDates = () => {
        if (start && exp) {
            const totalDays = exp.diff(start, "day");
            const daysPassed = currentDate.diff(start, "day");
            const percentage = (daysPassed / totalDays) * 100;
            setCurrent(Math.round(percentage));
            setDays(totalDays);
        }
    };

    const firstDateHandler = (newValue: Dayjs | null) => {
        setStart(newValue);
    };

    const secondDateHandler = (newValue: Dayjs | null) => {
        setExp(newValue);
    };
    const [strikePrice, setStrikePrice] = useState<string>();
    const inputProps = {
        type: "number",
        pattern: "[0-9]*",
    };
    const onChangeAmountHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setStrikePrice(e.target.value);
    };

    return (
        <div className="Contract">
            <div className="item">
                <OptionPicker onOptionChange={onOptionChangeHandler} />
            </div>
            <div className="item">
                <TextField
                    label="Enter Amount"
                    InputProps={{
                        startAdornment: "$",
                        inputProps: inputProps,
                    }}
                    onChange={onChangeAmountHandler}
                />
            </div>
            <div className="item">
                <MobileDatePicker
                    label="Start date"
                    value={start}
                    onChange={firstDateHandler}
                />
            </div>
            <div className="item">
                <MobileDatePicker
                    label="Expire date"
                    value={exp}
                    onChange={secondDateHandler}
                />
            </div>
            {days !== null && <div>{current + "%"}</div>}
            {days !== null && (
                <CircularProgress variant="determinate" value={current} />
            )}
        </div>
    );
};

export default Contract;
