import ScheduleIcon from "@mui/icons-material/Schedule";
import { Box, Card, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { ContractObject } from "../../../Contract/Contract";
import {
    getContractMarketPrice,
    getContractStatus,
    getDaysCardStatus,
    getStatusColorVariation,
    timeProgress,
} from "../../../Utils/Utils";
import "./ContractCard.css";
import LinearProgressWithLabel from "./LinearProgressWithLabel/LinearProgressWithLabel";

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

    const [regularMarketPrice, setRegularMarketPrice] = useState<number>(0);
    const [percentage, setPercentage] = useState(0);
    const [ret, setRet] = useState("");

    const getClosePercentage = () => {
        let perc = Math.round(
            ((contract.totalSellPrice - contract.totalBuyBackPrice) /
                contract.totalSellPrice) *
                100
        );
        if (perc > 100) {
            perc = 100;
        }
        return perc;
    };

    useEffect(() => {
      if (contractStatus === "active") {
        getContractMarketPrice(contract).then(setRegularMarketPrice);
        console.log("use")
      }
    }, [contractStatus, contract]);

    const getPercentage = () => {
        const sellPrice = contract.totalSellPrice / contract.optionCount;
        let perc = Math.round(
            ((sellPrice - regularMarketPrice) / sellPrice) * 100
        );
        if (perc > 100) {
            perc = 100;
        }
        setPercentage(perc);
    };

    const getReturn = () => {
        const sellPrice = contract.totalSellPrice / contract.optionCount;
        const re = Math.round(
            (sellPrice - regularMarketPrice) * contract.optionCount
        );
        const absRe = Math.abs(re);
        if (re > 0) {
            setRet(`+$${absRe}`);
        } else {
            setRet(`-$${absRe}`);
        }
    };

    useEffect(() => {
        getPercentage();
        getReturn();
    }, [regularMarketPrice]);

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
                                {lostMoney
                                    ? "-$" + netReturn
                                    : "+$" + netReturn}
                            </Typography>
                            {contractStatus === "active" && (
                                <Typography
                                    sx={{
                                        fontSize: "16px",
                                        fontFamily: "IBMPlexSans-Medium",
                                        color: statusColors.main,
                                        mr: "5px",
                                    }}
                                >
                                    {ret}
                                </Typography>
                            )}
                        </Box>

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
                {contractStatus === "active" ? (
                    <LinearProgressWithLabel
                        value={timeProgress(
                            contract.startDate,
                            contract.expireDate
                        )}
                        status={statusColors.variant}
                        lineColor="white"
                    />
                ) : (
                    <LinearProgressWithLabel
                        value={getClosePercentage()}
                        status={statusColors.variant}
                        lineColor="white"
                    />
                )}

                {contractStatus === "active" && (
                    <LinearProgressWithLabel
                        value={percentage}
                        status={statusColors.variant}
                        lineColor="green"
                    />
                )}
            </Card>
        </div>
    );
};

export default ContractCard;
