"use client";

import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Demographics: React.FC = () => {
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          font: {
            family: "Archivo",
            size: 14,
          },
          color: "#909090",
        },
        grid: {
          color: "#E1E7EC",
        },
      },
      x: {
        grid: {
          display: false,
        },
        ticks: {
          font: {
            family: "Archivo",
            size: 14,
          },
          color: "#909090",
        },
      },
    },
  };

  const ageData = {
    labels: ["18-24", "25-34", "35-44", "45-54", "55+"],
    datasets: [
      {
        data: [30, 45, 25, 15, 10],
        backgroundColor: "#2E563C",
        borderRadius: 4,
      },
    ],
  };

  const ethnicityData = {
    labels: ["Asian", "Black", "Hispanic", "White", "Other"],
    datasets: [
      {
        data: [20, 35, 25, 30, 10],
        backgroundColor: "#D38718",
        borderRadius: 4,
      },
    ],
  };

  const genderData = {
    labels: ["Male", "Female", "Non-binary", "Other"],
    datasets: [
      {
        data: [40, 45, 10, 5],
        backgroundColor: "#EFB116",
        borderRadius: 4,
      },
    ],
  };

  return (
    <div className="bg-white rounded-lg p-7">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-bold font-archivo">Demographics</h3>
        <div className="flex items-center gap-2 px-3 py-2 border border-[#D9D9D9] rounded-lg text-sm">
          <span>Monthly</span>
          <svg width="16" height="11" viewBox="0 0 16 11" fill="none">
            <path d="M1 1L8 9L15 1" stroke="#010101" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <h4 className="text-base font-semibold mb-4">Age</h4>
          <div className="h-[200px]">
            <Bar options={chartOptions} data={ageData} />
          </div>
        </div>

        <div>
          <h4 className="text-base font-semibold mb-4">Ethnicity</h4>
          <div className="h-[200px]">
            <Bar options={chartOptions} data={ethnicityData} />
          </div>
        </div>

        <div>
          <h4 className="text-base font-semibold mb-4">Gender</h4>
          <div className="h-[200px]">
            <Bar options={chartOptions} data={genderData} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Demographics;
