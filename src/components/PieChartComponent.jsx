import React from "react";
import { Cell, Pie, PieChart, Tooltip } from "recharts";

const PieChartComponent = ({ portfolio, colors }) => {
  return (
    <PieChart width={350} height={300} className="piechart">
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
      <Tooltip />
    </PieChart>
  );
};

export default PieChartComponent;
