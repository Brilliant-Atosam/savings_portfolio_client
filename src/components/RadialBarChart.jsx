import React from "react";

import {
  RadialBarChart,
  RadialBar,
  Legend,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import Util from "../utils/util";

const data = [
  {
    name: "18-24",
    uv: 31.47,
    pv: 2400,
    fill: "#8884d8",
  },
  {
    name: "25-29",
    uv: 26.69,
    pv: 4567,
    fill: "#83a6ed",
  },
  {
    name: "30-34",
    uv: 15.69,
    pv: 1398,
    fill: "#8dd1e1",
  },
  {
    name: "35-39",
    uv: 8.22,
    pv: 9800,
    fill: "#82ca9d",
  },
  {
    name: "40-49",
    uv: 8.63,
    pv: 3908,
    fill: "#a4de6c",
  },
  {
    name: "50+",
    uv: 2.63,
    pv: 4800,
    fill: "#d0ed57",
  },
  {
    name: "unknow",
    uv: 6.67,
    pv: 4800,
    fill: "#ffc658",
  },
];

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
      >
        <RadialBar
          minAngle={15}
          label={{ fill: "#666", position: "insideEnd" }}
          background
          clockWise={true}
          dataKey="progress"
        />
        <Legend
          iconSize={10}
          // width={120}
          // height={140}
          // layout="vertical"
          // verticalAlign="middle"
          // align="right"
        />
        <Tooltip label="name" content={<CustomTooltip />} />
      </RadialBarChart>
    </ResponsiveContainer>
  );
};
export default RadialBarChartComponent;
