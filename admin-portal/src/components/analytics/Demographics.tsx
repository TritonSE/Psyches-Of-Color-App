"use client";

import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  Title,
  Tooltip,
} from "chart.js";
import React from "react";
import { Bar } from "react-chartjs-2";

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
          marginBottom: 24,
        }}
      >
        <h3 style={{ fontSize: 18, fontWeight: "bold", fontFamily: "Archivo" }}>Demographics</h3>
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

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
          gap: 24,
        }}
      >
        <div>
          <h4 style={{ fontSize: 16, fontWeight: 600, marginBottom: 16 }}>Age</h4>
          <div style={{ height: 200 }}>
            <Bar options={chartOptions} data={ageData} />
          </div>
        </div>

        <div>
          <h4 style={{ fontSize: 16, fontWeight: 600, marginBottom: 16 }}>Ethnicity</h4>
          <div style={{ height: 200 }}>
            <Bar options={chartOptions} data={ethnicityData} />
          </div>
        </div>

        <div>
          <h4 style={{ fontSize: 16, fontWeight: 600, marginBottom: 16 }}>Gender</h4>
          <div style={{ height: 200 }}>
            <Bar options={chartOptions} data={genderData} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Demographics;
