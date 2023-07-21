import logo from "./logo.svg";
import "./App.css";
import Navbar from "./layout/Navbar";
import Home from "./components/Home";
import { Route, Routes } from "react-router-dom";
import ViewForm from "./components/ViewForm";
import BarChart from "./components/charts/BarChart";
import LineChart from "./components/charts/LineChart";
import PieChart from "./components/charts/PieChart";

function App() {
  const data = {
    labels: ["2019", "2021"],
    datasets: [
      {
        label: "User Gained",
        data: [24, 68],
        borderColor: "black",
        backgroundColor: ["red", "blue"],
      },
    ],
  };
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/view" element={<ViewForm />} />
      </Routes>
    </div>
  );
}

export default App;
