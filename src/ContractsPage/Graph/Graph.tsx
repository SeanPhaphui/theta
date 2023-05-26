import React, { useEffect, useState } from "react";
import {
    VictoryChart,
    VictoryLine,
    VictoryScatter,
    VictoryTheme,
    VictoryAxis,
    VictoryTooltip,
    VictoryZoomContainer,
} from "victory";
import { ContractObject } from "../../Contract/Contract";
import dayjs from "dayjs";

interface ContractCardsProps {
    contracts: ContractObject[];
}

const Graph: React.FC<ContractCardsProps> = (props) => {
    const { contracts } = props;
    const [showChart, setShowChart] = useState<boolean>(false);
    const [cumulativeReturnData, setCumulativeReturnData] = useState<
        {
            x: Date;
            y: number;
            ticker: string;
            total: number;
        }[]
    >([]);

    useEffect(() => {
        const sortedContracts = contracts
            .slice()
            .sort((a, b) => a.startDate.diff(b.startDate));

        let cumulativeReturn = 0;
        const data = sortedContracts.map((contract) => {
            const returnFromContract =
                contract.totalSellPrice - contract.totalBuyBackPrice;
            cumulativeReturn += returnFromContract;
            return {
                x: contract.startDate.toDate(),
                y: cumulativeReturn,
                ticker: contract.ticker,
                total: contract.totalSellPrice - contract.totalBuyBackPrice,
            };
        });

        setCumulativeReturnData(data);
    }, [contracts]);

    const handleChartToggle = () => {
        setShowChart(!showChart);
    };

    return (
        <div className="Graph">
            <div className="chart-container">
                <div className="chart-toggle">
                    <button onClick={handleChartToggle}>
                        {showChart ? "Hide Chart" : "Show Chart"}
                    </button>
                </div>
                {showChart && (
                    <VictoryChart
                        theme={VictoryTheme.material}
                        containerComponent={<VictoryZoomContainer />}
                    >
                        <VictoryAxis
                            dependentAxis
                            tickFormat={(tick) => `$${tick.toLocaleString()}`}
                        />
                        <VictoryAxis
                            tickFormat={(tick) => dayjs(tick).format("MMMM Do")}
                        />
                        <VictoryLine data={cumulativeReturnData} />
                        <VictoryScatter
                            data={cumulativeReturnData}
                            labels={({ datum }) =>
                                `${
                                    datum.ticker
                                }\nReturn: $${datum.total.toLocaleString()}`
                            }
                            labelComponent={<VictoryTooltip />}
                        />
                    </VictoryChart>
                )}
            </div>
        </div>
    );
};

export default Graph;
