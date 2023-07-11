import React, { useCallback, useState } from "react";
import { ContractObject } from "../../Contract/Contract";
import D3Chart from "./D3Chart/D3Chart";

interface D3ChartContainerProps {
  data: ContractObject[];
}

const D3ChartContainer: React.FC<D3ChartContainerProps> = ({ data }) => {
  const [showChart, setShowChart] = useState<boolean>(false);

  const handleChartToggle = useCallback(() => {
    setShowChart(!showChart);
  }, [showChart]);

  return (
    <div className="D3ChartContainer">
      <div className="chart-container">
        <div className="chart-toggle">
          <button onClick={handleChartToggle}>
            {showChart ? "Hide Chart" : "Show Chart"}
          </button>
        </div>
        {showChart && <D3Chart data={data} />}
      </div>
    </div>
  );
};

export default D3ChartContainer;
