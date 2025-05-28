"use client";

import React from "react";

interface ProgressBarProps {
  label: string;
  value: number;
  color: string;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ label, value, color }) => (
  <div className="mb-4">
    <div className="flex justify-between items-center mb-2">
      <span className="text-sm font-medium">{label}</span>
      <span className="text-sm font-medium">{value}%</span>
    </div>
    <div className="h-2 bg-[#E1E7EC] rounded-full overflow-hidden">
      <div
        className="h-full rounded-full"
        style={{
          width: `${value}%`,
          backgroundColor: color,
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
    <div className="bg-white rounded-lg p-7">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-bold font-archivo">Counseling</h3>
        <div className="flex items-center gap-2 px-3 py-2 border border-[#D9D9D9] rounded-lg text-sm">
          <span>Monthly</span>
          <svg width="16" height="11" viewBox="0 0 16 11" fill="none">
            <path d="M1 1L8 9L15 1" stroke="#010101" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </div>
      </div>

      <div className="space-y-6">
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
