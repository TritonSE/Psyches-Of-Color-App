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

const RetentionCurve: React.FC = () => {
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
        },
      },
      title: {
        display: false,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 100,
        ticks: {
          callback: (value: number) => `${value}%`,
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

  const labels = ["Day 0", "Day 1", "Day 3", "Day 7", "Day 14", "Day 30"];

  const data = {
    labels,
    datasets: [
      {
        label: "Retention Rate",
        data: [100, 85, 70, 55, 40, 30],
        borderColor: "#2E563C",
        backgroundColor: "#2E563C",
        tension: 0.4,
        pointStyle: "circle",
        pointRadius: 4,
        pointHoverRadius: 6,
      },
    ],
  };

  return (
    <div className="bg-white rounded-lg p-7">
      <div className="flex justify-between items-center mb-3">
        <h3 className="text-lg font-bold font-archivo">User Retention Curve</h3>
        <div className="flex items-center gap-2 px-3 py-2 border border-[#D9D9D9] rounded-lg text-sm">
          <span>Monthly</span>
          <svg width="16" height="11" viewBox="0 0 16 11" fill="none">
            <path d="M1 1L8 9L15 1" stroke="#010101" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </div>
      </div>
      <div className="h-[300px]">
        <Line options={options} data={data} />
      </div>
    </div>
  );
};

export default RetentionCurve;
