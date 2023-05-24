import dayjs, { Dayjs } from "dayjs";
import { ContractObject } from "../Contract/Contract";

export const timeProgress = (startDate: Dayjs, endDate: Dayjs): number => {
    const currentDate = dayjs();
    const totalDays = endDate.diff(startDate, "day");
    const daysPassed = currentDate.diff(startDate, "day");
    const percentage = Math.round((daysPassed / totalDays) * 100);
    return percentage;
};

export const testContracts: ContractObject[] = [
    {
        ticker: "GOOGL",
        optionType: "Call",
        strikePrice: "$120",
        startDate: dayjs("2023-05-10"),
        expireDate: dayjs("2023-06-16"),
        sellPrice: 700,
        optionCount: 1,
        timeProgress: timeProgress(
            dayjs("2023-05-10"),
            dayjs("2023-06-16")
        ),
    },
    {
        ticker: "AMC",
        optionType: "Put",
        strikePrice: "$20",
        startDate: dayjs("2023-05-01"),
        expireDate: dayjs("2023-06-16"),
        sellPrice: 450,
        optionCount: 3,
        timeProgress: timeProgress(
            dayjs("2023-05-01"),
            dayjs("2023-06-16")
        ),
    },
];
