"use client";

import {
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LineElement,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
} from "chart.js";
import React from "react";
import { Line } from "react-chartjs-2";

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
          callback: function (value: string | number) {
            if (typeof value === "number") return `${value}%`;
            return value;
          },
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
    <div
      style={{
        backgroundColor: "white",
        borderRadius: 8,
        padding: 28,
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 12,
        }}
      >
        <h3 style={{ fontSize: 18, fontWeight: "bold", fontFamily: "Archivo" }}>
          User Retention Curve
        </h3>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            padding: "8px 12px",
            border: "1px solid #D9D9D9",
            borderRadius: 8,
            fontSize: 14,
          }}
        >
          <span>Monthly</span>
          <svg width="16" height="11" viewBox="0 0 16 11" fill="none">
            <path d="M1 1L8 9L15 1" stroke="#010101" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </div>
      </div>

      <div style={{ height: 300 }}>
        <Line options={options} data={data} />
      </div>
    </div>
  );
};

export default RetentionCurve;
