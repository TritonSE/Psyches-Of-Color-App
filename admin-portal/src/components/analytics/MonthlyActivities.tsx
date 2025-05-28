"use client";

import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const MonthlyActivities: React.FC = () => {
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top" as const,
        align: "end" as const,
        labels: {
          boxWidth: 8,
          usePointStyle: true,
          pointStyle: "circle",
          font: {
            family: "Archivo",
            size: 16,
          },
          color: "#8C97A7",
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: "#F1F1F1",
        },
        ticks: {
          font: {
            family: "Archivo",
            size: 16,
          },
          color: "#909090",
        },
      },
      x: {
        grid: {
          display: false,
        },
        ticks: {
          font: {
            family: "Archivo",
            size: 16,
          },
          color: "#909090",
        },
      },
    },
  };

  const data = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "Active Users",
        data: [150, 120, 140, 130, 160, 145],
        borderColor: "#2E563C",
        backgroundColor: "#2E563C",
        tension: 0.4,
        pointRadius: 4,
      },
      {
        label: "Returning Users",
        data: [200, 180, 190, 185, 210, 195],
        borderColor: "#D38718",
        backgroundColor: "#D38718",
        tension: 0.4,
        pointRadius: 4,
      },
    ],
  };

  return (
    <div className="bg-white p-7 rounded-[10px] border border-[#F1F1F1]">
      <div className="flex justify-between items-center mb-7">
        <h3 className="text-lg font-bold">Average Monthly User Activities</h3>
        <button className="flex items-center gap-2 px-3 py-2 border border-[#D9D9D9] rounded-[10px] text-black">
          Past 6 Months
          <svg width="16" height="12" viewBox="0 0 16 12" fill="none">
            <path d="M1 3L8 9L15 3" stroke="currentColor" strokeWidth="2" />
          </svg>
        </button>
      </div>
      <div className="flex gap-9 mb-4">
        <div className="flex flex-col">
          <span className="text-3xl font-medium text-[#2E563C]">150</span>
          <span className="text-sm text-[#6C6C6C]">Active Users</span>
        </div>
        <div className="flex flex-col">
          <span className="text-3xl font-medium text-[#D38718]">200</span>
          <span className="text-sm text-[#6C6C6C]">Returning Users</span>
        </div>
      </div>
      <div className="h-[300px]">
        <Line options={options} data={data} />
      </div>
    </div>
  );
};

export default MonthlyActivities;
