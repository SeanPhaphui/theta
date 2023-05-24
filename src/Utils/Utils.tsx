import dayjs, { Dayjs } from "dayjs";

export const timeProgress = (startDate: Dayjs, endDate: Dayjs): number => {
    const currentDate = dayjs();
    const totalDays = endDate.diff(startDate, "day");
    const daysPassed = currentDate.diff(startDate, "day");
    const percentage = Math.round((daysPassed / totalDays) * 100);
    return percentage;
};
