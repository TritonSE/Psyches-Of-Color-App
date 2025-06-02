"use client";

import React from "react";

type ProgressBarProps = {
  label: string;
  value: number;
  color: string;
};

const ProgressBar: React.FC<ProgressBarProps> = ({ label, value, color }) => (
  <div style={{ marginBottom: 16 }}>
    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
      <span style={{ fontSize: 14, fontWeight: 500 }}>{label}</span>
      <span style={{ fontSize: 14, fontWeight: 500 }}>{value}%</span>
    </div>
    <div
      style={{
        height: 8,
        backgroundColor: "#E1E7EC",
        borderRadius: 9999,
        overflow: "hidden",
      }}
    >
      <div
        style={{
          height: "100%",
          width: `${value}%`,
          backgroundColor: color,
          borderRadius: 9999,
        }}
      />
    </div>
  </div>
);

const Counseling: React.FC = () => {
  const metrics = [
    {
      label: "Completed Sessions",
      value: 75,
      color: "#2E563C",
    },
    {
      label: "Ongoing Sessions",
      value: 60,
      color: "#D38718",
    },
    {
      label: "Scheduled Sessions",
      value: 45,
      color: "#EFB116",
    },
    {
      label: "Cancelled Sessions",
      value: 15,
      color: "#C13D2F",
    },
  ];

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
        <h3 style={{ fontSize: 18, fontWeight: "bold", fontFamily: "Archivo" }}>Counseling</h3>
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

      <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
        {metrics.map((metric) => (
          <ProgressBar
            key={metric.label}
            label={metric.label}
            value={metric.value}
            color={metric.color}
          />
        ))}
      </div>
    </div>
  );
};

export default Counseling;
