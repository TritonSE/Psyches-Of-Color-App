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
    <div
      style={{
        backgroundColor: "white",
        padding: 28,
        borderRadius: 10,
        border: "1px solid #F1F1F1",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 28,
        }}
      >
        <h3 style={{ fontSize: 18, fontWeight: "bold" }}>Average Monthly User Activities</h3>
        <button
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            padding: "8px 12px",
            border: "1px solid #D9D9D9",
            borderRadius: 10,
            color: "#000",
            fontSize: 14,
          }}
        >
          Past 6 Months
          <svg width="16" height="12" viewBox="0 0 16 12" fill="none">
            <path d="M1 3L8 9L15 3" stroke="currentColor" strokeWidth="2" />
          </svg>
        </button>
      </div>

      <div style={{ display: "flex", gap: 36, marginBottom: 16 }}>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <span style={{ fontSize: 30, fontWeight: 500, color: "#2E563C" }}>150</span>
          <span style={{ fontSize: 14, color: "#6C6C6C" }}>Active Users</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <span style={{ fontSize: 30, fontWeight: 500, color: "#D38718" }}>200</span>
          <span style={{ fontSize: 14, color: "#6C6C6C" }}>Returning Users</span>
        </div>
      </div>

      <div style={{ height: 300 }}>
        <Line options={options} data={data} />
      </div>
    </div>
  );
};

export default MonthlyActivities;
