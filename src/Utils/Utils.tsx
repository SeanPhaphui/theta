import dayjs, { Dayjs } from "dayjs";
import { v4 as uuidv4 } from 'uuid';
import { ContractObject } from "../Contract/Contract";

export const timeProgress = (startDate: Dayjs, endDate: Dayjs): number => {
    const currentDate = dayjs();
    const endDatePlusOneDay = endDate.add(2, 'day');
    const totalDays = endDatePlusOneDay.diff(startDate, "day");
    const daysPassed = currentDate.diff(startDate, "day");
    let percentage = Math.round((daysPassed / totalDays) * 100);
    if (percentage > 100) {
        percentage = 100;
    }
    return percentage;
};

export const hasDayPassed = (d1: dayjs.Dayjs, d2: dayjs.Dayjs): boolean => {
    const d2PlusOneDay = d2.add(1, 'day');
    return d1.isAfter(d2PlusOneDay);
};

export const getDaysCardStatus = (expireDate: dayjs.Dayjs, boughtBack: boolean): string => {
    const expireDatePlusOneDay = expireDate.add(2, 'day');
    const daysLeft = expireDatePlusOneDay.diff(dayjs(), "day");
    if(daysLeft <= 0 || boughtBack){
        return "Closed";
    } else if (daysLeft > 1){
        return daysLeft + " days left";
    } else {
        return "1 day left";
    }
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

export const getCardTextColors = (status: string) => {
    switch (status) {
        case 'loss':
            return {
                lightText: '#FFCCCC',
                lightPercentage: '#FF9999'
            };
        case 'gain':
            return {
                lightText: '#99FFCC',
                lightPercentage: '#66FF33'
            };
        default:
            return {
                lightText: '#99CCF3',
                lightPercentage: '#00C8FF'
            };
    }
}

const getOption = async (url: string) => {
    const response = await fetch(url);
    return response.json();
};

const buildStringFromContract = (contract: ContractObject): string => {
    const { ticker, optionType, strikePrice, expireDate } = contract;
    const formattedDate = expireDate.format('YYMMDD');
    const formattedOptionType = optionType.charAt(0).toUpperCase(); 
    const formattedStrikePrice = (Number(strikePrice.slice(1)) * 1000).toString().padStart(8, '0');

    return `${ticker}${formattedDate}${formattedOptionType}${formattedStrikePrice}`;
};

export const getContractMarketPrice = async (contract: ContractObject): Promise<number> => {
    const stringContract = buildStringFromContract(contract);

    const proxyUrl = "https://corsproxy.io/?";
    const stonksUrl = `${proxyUrl}https://query1.finance.yahoo.com/v7/finance/options/${stringContract}`;

    const data = await getOption(stonksUrl);
    const output = data.optionChain.result[0];
    if(output === undefined){
        return 0;
    }
    const regularMarketPrice = output.quote.regularMarketPrice * 100;
    return regularMarketPrice;
};

export const loadContractsFromLocalStorage = (): ContractObject[] | null => {
    const storedContracts = localStorage.getItem("Contracts");
    if (storedContracts) {
        const parsedContracts: ContractObject[] = JSON.parse(storedContracts);
        const mappedContracts = parsedContracts.map((contract) => ({
            ...contract,
            startDate: dayjs(contract.startDate),
            expireDate: dayjs(contract.expireDate),
        }));
        return mappedContracts;
    }
    return null;
};

export const testContracts: ContractObject[] = [
    {
        id: uuidv4(),
        ticker: "COIN",
        optionType: "Put",
        strikePrice: "$60",
        startDate: dayjs("2023-05-12"),
        expireDate: dayjs("2023-06-16"),
        totalSellPrice: 530,
        optionCount: 1,
        totalBuyBackPrice: 0,
    },
    {
        id: uuidv4(),
        ticker: "SOFI",
        optionType: "Call",
        strikePrice: "$5",
        startDate: dayjs("2023-05-02"),
        expireDate: dayjs("2023-05-26"),
        totalSellPrice: 78,
        optionCount: 3,
        totalBuyBackPrice: 99,
    },
    {
        id: uuidv4(),
        ticker: "COIN",
        optionType: "Put",
        strikePrice: "$63",
        startDate: dayjs("2023-04-20"),
        expireDate: dayjs("2023-04-28"),
        totalSellPrice: 271,
        optionCount: 1,
        totalBuyBackPrice: 100,
    },
    {
        id: uuidv4(),
        ticker: "AMZN",
        optionType: "Put",
        strikePrice: "$100",
        startDate: dayjs("2023-04-11"),
        expireDate: dayjs("2023-04-28"),
        totalSellPrice: 410,
        optionCount: 1,
        totalBuyBackPrice: 200,
    },
];
