import { TextField } from "@mui/material";
import { MobileDatePicker } from "@mui/x-date-pickers";
import dayjs, { Dayjs } from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";
import React, { ChangeEvent, useEffect, useState } from "react";
import { timeProgress } from "../Utils/Utils";
import "./Contract.css";
import ContractAction from "./ContractAction/ContractAction";
import OptionCounter from "./OptionCounter/OptionCounter";
import OptionPicker from "./OptionPicker/OptionPicker";

dayjs.extend(advancedFormat);

export interface ContractObject {
    ticker: string;
    optionType: string;
    strikePrice: string;
    startDate: Dayjs;
    expireDate: Dayjs;
    totalSellPrice: number;
    optionCount: number;
    totalBuyBackPrice:number;
}

interface ContractProps {
    ticker: string;
    onAdd: (contract: ContractObject) => void;
}

const Contract: React.FC<ContractProps> = (props) => {
    const { ticker, onAdd } = props;
    const [option, setOption] = useState<string>();
    const [strikePrice, setStrikePrice] = useState<string>();
    const [start, setStart] = useState<Dayjs | null>(dayjs());
    const [exp, setExp] = useState<Dayjs | null>(null);
    const [sellPrice, setSellPrice] = useState<string>();
    const [optionCount, setOptionCount] = useState<number>(1);

    const [current, setCurrent] = useState<number>(0);
    const [days, setDays] = useState<number | null>(null);

    const [disableAddContract, setDisableAddContract] = useState<boolean>(true);

    const currentDate = dayjs();

    const currentDateString = currentDate.format("MMMM Do");
    console.log(currentDateString);

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

    useEffect(() => {
        if(option && strikePrice && start && exp && sellPrice){
            setDisableAddContract(false);
        } else {
            setDisableAddContract(true);
        }
        calculateDaysBetweenDates();
    }, [option, strikePrice, start, exp, sellPrice]);

    const buildContract = () => {
        if (option && strikePrice && start && exp && sellPrice) {
            let totalSellPrice: number = Number(sellPrice);
            if(optionCount > 1){
                totalSellPrice = Number(sellPrice) * optionCount;
            }
            const contract: ContractObject = {
                ticker: ticker,
                optionType: option,
                strikePrice: "$" + strikePrice,
                startDate: start,
                expireDate: exp,
                totalSellPrice: totalSellPrice,
                optionCount: optionCount,
                totalBuyBackPrice: 0,
            };
            onAdd(contract);
        }
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
                    disabled={disableAddContract}
                    onContractActionChange={() => buildContract()}
                />
            </div>
        </div>
    );
};

export default Contract;
