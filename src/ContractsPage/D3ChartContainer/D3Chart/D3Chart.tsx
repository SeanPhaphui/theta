import React, { useEffect, useRef } from "react";
import { ContractObject } from "../../../Contract/Contract";
import "./D3Chart.css";
import * as d3 from "d3";

interface D3ChartProps {
  data: ContractObject[];
}

const D3Chart: React.FC<D3ChartProps> = ({ data }) => {
  const svgRef = useRef<SVGSVGElement | null>(null);

  useEffect(() => {
    const createChart = () => {
      if (!svgRef.current) return;

      const svg = d3.select(svgRef.current);
      svg.selectAll("*").remove();

      const width = svgRef.current.clientWidth;
      const height = svgRef.current.clientHeight;

      const margin = { top: 20, right: 20, bottom: 30, left: 40 };

      const sortedData = [...data].sort(
        (a, b) =>
          a.startDate.toDate().getTime() -
          b.startDate.toDate().getTime()
      );
      let cumulativeReturn = 0;
      const cumulativeData = sortedData.map((d) => {
        cumulativeReturn += d.totalSellPrice - d.totalBuyBackPrice;
        return { ...d, cumulativeReturn };
      });

      const xScale = d3
        .scaleTime()
        .domain([
          d3.min(data, (d) => d.startDate.toDate())!,
          d3.max(data, (d) => d.startDate.toDate())!,
        ])
        .range([margin.left, width - margin.right]);

      const yScale = d3
        .scaleLinear()
        .domain([0, d3.max(cumulativeData, (d) => d.cumulativeReturn)!])
        .range([height - margin.bottom, margin.top]);

      const xAxis = d3
        .axisBottom(xScale)
        .tickArguments([7])
        .tickFormat((d) => d3.timeFormat("%b %d")(d as Date));
      const yAxis = d3.axisLeft(yScale).tickFormat((d) => `$${d.toLocaleString()}`);

      svg.append("g")
        .attr("transform", `translate(0, ${height - margin.bottom})`)
        .call(xAxis);

      svg.append("g")
        .attr("transform", `translate(${margin.left}, 0)`)
        .call(yAxis);

      const tooltip = d3
        .select(svgRef.current.parentNode as Element)
        .append("div")
        .attr("class", "tooltip")
        .style("opacity", 0)
        .style("position", "absolute");

      svg.selectAll("circle")
        .data(cumulativeData)
        .join("circle")
        .attr("cx", (d) => xScale(d.startDate.toDate()))
        .attr("cy", (d) => yScale(d.cumulativeReturn))
        .attr("r", 5)
        .attr("fill", "url(#stroke-gradient)")
        .on("mouseover", (event, d) => {
          const lostMoney = d.totalBuyBackPrice > d.totalSellPrice;
          const netReturn = Math.abs(d.totalSellPrice - d.totalBuyBackPrice);

          const tooltipContent = `${d.ticker}\n Return: ${
            lostMoney ? "-$" + netReturn : "+$" + netReturn
          }`;

          tooltip
            .style("opacity", 1)
            .html(tooltipContent)
            .style("left", Math.min(event.pageX, width - 0) + "px")
            .style("top", event.pageY - 10 + "px")
            .style("transform", "translate(-50%, -100%)")
            .style("background-color", "rgba(0, 0, 0, 0.8)")
            .style("color", "white")
            .style("padding", "8px")
            .style("border-radius", "4px")
            .style("font-size", "14px")
            .style("pointer-events", "none")
            .style("white-space", "pre");
        })
        .on("mouseout", () => {
          tooltip.style("opacity", 0);
        });

      const line = d3
        .line<(typeof cumulativeData)[0]>()
        .x((d) => xScale(d.startDate.toDate()) || 0)
        .y((d) => yScale(d.cumulativeReturn) || 0);

      const defs = svg.append("defs");

      const gradient = defs
        .append("linearGradient")
        .attr("id", "stroke-gradient")
        .attr("gradientUnits", "userSpaceOnUse")
        .attr("x1", 0)
        .attr("y1", yScale(0))
        .attr("x2", width)
        .attr(
          "y2",
          yScale(d3.max(cumulativeData, (d) => d.cumulativeReturn)!)
        );

      gradient.append("stop").attr("offset", "0%").attr("stop-color", "#007fff");

      gradient.append("stop").attr("offset", "120%").attr("stop-color", "#0059b2");

      svg.append("path")
        .datum(cumulativeData)
        .attr("fill", "none")
        .attr("stroke", "url(#stroke-gradient)")
        .attr("stroke-width", 2)
        .attr("d", line);
    };

    createChart();
  }, [data]);

  return (
    <div style={{ width: "100%", height: "50vh" }}>
      <svg ref={svgRef} style={{ width: "100%", height: "100%" }} />
    </div>
  );
};

export default D3Chart;
