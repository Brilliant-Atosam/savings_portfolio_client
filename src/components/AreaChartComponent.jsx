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
const AreaChartComponent = ({ data }) => {
  return (
    <AreaChart
      width={900}
      height={350}
      data={data}
      margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
    >
      <defs>
        <linearGradient id="savings" x1="0" y1="0" x2="0" y2="1">
          <stop offset="5%" stopColor="#3399ff" stopOpacity={0.8} />
          <stop offset="95%" stopColor="#5084b8" stopOpacity={0} />
        </linearGradient>
        <linearGradient id="expenses" x1="0" y1="0" x2="0" y2="1">
          <stop offset="5%" stopColor="#ff3399" stopOpacity={0.8} />
          <stop offset="95%" stopColor="#f02c8e" stopOpacity={0} />
        </linearGradient>
        <linearGradient id="income" x1="0" y1="0" x2="0" y2="1">
          <stop offset="5%" stopColor="#66ffff" stopOpacity={0.8} />
          <stop offset="95%" stopColor="#00cccc" stopOpacity={0} />
        </linearGradient>
      </defs>
      <XAxis dataKey="title" />
      <YAxis domain={[0, "auto"]} />
      <CartesianGrid strokeDasharray="3 3" />
      <Tooltip />
      <Legend />
      <Area
        type="monotone"
        dataKey="total_income"
        stroke="teal"
        fillOpacity={1}
        fill="url(#income)"
      />
      <Area
        type="monotone"
        dataKey="total_savings"
        stroke="#0d7eef"
        fillOpacity={1}
        fill="url(#savings)"
      />
      <Area
        type="monotone"
        dataKey="total_expenses"
        stroke="#fa0f85"
        fillOpacity={1}
        fill="url(#expenses)"
      />
    </AreaChart>
  );
};

export default AreaChartComponent;
