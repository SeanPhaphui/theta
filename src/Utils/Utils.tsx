import dayjs, { Dayjs } from "dayjs";
import { ContractObject } from "../Contract/Contract";

export const timeProgress = (startDate: Dayjs, endDate: Dayjs): number => {
    const currentDate = dayjs();
    const totalDays = endDate.diff(startDate, "day");
    const daysPassed = currentDate.diff(startDate, "day");
    let percentage = Math.round((daysPassed / totalDays) * 100);
    if (percentage > 100) {
        percentage = 100;
    }
    return percentage;
};

export const hasDayPassed = (d1: dayjs.Dayjs, d2: dayjs.Dayjs): boolean => {
    return d1.isAfter(d2);
};

export const getContractStatus = (contract: ContractObject): string => {
    const expired = hasDayPassed(dayjs(), contract.expireDate);
    const boughtBack = contract.totalBuyBackPrice > 0;
    const lostMoney = contract.totalBuyBackPrice > contract.totalSellPrice;

    if (boughtBack && lostMoney) {
        return "loss";
    } else if ((boughtBack || expired) && !lostMoney) {
        return "gain";
    } else {
        return "active";
    }
}

export const getStatusColorVariation = (status: string) => {
    switch (status) {
        case 'loss':
            return {
                main: '#ff6d6d', // replace with the main color for loss status
                variant: '#ff5050' // replace with the variant color for loss status
            };
        case 'gain':
            return {
                main: '#9effa6', // replace with the main color for gain status
                variant: '#9effa6' // replace with the variant color for gain status
            };
        default:
            return {
                main: '#99CCF3', // replace with the main color for active status
                variant: 'rgb(0, 200, 255)' // replace with the variant color for active status
            };
    }
}

export const testContracts: ContractObject[] = [
    {
        ticker: "GOOGL",
        optionType: "Call",
        strikePrice: "$120",
        startDate: dayjs("2023-05-10"),
        expireDate: dayjs("2023-06-16"),
        totalSellPrice: 100,
        optionCount: 1,
        totalBuyBackPrice: 0,
    },
    {
        ticker: "GOOG",
        optionType: "Call",
        strikePrice: "$120",
        startDate: dayjs("2023-05-10"),
        expireDate: dayjs("2023-06-16"),
        totalSellPrice: 120,
        optionCount: 1,
        totalBuyBackPrice: 20,
    },
    {
        ticker: "AMC",
        optionType: "Put",
        strikePrice: "$20",
        startDate: dayjs("2023-04-01"),
        expireDate: dayjs("2023-05-16"),
        totalSellPrice: 150,
        optionCount: 3,
        totalBuyBackPrice: 0,
    },
    {
        ticker: "GOOGL",
        optionType: "Call",
        strikePrice: "$100",
        startDate: dayjs("2023-04-04"),
        expireDate: dayjs("2023-05-05"),
        totalSellPrice: 200,
        optionCount: 1,
        totalBuyBackPrice: 350,
    },
];
