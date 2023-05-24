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
import { hasDayPassed, timeProgress } from "../../Utils/Utils";

function LinearProgressWithLabel(
    props: LinearProgressProps & { value: number, expired: boolean }
) {
    return (
        <Box sx={{ display: "flex", alignItems: "center" }}>
            <Box sx={{ width: "100%", mr: 1 }}>
                <LinearProgress variant="determinate" {...props} />
            </Box>
            <Box sx={{ minWidth: 35 }}>
                <Typography
                    variant="body2"
                    color = {props.expired ? "#9effa6" : "rgb(0, 200, 255)"}
                >{`${Math.round(props.value)}%`}</Typography>
            </Box>
        </Box>
    );
}

dayjs.extend(advancedFormat);

interface SingleContractCardProps {
    contract: ContractObject;
    index: number;
}

const SingleContractCard: React.FC<SingleContractCardProps> = (props) => {
    const { contract, index } = props;

    const expired: boolean = hasDayPassed(dayjs(), contract.expireDate);
    const className: string = expired ? "expired" : "active";

    function handleClick(event: React.MouseEvent<HTMLElement>): void {
        console.log("Clicked")
    }

    return (
        <div className="SingleContractCard">
            <Card className={className} key={index} onClick={handleClick}>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                    <ScheduleIcon />
                    <Typography
                        sx={{ fontSize: 12, ml: "5px", mt: "1px" }}
                        color="rgba(255, 255, 255, 0.7);"
                    >
                        {contract.expireDate.format("MMMM Do")}
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
                            color: expired ? "#9effa6" : "#99CCF3",
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
                        {"+$" + contract.sellPrice}
                    </Typography>
                </Box>
                <LinearProgressWithLabel value={timeProgress(contract.startDate, contract.expireDate)} expired={expired}/>
            </Card>
        </div>
    );
};

export default SingleContractCard;
