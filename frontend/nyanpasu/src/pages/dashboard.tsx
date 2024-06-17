import { BasePage } from "@nyanpasu/ui";
import * as d3 from "d3";
import { useEffect, useRef, useState } from "react";

export const Dashboard = () => {
  const [data, setData] = useState([5, 10, 8, 12, 15, 9, 7, 11, 13]);

  useEffect(() => {
    const interval = setInterval(() => {
      setData((prevData) => {
        const newData = [...prevData, Math.floor(Math.random() * 20)];
        return newData.length > 16
          ? newData.slice(newData.length - 16)
          : newData;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const svgRef = useRef(null);

  useEffect(() => {
    const svg = d3.select(svgRef.current);
    const width = 400;
    const height = 100;
    const margin = { top: 10, right: 10, bottom: 10, left: 10 };

    svg
      .attr("width", width)
      .attr("height", height)
      .style("overflow", "visible")
      .style("margin-top", "50px");

    const x = d3
      .scaleLinear()
      .domain([0, data.length - 1])
      .range([margin.left, width - margin.right]);

    const y = d3
      .scaleLinear()
      .domain([0, d3.max(data, (d) => d)])
      .range([height - margin.bottom, margin.top]);

    const line = d3
      .line()
      .x((d, i) => x(i))
      .y((d) => y(d))
      .curve(d3.curveBasis);

    svg.selectAll("*").remove();

    svg
      .append("path")
      .datum(data)
      .attr("fill", "none")
      .attr("stroke", "#8A2BE2")
      .attr("stroke-width", 2)
      .attr("d", line);

    svg
      .append("path")
      .datum(data)
      .attr("fill", "rgba(138, 43, 226, 0.2)")
      .attr(
        "d",
        d3
          .area()
          .x((d, i) => x(i))
          .y0(height - margin.bottom)
          .y1((d) => y(d))
          .curve(d3.curveBasis),
      );
  }, [data]);

  return (
    <BasePage title={"Dashboard"}>
      <svg ref={svgRef} width={500} height={50}></svg>
    </BasePage>
  );
};

export default Dashboard;
