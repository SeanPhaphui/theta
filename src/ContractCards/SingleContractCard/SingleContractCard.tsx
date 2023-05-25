import ScheduleIcon from "@mui/icons-material/Schedule";
import { Box, Card, Typography } from "@mui/material";
import LinearProgress, {
    LinearProgressProps,
} from "@mui/material/LinearProgress";
import dayjs from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";
import React, { useEffect, useState } from "react";
import "./SingleContractCard.css";
import { ContractObject } from "../../Contract/Contract";
import {
    getContractStatus,
    getStatusColorVariation,
    hasDayPassed,
    timeProgress,
} from "../../Utils/Utils";

function LinearProgressWithLabel(
    props: LinearProgressProps & { value: number; status: string }
) {
    return (
        <Box sx={{ display: "flex", alignItems: "center" }}>
            <Box sx={{ width: "100%", mr: 1 }}>
                <LinearProgress variant="determinate" {...props} />
            </Box>
            <Box sx={{ minWidth: 35 }}>
                <Typography variant="body2" color={props.status}>{`${Math.round(
                    props.value
                )}%`}</Typography>
            </Box>
        </Box>
    );
}

dayjs.extend(advancedFormat);

interface SingleContractCardProps {
    contract: ContractObject;
}

const SingleContractCard: React.FC<SingleContractCardProps> = (props) => {
    const { contract } = props;

    function handleClick(event: React.MouseEvent<HTMLElement>): void {
        console.log("Clicked");
    }
    const [lossAmount, setLossAmount] = useState<number>(contract.totalSellPrice - contract.totalBuyBackPrice);
    const lostMoney: boolean =
        contract.totalBuyBackPrice > contract.totalSellPrice;

    useEffect(() => {
        if (lostMoney) {
            const loss = contract.totalBuyBackPrice - contract.totalSellPrice;
            setLossAmount(loss);
        }
    }, [contract.totalBuyBackPrice, contract.totalSellPrice, lostMoney]);

    const expired: boolean = hasDayPassed(dayjs(), contract.expireDate);
    const boughtBack: boolean = contract.totalBuyBackPrice > 0;

    const contractStatus: string = getContractStatus(contract);
    const statusColors = getStatusColorVariation(contractStatus);

    const timeStatus: string =
        expired || boughtBack
            ? "Closed"
            : contract.expireDate.format("MMMM Do");

    return (
        <div className="SingleContractCard">
            <Card className={contractStatus} onClick={handleClick}>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                    <ScheduleIcon />
                    <Typography
                        sx={{ fontSize: 12, ml: "5px", mt: "1px" }}
                        color="rgba(255, 255, 255, 0.7);"
                    >
                        {timeStatus}
                    </Typography>
                </Box>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                    <Typography
                        sx={{
                            fontSize: 20,
                            fontFamily: "IBMPlexSans-SemiBold",
                        }}
                    >
                        {contract.ticker +
                            " " +
                            contract.strikePrice +
                            " " +
                            contract.optionType}
                    </Typography>
                </Box>
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "flex-start",
                        textAlign: "left",
                    }}
                >
                    <Typography
                        sx={{
                            fontSize: "14px",
                            fontFamily: "IBMPlexSans-Medium",
                            color: statusColors.main,
                        }}
                    >
                        {contract.optionCount > 1
                            ? contract.optionCount + " sells"
                            : contract.optionCount + " sell"}
                    </Typography>
                    <Typography
                        sx={{
                            fontSize: "16px",
                            fontFamily: "IBMPlexSans-Medium",
                            mr: "5px",
                        }}
                    >
                        {lostMoney
                            ? "-$" + lossAmount
                            : "+$" + lossAmount}
                    </Typography>
                </Box>
                <LinearProgressWithLabel
                    value={timeProgress(
                        contract.startDate,
                        contract.expireDate
                    )}
                    status={statusColors.variant}
                />
            </Card>
        </div>
    );
};

export default SingleContractCard;
