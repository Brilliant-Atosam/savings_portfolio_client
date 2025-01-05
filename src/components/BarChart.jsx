import React from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";
const BarChartComponent = ({ data }) => {
  return (
    <div className="bar-chart-container">
      <BarChart
        width={300}
        height={300}
        data={data}
        margin={{
          top: 5,
          right: 10,
          left: 10,
          bottom: 5,
        }}
        barGap={20}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="avg_perf" fill="#0a8d45" barSize={25} />
        <Bar dataKey="cur_perf" fill="#bf208f" barSize={25} />
        <Bar dataKey="prev_perf" fill="#0776ca" barSize={25} />
        <Bar dataKey="peak_perf" fill="#ca0755" barSize={25} />
      </BarChart>
    </div>
  );
};

export default BarChartComponent;
