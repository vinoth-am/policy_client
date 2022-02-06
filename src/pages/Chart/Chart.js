import React, { useEffect, useState } from "react";
import { message } from "antd";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

import { Select } from "antd";
import { Bar } from "react-chartjs-2";
import { GET_CHART_DATA } from "../../utils/GQL";
import { useLazyQuery } from "@apollo/client";
import {
  CHART_DATA_LABEL,
  CHART_TITLE,
  GENERIC_ERROR,
  REGION,
} from "../../utils/constants";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);
const { Option } = Select;

export default function Chart() {
  const DEFAULT_REGION = "East";
  useEffect(() => {
    getChartData({ variables: { region: DEFAULT_REGION } });
  }, []);

  const [getData, setData] = useState({});

  const [getChartData] = useLazyQuery(GET_CHART_DATA, {
    onCompleted: (data) => {
      try {
        const {
          chartData: { insuranceCount },
        } = data;

        if (Object.keys(insuranceCount).length > 0) {
          setData(insuranceCount);
        }
      } catch (e) {
        message.error(GENERIC_ERROR);
      }
    },
  });

  function handleChange(data) {
    const { value } = data;
    getChartData({ variables: { region: value } });
  }

  const labels = Object.keys(getData).length ? Object.keys(getData) : [];

  const values = Object.keys(getData).length ? Object.values(getData) : [];

  const data = {
    labels,
    datasets: [
      {
        barThickness: 50,
        maxBarThickness: 50,
        label: CHART_DATA_LABEL,
        data: values,
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };

  const options = {
    maintainAspectRatio: false,
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: CHART_TITLE,
      },
    },
  };

  return (
    <>
      <div style={{ float: "right", marginTop: "20px", marginRight: "20px" }}>
        <Select
          labelInValue
          defaultValue={{ value: DEFAULT_REGION }}
          style={{ width: 120 }}
          onChange={handleChange}
        >
          {REGION.map((value, index) => (
            <Option key={index} value={value.value}>
              {value.key}
            </Option>
          ))}
        </Select>
      </div>
      <div style={{ height: "90%" }}>
        <Bar options={options} data={data} />
      </div>
    </>
  );
}
