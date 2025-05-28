"use client";

import React from "react";

interface MetricCardProps {
  title: string;
  value: string;
  change: string;
}

const MetricCard: React.FC<MetricCardProps> = ({ title, value, change }) => (
  <div className="flex flex-col justify-center gap-3 p-7 bg-white border border-[#F1F1F1] rounded-[11px]">
    <div className="text-lg font-bold">{title}</div>
    <div className="text-3xl font-medium">{value}</div>
    <div className="text-sm text-black">{change}</div>
  </div>
);

const UserActivityMetrics: React.FC = () => {
  const metrics = [
    {
      title: "Total User Count",
      value: "3,240",
      change: "↑ 10% v.s. Last Month",
    },
    {
      title: "New Accounts Created",
      value: "3,240",
      change: "↑ 10% v.s. Last Month",
    },
    {
      title: "Avg Use Time",
      value: "60 min",
      change: "↑ 10% v.s. Last Month",
    },
    {
      title: "Avg Time App Opened",
      value: "3,240 min",
      change: "↑ 10% v.s. Last Month",
    },
  ];

  return (
    <div className="flex gap-5">
      {metrics.map((metric, index) => (
        <MetricCard key={index} title={metric.title} value={metric.value} change={metric.change} />
      ))}
    </div>
  );
};

export default UserActivityMetrics;
