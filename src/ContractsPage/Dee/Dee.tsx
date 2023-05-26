import React, { useEffect, useRef } from "react";
import * as d3 from "d3";
import { Dayjs } from "dayjs";
import dayjs from "dayjs";
import { ContractObject } from "../../Contract/Contract";
import "./Dee.css";

interface DeeProps {
    data: ContractObject[];
}

const Dee: React.FC<DeeProps> = ({ data }) => {
    const svgRef = useRef<SVGSVGElement | null>(null);

    useEffect(() => {
        if (!svgRef.current) return;

        const svg = d3.select(svgRef.current);
        svg.selectAll("*").remove();

        const margin = { top: 20, right: 20, bottom: 30, left: 40 };
        const width = svgRef.current.clientWidth;
        const height = svgRef.current.clientHeight;

        // Sort the data by date and calculate the cumulative return
        const sortedData = [...data].sort(
            (a, b) =>
                a.startDate.toDate().getTime() - b.startDate.toDate().getTime()
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
            .tickFormat((d) => d3.timeFormat("%b %d")(d as Date));
        const yAxis = d3
            .axisLeft(yScale)
            .tickFormat((d) => `$${d.toLocaleString()}`);

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
            .attr("fill", "steelblue")
            .on("mouseover", (event, d) => {
                const tooltipContent = `${d.ticker}\n Return: $${(
                    d.totalSellPrice - d.totalBuyBackPrice
                ).toLocaleString()}`;
                tooltip
                    .style("opacity", 1)
                    .html(tooltipContent)
                    .style("left", Math.min(event.pageX, width - 0) + "px") // Limit tooltip to stay inside the graph
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
            .x((d) => xScale(d.startDate.toDate()) || 0) // Add a fallback value
            .y((d) => yScale(d.cumulativeReturn) || 0); // Add a fallback value

        svg.append("path")
            .datum(cumulativeData)
            .attr("fill", "none")
            .attr("stroke", "steelblue")
            .attr("stroke-width", 2)
            .attr("d", line);
    }, [data]);

    return <svg ref={svgRef} style={{ width: "100%", height: "100%" }} />;
};

export default Dee;
