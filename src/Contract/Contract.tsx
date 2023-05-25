import React, { ChangeEvent, useEffect, useState } from "react";
import { TextField } from "@mui/material";
import { MobileDatePicker } from "@mui/x-date-pickers";
import dayjs, { Dayjs } from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";
import { v4 as uuidv4 } from 'uuid';

import "./Contract.css";
import ContractAction from "./ContractAction/ContractAction";
import OptionCounter from "./OptionCounter/OptionCounter";
import OptionPicker from "./OptionPicker/OptionPicker";

dayjs.extend(advancedFormat);

export interface ContractObject {
    id: string;
    ticker: string;
    optionType: string;
    strikePrice: string;
    startDate: Dayjs;
    expireDate: Dayjs;
    totalSellPrice: number;
    optionCount: number;
    totalBuyBackPrice: number;
}

interface ContractProps {
    ticker: string;
    onAdd: (contract: ContractObject) => void;
}

const Contract: React.FC<ContractProps> = (props) => {
    const { ticker, onAdd } = props;
    const [option, setOption] = useState<string>();
    const [strikePrice, setStrikePrice] = useState<string>();
    const [startDate, setStart] = useState<Dayjs | null>(dayjs());
    const [expDate, setExp] = useState<Dayjs | null>(null);
    const [individualSellPrice, setIndividualSellPrice] = useState<string>();
    const [optionCount, setOptionCount] = useState<number>(1);

    const [disableAddContract, setDisableAddContract] = useState<boolean>(true);

    const inputProps = {
        type: "tel",
        pattern: "[0-9]*\\.?[0-9]+",
        inputmode: "decimal",
      };

    useEffect(() => {
        if (
            option &&
            strikePrice &&
            startDate &&
            expDate &&
            individualSellPrice
        ) {
            setDisableAddContract(false);
        } else {
            setDisableAddContract(true);
        }
    }, [option, strikePrice, startDate, expDate, individualSellPrice]);

    const buildContract = () => {
        if (
            option &&
            strikePrice &&
            startDate &&
            expDate &&
            individualSellPrice
        ) {
            let totalSellPrice: number = Number(individualSellPrice);
            if (optionCount > 1) {
                totalSellPrice = Number(individualSellPrice) * optionCount;
            }
            const contract: ContractObject = {
                id: uuidv4(),
                ticker: ticker,
                optionType: option,
                strikePrice: "$" + strikePrice,
                startDate: startDate,
                expireDate: expDate,
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
                    value={startDate}
                    onChange={(newValue: Dayjs | null) => setStart(newValue)}
                />
            </div>
            <div className="item">
                <MobileDatePicker
                    label="Expire date"
                    value={expDate}
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
                        setIndividualSellPrice(e.target.value)
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
