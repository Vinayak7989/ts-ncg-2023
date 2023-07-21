import React from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";

const LineChart = ({ chartData }) => {
  return (
    <div className="m-auto">
      <Line data={chartData} options={{}}></Line>
    </div>
  );
};

export default LineChart;
