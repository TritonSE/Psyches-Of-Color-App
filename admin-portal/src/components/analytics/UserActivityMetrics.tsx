"use client";

import React from "react";

interface MetricCardProps {
  title: string;
  value: string;
  change: string;
  isPositive: boolean;
}

const MetricCard: React.FC<MetricCardProps> = ({ title, value, change, isPositive }) => (
  <div className="bg-white rounded-lg border border-[#E1E7EC] p-6">
    <h3 className="text-[#2E2E2E] text-sm font-medium mb-2">{title}</h3>
    <p className="text-[32px] font-bold text-[#2E2E2E] mb-1">{value}</p>
    <div
      className={`flex items-center gap-1 text-sm ${isPositive ? "text-[#2E563C]" : "text-[#C13D2F]"}`}
    >
      <span className="text-base">{isPositive ? "↑" : "↓"}</span>
      <span>{change}</span>
    </div>
  </div>
);

const UserActivityMetrics: React.FC = () => {
  const metrics = [
    {
      title: "Total User Count",
      value: "3,240",
      change: "10% vs. Last Month",
      isPositive: true,
    },
    {
      title: "New Accounts Created",
      value: "3,240",
      change: "10% vs. Last Month",
      isPositive: true,
    },
    {
      title: "Avg Use Time",
      value: "60 min",
      change: "10% vs. Last Month",
      isPositive: true,
    },
    {
      title: "Avg Time App Opened",
      value: "3,240 min",
      change: "10% vs. Last Month",
      isPositive: true,
    },
  ];

  return (
    <div className="space-y-4">
      <h2 className="text-[#2E2E2E] text-2xl font-bold">USER ACTIVITY</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {metrics.map((metric, index) => (
          <MetricCard key={index} {...metric} />
        ))}
      </div>
    </div>
  );
};

export default UserActivityMetrics;
