import React from "react";

type MetricCardProps = {
  title: string;
  value: string;
  change: string;
  isPositive: boolean;
};

const MetricCard: React.FC<MetricCardProps> = ({ title, value, change, isPositive }) => {
  return (
    <div
      style={{
        border: "1px solid #e1e7ec",
        borderRadius: "8px",
        padding: "16px",
        backgroundColor: "white",
      }}
    >
      <h3
        style={{
          fontSize: "14px",
          color: "#6c6c6c",
          marginBottom: "4px",
          textTransform: "uppercase",
        }}
      >
        {title}
      </h3>
      <p
        style={{
          fontSize: "28px",
          fontWeight: "bold",
          color: "#2e2e2e",
          marginBottom: "6px",
        }}
      >
        {value}
      </p>
      <p
        style={{
          fontSize: "14px",
          color: isPositive ? "#2e563c" : "#c13d2f",
        }}
      >
        {isPositive ? "↑" : "↓"} {change}
      </p>
    </div>
  );
};

const UserActivityMetrics: React.FC = () => {
  const metrics = [
    {
      title: "Total User Count",
      value: "3,240",
      change: "10% vs. Last Month",
      isPositive: false,
    },
    {
      title: "New Accounts Created",
      value: "3,240",
      change: "10% vs. Last Month",
      isPositive: false,
    },
    {
      title: "Avg Use Time",
      value: "60 min",
      change: "10% vs. Last Month",
      isPositive: false,
    },
    {
      title: "Avg Time App Opened",
      value: "3,240 min",
      change: "10% vs. Last Month",
      isPositive: false,
    },
  ];

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
        gap: "24px",
      }}
    >
      {metrics.map((metric, idx) => (
        <MetricCard key={idx} {...metric} />
      ))}
    </div>
  );
};

export default UserActivityMetrics;
