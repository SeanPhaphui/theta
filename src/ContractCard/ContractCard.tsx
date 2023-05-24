import ScheduleIcon from "@mui/icons-material/Schedule";
import { Box, Card, Typography } from "@mui/material";
import LinearProgress, {
    LinearProgressProps,
} from "@mui/material/LinearProgress";
import dayjs from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";
import React, { useEffect } from "react";
import "./ContractCard.css";
import { ContractObject } from "../Contract/Contract";

function LinearProgressWithLabel(
    props: LinearProgressProps & { value: number }
) {
    return (
        <Box sx={{ display: "flex", alignItems: "center" }}>
            <Box sx={{ width: "100%", mr: 1 }}>
                <LinearProgress variant="determinate" {...props} />
            </Box>
            <Box sx={{ minWidth: 35 }}>
                <Typography
                    variant="body2"
                    color="rgb(0, 200, 255)"
                >{`${Math.round(props.value)}%`}</Typography>
            </Box>
        </Box>
    );
}

dayjs.extend(advancedFormat);

interface ContractCardsProps {
    contracts: ContractObject[];
}

const ContractCards: React.FC<ContractCardsProps> = (props) => {
    const { contracts } = props;
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = (value: string) => {
        setOpen(false);
    };
    
    // const calculateDaysBetweenDates = (contracts: ContractObject[]) => {
    //         const totalDays = exp.diff(start, "day");
    //         const daysPassed = currentDate.diff(start, "day");
    //         const percentage = (daysPassed / totalDays) * 100;
    //         setCurrent(Math.round(percentage));
    //         setDays(totalDays);
    // };

    // useEffect(() => {
    //     calculateDaysBetweenDates();
    // }, [contracts]);

    return (
        <div className="ContractCard">
            {contracts &&
                contracts.map((element) => {
                    return (
                        <Card>
                            <Box sx={{ display: "flex", alignItems: "center" }}>
                                <ScheduleIcon />
                                <Typography
                                    sx={{ fontSize: 12, ml: "5px", mt: "1px" }}
                                    color="rgba(255, 255, 255, 0.7);"
                                >
                                    {element.expireDate.format("MMMM Do")}
                                </Typography>
                            </Box>
                            <Box sx={{ display: "flex", alignItems: "center" }}>
                                <Typography
                                    sx={{
                                        fontSize: 20,
                                        fontFamily: "IBMPlexSans-SemiBold",
                                    }}
                                >
                                    {element.ticker +
                                        " " +
                                        element.strikePrice +
                                        " " +
                                        element.optionType}
                                </Typography>
                            </Box>
                            <Box
                                sx={{
                                    display: "flex",
                                    flexDirection: "column",
                                    justifyContent: "flex-start",
                                    textAlign: "left"
                                }}
                            >
                                <Typography
                                    sx={{
                                        fontSize: "14px",
                                        fontFamily: "IBMPlexSans-Medium",
                                        color: "#99CCF3",
                                    }}
                                >
                                    {element.optionCount > 1 ? element.optionCount + " sells" : element.optionCount + " sell"}
                                </Typography>
                                <Typography
                                    sx={{
                                        fontSize: "16px",
                                        fontFamily: "IBMPlexSans-Medium",
                                        mr: "5px",
                                    }}
                                >
                                    {element.sellPrice}
                                </Typography>
                            </Box>
                            {/* <Box
                                sx={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                }}
                            >
                                <Typography
                                    sx={{
                                        fontSize: "16px",
                                        fontFamily: "IBMPlexSans-Medium",
                                    }}
                                >
                                    {element.optionCount > 1 ? element.optionCount + " sells" : element.optionCount + " sell"}
                                </Typography>
                                <Typography
                                    sx={{
                                        fontSize: "16px",
                                        fontFamily: "IBMPlexSans-Medium",
                                        mr: "5px",
                                    }}
                                >
                                    {element.sellPrice}
                                </Typography>
                            </Box> */}
                            <LinearProgressWithLabel value={element.timeProgress} />
                            {/* <CardActions>
                        <Button size="small">Learn More</Button>
                    </CardActions> */}
                        </Card>
                    );
                })}
        </div>
    );
};

export default ContractCards;
