import ScheduleIcon from "@mui/icons-material/Schedule";
import {
    Box,
    Card,
    Typography
} from "@mui/material";
import LinearProgress, {
    LinearProgressProps,
} from "@mui/material/LinearProgress";
import React from "react";
import {
    getContractStatus,
    getDaysCardStatus,
    getStatusColorVariation,
    timeProgress
} from "../../../Utils/Utils";
import "./ContractCard.css";
import { ContractObject } from "../../../Contract/Contract";



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

interface ContractCardProps {
    contract: ContractObject;
    viewStyle: boolean;
    openDialog: () => void;
}

const ContractCard: React.FC<ContractCardProps> = (props) => {
    const { contract, viewStyle, openDialog } = props;

    const lostMoney = contract.totalBuyBackPrice > contract.totalSellPrice;
    const netReturn = Math.abs(
        contract.totalSellPrice - contract.totalBuyBackPrice
    );

    const boughtBack: boolean = contract.totalBuyBackPrice > 0;

    const contractStatus: string = getContractStatus(contract);
    const statusColors = getStatusColorVariation(contractStatus);

    let cardClassName = viewStyle ? "ContractCard3D" : "ContractCard2D";

    return (
        <div className={cardClassName}>
            <Card className={contractStatus} onClick={openDialog}>
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
                            color: statusColors.main,
                        }}
                    >
                        {contract.optionCount > 1
                            ? contract.optionCount + " sells"
                            : contract.optionCount + " sell"}
                    </Typography>
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                        }}
                    >
                        <Typography
                            sx={{
                                fontSize: "16px",
                                fontFamily: "IBMPlexSans-Medium",
                                mr: "5px",
                            }}
                        >
                            {lostMoney ? "-$" + netReturn : "+$" + netReturn}
                        </Typography>
                        <Typography
                            sx={{
                                fontSize: "14px",
                                fontFamily: "IBMPlexSans-Medium",
                                color: statusColors.main,
                                mr: "5px",
                            }}
                        >
                            {getDaysCardStatus(contract.expireDate, boughtBack)}
                        </Typography>
                    </Box>
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

export default ContractCard;
