import React from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";

const PieChart = ({ chartData }) => {
  return (
    <div className="m-auto">
      <Pie data={chartData} options={{}}></Pie>
    </div>
  );
};

export default PieChart;
