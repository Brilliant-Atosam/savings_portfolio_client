import React from "react";
import {
  RadialBarChart,
  RadialBar,
  Legend,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import Util from "../utils/util";
const style = {
  lineHeight: "24px",
  display: "flex",
  flexDirection: "column",
  width: "100%",
};
const RadialBarChartComponent = ({ data }) => {
  const { format_currency } = Util();
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload; // Access full data object
      return (
        <div
          style={{
            backgroundColor: "#fff",
            padding: "8px 12px",
            borderRadius: "5px",
            boxShadow: "0 0 8px rgba(0,0,0,0.2)",
          }}
        >
          <p style={{ margin: 0, fontWeight: "bold", color: data.fill }}>
            {data.name}
          </p>
          <p style={{ margin: 0 }}>Amount: {format_currency(data.amount)}</p>
          <p style={{ margin: 0 }}>createdAt: {data.created_at}</p>
          <p style={{ margin: 0 }}>Deadline: {data.deadline}</p>

          <p style={{ margin: 0 }}>Progress: {data.progress}%</p>
        </div>
      );
    }
    return null;
  };
  return (
    <ResponsiveContainer width={"100%"} height={"100%"}>
      <RadialBarChart
        style={style}
        innerRadius="10%"
        outerRadius="80%"
        data={data}
        startAngle={0}
        endAngle={180}
        className="radial-chart-container"
        maxBarSize={data?.goal}
      >
        <RadialBar
          minAngle={15}
          label={{ fill: "#666", position: "insideEnd" }}
          background
          clockWise={true}
          dataKey="progress"
        />
        <Legend iconSize={10} />
        <Tooltip label="name" content={<CustomTooltip />} />
      </RadialBarChart>
    </ResponsiveContainer>
  );
};
export default RadialBarChartComponent;
