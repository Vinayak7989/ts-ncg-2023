import React from "react";
import { Bar } from "react-chartjs-2";

const BarChart = ({ chartData }) => {
  return (
    <div className="m-auto">
      <Bar data={chartData} options={{}}></Bar>
    </div>
  );
};

export default BarChart;
