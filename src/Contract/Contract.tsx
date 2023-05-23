import { TextField } from "@mui/material";
import { MobileDatePicker } from "@mui/x-date-pickers";
import dayjs, { Dayjs } from "dayjs";
import React, { ChangeEvent, useEffect, useState } from "react";
import "./Contract.css";
import ContractAction from "./ContractAction/ContractAction";
import OptionCounter from "./OptionCounter/OptionCounter";
import OptionPicker from "./OptionPicker/OptionPicker";

const Contract: React.FC = () => {
    const [option, setOption] = useState<string>();
    const [strikePrice, setStrikePrice] = useState<string>();
    const [start, setStart] = useState<Dayjs | null>(dayjs());
    const [exp, setExp] = useState<Dayjs | null>(null);
    const [sellPrice, setSellPrice] = useState<string>();
    const [optionCount, setOptionCount] = useState<number>(1);
    const [recordContract, setRecordContract] = useState<boolean>();

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

    const inputProps = {
        type: "number",
        pattern: "[0-9]*",
    };

    return (
        <div className="Contract">
            <div className="item">
                <OptionPicker
                    onOptionChange={(option: string) => setOption(option)}
                />
            </div>
            <div className="item">
                <TextField
                    label="Strike price"
                    InputProps={{
                        startAdornment: "$",
                        inputProps: inputProps,
                    }}
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                        setStrikePrice(e.target.value)
                    }
                />
            </div>
            <div className="item">
                <MobileDatePicker
                    label="Start date"
                    value={start}
                    onChange={(newValue: Dayjs | null) => setStart(newValue)}
                />
            </div>
            <div className="item">
                <MobileDatePicker
                    label="Expire date"
                    value={exp}
                    onChange={(newValue: Dayjs | null) => setExp(newValue)}
                />
            </div>
            <div className="item">
                <TextField
                    label="Sold for"
                    InputProps={{
                        startAdornment: "$",
                        inputProps: inputProps,
                    }}
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                        setSellPrice(e.target.value)
                    }
                />
            </div>
            <div className="item">
                <OptionCounter
                    onOptionCountChange={(optionCount: number) =>
                        setOptionCount(optionCount)
                    }
                />
            </div>
            <div className="item">
                <ContractAction
                    onContractActionChange={(recordContract: boolean) =>
                        setRecordContract(recordContract)
                    }
                />
            </div>
            {/* {days !== null && <div>{current + "%"}</div>}
            {days !== null && (
                <CircularProgress variant="determinate" value={current} />
            )} */}
        </div>
    );
};

export default Contract;
