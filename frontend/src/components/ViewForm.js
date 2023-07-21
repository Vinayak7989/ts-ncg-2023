import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Select from "react-select";
import DatePicker from "react-datepicker";
import moment from "moment";
import Chart from "./charts";
import { COLUMN_CHART, LINE_CHART, PIE_CHART } from "../constants";
import { editView, getCountries, getIndicators, saveView } from "../api";
import { DatePickerComponent } from "@syncfusion/ej2-react-calendars";

const emptyView = {
  name: "",
  country: "",
  indicator: "",
  chartType: "",
  startDate: "",
  endDate: "",
};

const ViewForm = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const updateView = location.state?.updateView;
  const showChart = location.state?.showChart;
  const data = location.state?.data;
  const [view, setView] = useState(data || emptyView);
  const [chartData, setChartData] = useState(null);

  const [countries, setCountries] = useState([]);
  const [indicators, setIndicators] = useState([
    {
      id: "1.3_ACCESS.ELECTRICITY.URBAN",
      name: "1.3_ACCESS.ELECTRICITY.URBAN",
    },
    { id: "SP.POP.TOTL", name: "SP.POP.TOTL" },
  ]);
  const chartTypes = [COLUMN_CHART, LINE_CHART, PIE_CHART];

  const formatDate = (date) => moment(date).utc().format("YYYY-MM-DD");

  useEffect(() => {
    loadCountries();
    loadIndicators();
  }, []);

  const loadCountries = async () => {
    const res = await getCountries();
    setCountries(res);
  };

  const loadIndicators = async () => {
    const res = await getIndicators();
    setIndicators((p) => [...p, ...res]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const choosenView = { ...view };
    choosenView.country = choosenView.country.value;
    choosenView.indicator = choosenView.indicator.value;
    choosenView.chartType = choosenView.chartType.value;
    choosenView.startDate = formatDate(choosenView.startDate);
    choosenView.endDate = formatDate(choosenView.endDate);
    const startYear = choosenView.startDate.split("-")[0];
    const endYear = choosenView.endDate.split("-")[0];
    const url = `https://api.worldbank.org/v2/country/${choosenView.country}/indicator/${choosenView.indicator}?date=${startYear}:${endYear}&format=json`;
    const { data } = await axios.get(url);
    let label;
    let mp = new Map();
    data[1].forEach((e) => {
      label = e.indicator.value;
      mp.set(e.date, e.value);
    });

    let chart = {
      labels: [],
      datasets: [
        {
          label,
          data: [],
          borderColor: "black",
        },
      ],
    };

    for (let [key, value] of mp) {
      chart.labels.push(key);
      chart.datasets[0].data.push(value);
    }
    setChartData(chart);
  };

  const handleSaveView = async () => {
    const viewData = {
      name: view.name,
      chartType: view.chartType.value,
      country: view.country.value,
      indicator: view.indicator.value,
      startDate: formatDate(view.startDate),
      endDate: formatDate(view.endDate),
    };
    if (updateView) editView(viewData, view.id);
    else await saveView(viewData);
    navigate("/");
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 offset-md-3 border rounded p-4 mt-2">
          <h2>
            {updateView
              ? "Update View"
              : showChart
              ? "Your View"
              : "Create View"}
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="my-4">
              <input
                type="text"
                className="form-control"
                placeholder="Enter View Name"
                name="name"
                value={view.name}
                onChange={(e) => setView({ ...view, name: e.target.value })}
                required
              />
            </div>
            <Select
              className="my-4"
              options={countries.map((c) => ({
                label: c?.name,
                value: c?.iso2Code,
              }))}
              value={view.country}
              onChange={(value) => {
                setView({ ...view, country: value });
              }}
              placeholder="Choose a country"
              required
            />
            <Select
              className="my-4"
              options={indicators.map((i) => ({
                label: i?.name,
                value: i?.id,
              }))}
              value={view.indicator}
              onChange={(value) => setView({ ...view, indicator: value })}
              placeholder="Choose an Indicator"
              required
            />
            <Select
              className="my-4"
              options={chartTypes.map((c) => ({ label: c, value: c }))}
              value={view.chartType}
              onChange={(value) => setView({ ...view, chartType: value })}
              placeholder="Chart Type"
              required
            />
            <label htmlFor="startDate" className="form-label mx-4">
              Start Date
            </label>
            <DatePicker
              className="my-4"
              selected={view.startDate}
              onChange={(date) => setView({ ...view, startDate: date })}
              dateFormat="dd/MM/yyyy"
              name="endDate"
              required
            />
            <label htmlFor="endDate" className="form-label mx-4 ml-8">
              End Date
            </label>
            <DatePicker
              className="my-4"
              selected={view.endDate}
              onChange={(date) => setView({ ...view, endDate: date })}
              dateFormat="dd/MM/yyyy"
              name="endDate"
              required
            />
            <div className="text-center">
              <button type="submit" className="btn btn-outline-primary mx-4">
                Submit
              </button>
              <button
                type="submit"
                className="btn btn-light mx-4"
                onClick={() => setView(emptyView)}
              >
                Clear
              </button>
              <button
                type="submit"
                className="btn btn-primary mx-4"
                onClick={() => handleSaveView()}
              >
                Save View
              </button>
            </div>
          </form>
        </div>
      </div>
      {chartData && (
        <Chart chartData={chartData} chartType={view.chartType.value} />
      )}
    </div>
  );
};

export default ViewForm;
