import { Tooltip } from "@mui/material";
import React from "react";
import { Bar, BarChart, CartesianGrid, Legend, XAxis, YAxis } from "recharts";
const BarChartComponent = () => {
  const data = [
    {
      name: "Income",
      uv: 4000,
      pv: 2400,
      us: 2900,
    },
  ];
  return (
    <BarChart
      width={500}
      height={300}
      data={data}
      margin={{
        top: 5,
        right: 10,
        left: 10,
        bottom: 5,
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip shared={false} trigger="click" />
      <Legend />
      <Bar dataKey="pv" fill="#8884d8" />
      <Bar dataKey="uv" fill="#82ca9d" />
      <Bar dataKey="us" fill="#8cca07" />
    </BarChart>
  );
};

export default BarChartComponent;
