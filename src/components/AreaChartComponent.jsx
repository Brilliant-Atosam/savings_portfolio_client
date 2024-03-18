import React from "react";
import {
  AreaChart,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Area,
} from "recharts";
const AreaChartComponent = ({ data }) => {
  return (
    <AreaChart
      width={700}
      height={320}
      data={data}
      margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
    >
      <defs>
        <linearGradient id="income" x1="0" y1="0" x2="0" y2="1">
          <stop offset="5%" stopColor="#66ffff" stopOpacity={0.8} />
          <stop offset="95%" stopColor="#00cccc" stopOpacity={0} />
        </linearGradient>
        <linearGradient id="savings" x1="0" y1="0" x2="0" y2="1">
          <stop offset="5%" stopColor="#3399ff" stopOpacity={0.8} />
          <stop offset="95%" stopColor="#5084b8" stopOpacity={0} />
        </linearGradient>
      </defs>
      <XAxis dataKey="title" />
      <YAxis />
      <CartesianGrid strokeDasharray="3 3" />
      <Tooltip content={data} />
      <Area
        type="monotone"
        dataKey="total_amount"
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
    </AreaChart>
  );
};

export default AreaChartComponent;
