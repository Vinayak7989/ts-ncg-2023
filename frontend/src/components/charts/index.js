import React from "react";
import { COLUMN_CHART, LINE_CHART, PIE_CHART } from "../../constants";
import LineChart from "./LineChart";
import PieChart from "./PieChart";
import BarChart from "./BarChart";

const Chart = ({ chartData, chartType }) => {
  if (chartType === LINE_CHART) return <LineChart chartData={chartData} />;
  if (chartType === COLUMN_CHART) return <BarChart chartData={chartData} />;
  if (chartType === PIE_CHART) return <PieChart chartData={chartData} />;
};

export default Chart;
