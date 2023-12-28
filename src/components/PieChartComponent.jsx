import React from "react";
import { Cell, Pie, PieChart } from "recharts";

const PieChartComponent = ({portfolio, colors}) => {
  return (
    <PieChart width={400} height={400}>
      <Pie
        nameKey="title"
        dataKey="amount"
        fill="red"
        data={portfolio}
        label
        innerRadius={2}
        outerRadius={80}
      >
        {portfolio?.map((item, index) => (
          <Cell key={index} fill={colors[index]} strokeWidth={1} />
        ))}
      </Pie>
    </PieChart>
  );
};

export default PieChartComponent;
