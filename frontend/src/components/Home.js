import React, { useEffect, useState } from "react";
import { base_url, deleteView } from "../api";
import axios from "axios";
import moment from "moment";
import { Link } from "react-router-dom";
import { parse } from "date-fns";

const Home = () => {
  const [views, setViews] = useState([]);

  useEffect(() => {
    loadViews();
  }, []);

  const loadViews = async () => {
    const { data } = await axios.get(`${base_url}/views`);
    setViews(data);
  };

  if (views && !views.length)
    return <h1 className="text-center">No Saved View</h1>;

  return (
    <div className="mx-4">
      <div className="py-4">
        <table className="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">Country</th>
              <th scope="col">Indicator</th>
              <th scope="col">Chart Type</th>
              <th scope="col">Start Date</th>
              <th scope="col">End Date</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {views &&
              views.length > 0 &&
              views.map((view, index) => (
                <tr>
                  <th scope="row">{index + 1}</th>
                  <td>{view.name}</td>
                  <td>{view.country}</td>
                  <td>{view.indicator}</td>
                  <td>{view.chartType}</td>
                  <td>{moment(view.startDate).utc().format("YYYY-MM-DD")}</td>
                  <td>{moment(view.endDate).utc().format("YYYY-MM-DD")}</td>
                  <td>
                    <Link
                      to="/view"
                      state={{
                        showChart: true,
                        data: {
                          ...view,
                          startDate: parse(
                            moment(view.startDate).utc().format("YYYY-MM-DD"),
                            "yyyy-MM-dd",
                            new Date()
                          ),
                          endDate: parse(
                            moment(view.endDate).utc().format("YYYY-MM-DD"),
                            "yyyy-MM-dd",
                            new Date()
                          ),
                          chartType: {
                            label: view.chartType,
                            value: view.chartType,
                          },
                          country: { label: view.country, value: view.country },
                          indicator: {
                            label: view.indicator,
                            value: view.indicator,
                          },
                        },
                      }}
                      className="btn btn-light mx-2"
                    >
                      View
                    </Link>
                    <Link
                      to="/view"
                      state={{
                        updateView: true,
                        data: {
                          ...view,
                          startDate: parse(
                            moment(view.startDate).utc().format("YYYY-MM-DD"),
                            "yyyy-MM-dd",
                            new Date()
                          ),
                          endDate: parse(
                            moment(view.endDate).utc().format("YYYY-MM-DD"),
                            "yyyy-MM-dd",
                            new Date()
                          ),
                          chartType: {
                            label: view.chartType,
                            value: view.chartType,
                          },
                          country: { label: view.country, value: view.country },
                          indicator: {
                            label: view.indicator,
                            value: view.indicator,
                          },
                          id: view.id,
                        },
                      }}
                      className="btn btn-secondary mx-2"
                    >
                      Edit
                    </Link>
                    <button
                      className="btn btn-danger mx-2"
                      onClick={() => {
                        deleteView(view.id);
                        setViews((prev) =>
                          prev.filter((v) => v.id !== view.id)
                        );
                      }}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Home;
