import React from "react";
import {
  AreaChart,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Area,
  Legend,
} from "recharts";
const LoanAreaChartComponent = ({ data }) => {
  return (
    <AreaChart
      width={900}
      height={350}
      data={data}
      margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
    >
      <defs>
        <linearGradient id="debt" x1="0" y1="0" x2="0" y2="1">
          <stop offset="5%" stopColor="#3399ff" stopOpacity={0.8} />
          <stop offset="95%" stopColor="#5084b8" stopOpacity={0} />
        </linearGradient>
        <linearGradient id="settlement" x1="0" y1="0" x2="0" y2="1">
          <stop offset="5%" stopColor="#ff3399" stopOpacity={0.8} />
          <stop offset="95%" stopColor="#f02c8e" stopOpacity={0} />
        </linearGradient>
      </defs>
      <XAxis dataKey="title" />
      <YAxis domain={[0, "auto"]} />
      <CartesianGrid strokeDasharray="3 3" />
      <Tooltip />
      <Legend />

      <Area
        type="monotone"
        dataKey="debt"
        stroke="#5084b8"
        fillOpacity={1}
        fill="url(#debt)"
      />
      <Area
        type="monotone"
        dataKey="settlement"
        stroke="#fa0f85"
        fillOpacity={1}
        fill="url(#settlement)"
      />
    </AreaChart>
  );
};

export default LoanAreaChartComponent;
