"use client";

import { useEffect, useState } from "react";

import { useAuth } from "../../contexts/AuthContext";
import { MonthlyActivity, StatsResponse, fetchStats } from "../../lib/api";

import styles from "./statistics.module.css";

// Helper to format month number to short name
function formatMonth(monthStr: string): string {
  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const monthNum = parseInt(monthStr, 10) - 1; // Convert "01" to 0, "12" to 11
  return monthNames[monthNum] || monthStr;
}

function polarToCartesian(cx: number, cy: number, radius: number, angle: number) {
  const angleInRadians = ((angle - 90) * Math.PI) / 180;
  return {
    x: cx + radius * Math.cos(angleInRadians),
    y: cy + radius * Math.sin(angleInRadians),
  };
}

// Helper for Donut Slice
function DonutSlice({
  cx,
  cy,
  radius,
  innerRadius,
  startAngle,
  endAngle,
  fill,
}: {
  cx: number;
  cy: number;
  radius: number;
  innerRadius: number;
  startAngle: number;
  endAngle: number;
  fill: string;
}) {
  const start = polarToCartesian(cx, cy, radius, endAngle);
  const end = polarToCartesian(cx, cy, radius, startAngle);
  const innerStart = polarToCartesian(cx, cy, innerRadius, endAngle);
  const innerEnd = polarToCartesian(cx, cy, innerRadius, startAngle);

  const largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";

  const d = [
    `M ${start.x} ${start.y}`,
    `A ${radius} ${radius} 0 ${largeArcFlag} 0 ${end.x} ${end.y}`,
    `L ${innerEnd.x} ${innerEnd.y}`,
    `A ${innerRadius} ${innerRadius} 0 ${largeArcFlag} 1 ${innerStart.x} ${innerStart.y}`,
    "Z",
  ].join(" ");

  return <path d={d} fill={fill} />;
}

// Donut Chart Component
function DonutChart({ data }: { data: { label: string; count: number; percentage: number }[] }) {
  const colors = ["#1a4d2e", "#f39c12", "#c0392b", "#e67e22", "#f1c40f"];
  let currentAngle = 0;

  return (
    <div className={styles.donutContainer}>
      <svg viewBox="0 0 200 200" className={styles.donutSvg}>
        {data.map((item, index) => {
          const angle = (item.percentage / 100) * 360;
          const startAngle = currentAngle;
          currentAngle += angle;

          return (
            <DonutSlice
              key={item.label}
              cx={100}
              cy={100}
              radius={80}
              innerRadius={50}
              startAngle={startAngle}
              endAngle={currentAngle}
              fill={colors[index % colors.length]}
            />
          );
        })}
      </svg>
      <div className={styles.donutLegend}>
        {data.slice(0, 5).map((item, index) => (
          <div key={item.label} className={styles.legendRow}>
            <span
              className={styles.legendDot}
              style={{ backgroundColor: colors[index % colors.length] }}
            ></span>
            <span className={styles.legendLabel}>{item.label}</span>
            <span className={styles.legendValue}>{item.percentage}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// Bar Chart Component
function BarChart({
  data,
  isUserCount = false,
}: {
  data: { label: string; count: number; percentage: number }[];
  isUserCount?: boolean;
}) {
  const colors = ["#f39c12", "#1a4d2e", "#e67e22", "#c0392b", "#f1c40f"];

  // For ratings: fixed scale 0-5
  // For user counts: dynamic scale based on max value
  const maxValue = isUserCount ? Math.max(...data.map((d) => d.count)) : 5;
  const yAxisLabels = isUserCount
    ? Array.from({ length: 6 }, (_, i) => Math.ceil(maxValue - (i * maxValue) / 5))
    : [5, 4, 3, 2, 1, 0];

  return (
    <div className={styles.barChart}>
      {/* Y-axis labels */}
      <div className={styles.yAxis}>
        {yAxisLabels.map((label, index) => (
          <div key={index} className={styles.yAxisLabel}>
            {label}
          </div>
        ))}
      </div>

      <div className={styles.bars}>
        {data.map((item, index) => (
          <div key={item.label} className={styles.barWrapper}>
            <div
              className={styles.bar}
              style={{
                height: `${Math.min((item.count / maxValue) * 240, 240)}px`,
                backgroundColor: colors[index % colors.length],
              }}
            ></div>
            <div className={styles.barLabel}>{item.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

// Horizontal Bar Chart
function HorizontalBarChart({
  data,
}: {
  data: { label: string; count: number; percentage: number }[];
}) {
  return (
    <div className={styles.horizontalBarChart}>
      {data.map((item) => (
        <div key={item.label} className={styles.horizontalBarRow}>
          <div className={styles.barLabel}>{item.label}</div>
          <div className={styles.barTrack}>
            <div className={styles.barFill} style={{ width: `${item.percentage}%` }}></div>
          </div>
          <div className={styles.barValue}>{item.percentage}%</div>
        </div>
      ))}
    </div>
  );
}

// Simple Line Chart Component
function SimpleLineChart({
  data,
  dataKey1,
  dataKey2,
  xAxisKey,
}: {
  data: MonthlyActivity[];
  dataKey1: "checkIns" | "entries";
  dataKey2?: "checkIns" | "entries";
  xAxisKey?: "month";
}) {
  if (data.length === 0) return <div className={styles.noData}>No data available</div>;

  const maxValue = Math.max(
    ...data.map((d) => Math.max(d[dataKey1] || 0, dataKey2 ? d[dataKey2] || 0 : 0)),
  );

  // Generate Y-axis labels (5 evenly spaced values from maxValue to 0)
  const yAxisLabels = [0, 1, 2, 3, 4].map((i) => Math.round(maxValue - (i * maxValue) / 4));

  return (
    <div className={styles.lineChart}>
      <svg viewBox="0 0 600 200" className={styles.chartSvg}>
        {/* Y-axis labels */}
        {yAxisLabels.map((label, i) => (
          <text
            key={`y-${i}`}
            x="35"
            y={40 + i * 35 + 4}
            textAnchor="end"
            fontSize="12"
            fill="#6c6c6c"
          >
            {label}
          </text>
        ))}

        {/* Grid lines */}
        {[0, 1, 2, 3, 4].map((i) => (
          <line
            key={i}
            x1="45"
            y1={40 + i * 35}
            x2="600"
            y2={40 + i * 35}
            stroke="#ebebeb"
            strokeWidth="1"
          />
        ))}

        {/* Data line 1 */}
        <polyline
          points={data
            .map((d, i) => {
              const x = 50 + i * (500 / (data.length - 1));
              const y = 180 - (d[dataKey1] / maxValue) * 140;
              return `${x},${y}`;
            })
            .join(" ")}
          fill="none"
          stroke="#1a4d2e"
          strokeWidth="2"
        />

        {/* Data line 2 (if provided) */}
        {dataKey2 && (
          <polyline
            points={data
              .map((d, i) => {
                const x = 50 + i * (500 / (data.length - 1));
                const y = 180 - (d[dataKey2] / maxValue) * 140;
                return `${x},${y}`;
              })
              .join(" ")}
            fill="none"
            stroke="#f39c12"
            strokeWidth="2"
          />
        )}

        {/* X-axis labels */}
        {data.map((d, i) => {
          let label: string;
          if (xAxisKey) {
            label = d[xAxisKey];
          } else if (d.month) {
            const monthNum = d.month.split("-")[1];
            label = formatMonth(monthNum);
          } else {
            label = String(i);
          }
          return (
            <text
              key={i}
              x={50 + i * (500 / (data.length - 1))}
              y="195"
              textAnchor="middle"
              fontSize="12"
              fill="#6c6c6c"
            >
              {label}
            </text>
          );
        })}
      </svg>
    </div>
  );
}

export default function DashboardPage() {
  const { user } = useAuth();
  const [stats, setStats] = useState<StatsResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadStats = async () => {
      if (!user) return;

      try {
        setLoading(true);
        const token = await user.getIdToken();
        const data = await fetchStats(token);
        setStats(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load statistics");
      } finally {
        setLoading(false);
      }
    };

    void loadStats();
  }, [user]);

  if (loading) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.spinner}></div>
        <p>Loading statistics...</p>
      </div>
    );
  }

  if (error ?? !stats) {
    return (
      <div className={styles.errorContainer}>
        <p>{error ?? "Failed to load statistics"}</p>
      </div>
    );
  }

  const { userActivity, monthlyActivity, onboardingAnalytics } = stats;

  const newAccountsChangePercent = userActivity.newAccountsChangePercent ?? null;
  const totalUsersChangePercent = userActivity.totalUsersChangePercent ?? null;
  const avgCheckInsChangePercent = userActivity.avgCheckInsChangePercent ?? null;

  // Calculate percentages for demographics
  const totalUsers = userActivity.totalUserCount;
  const calculatePercentage = (count: number) => {
    return totalUsers > 0 ? Math.round((count / totalUsers) * 100) : 0;
  };

  // Convert data for charts
  const ageRangeData = Object.entries(onboardingAnalytics.ageRange).map(([label, count]) => ({
    label,
    count,
    percentage: calculatePercentage(count),
  }));

  const ethnicityData = Object.entries(onboardingAnalytics.ethnicity).map(([label, count]) => ({
    label,
    count,
    percentage: calculatePercentage(count),
  }));

  const genderData = Object.entries(onboardingAnalytics.gender).map(([label, count]) => ({
    label,
    count,
    percentage: calculatePercentage(count),
  }));

  const counselingData = Object.entries(onboardingAnalytics.counseling).map(([label, count]) => ({
    label,
    count,
    percentage: calculatePercentage(count),
  }));

  const educationData = Object.entries(onboardingAnalytics.education).map(([label, count]) => ({
    label,
    count,
    percentage: calculatePercentage(count),
  }));

  return (
    <div className={styles.container}>
      {/* Header */}
      <div className={styles.header}>
        <h1 className={styles.title}>Statistics</h1>
        <div className={styles.filters}>
          <button className={styles.filterButton}>All Time</button>
          <button className={styles.filterButton}>Demographics</button>
          <button className={styles.filterButton}>Content Findings</button>
          <select className={styles.dropdown}>
            <option>John Doe</option>
          </select>
          <button className={styles.downloadButton}>DOWNLOAD</button>
        </div>
      </div>

      {/* User Activity Section */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>USER ACTIVITY</h2>

        <div className={styles.statsGrid}>
          <div className={styles.statCard}>
            <div className={styles.statLabel}>Total User Count</div>
            <div className={styles.statValue}>{userActivity.totalUserCount.toLocaleString()}</div>
            {/* DUMMY DATA: Percentage change is hardcoded. To make real, backend needs to store/compare previous month's data */}
            <div className={styles.statChange}>
              {totalUsersChangePercent === null ? (
                <span>— vs. Last Month</span>
              ) : totalUsersChangePercent > 0 ? (
                <span className={styles.changePositive}>
                  ↑ {totalUsersChangePercent}% vs. Last Month
                </span>
              ) : totalUsersChangePercent < 0 ? (
                <span className={styles.changeNegative}>
                  ↓ {Math.abs(Number(totalUsersChangePercent))}% vs. Last Month
                </span>
              ) : (
                <span>— vs. Last Month</span>
              )}
            </div>
          </div>

          <div className={styles.statCard}>
            <div className={styles.statLabel}>New Accounts Created</div>
            {/* DUMMY DATA: Backend returns 0 because User model lacks createdAt timestamp. Add timestamps: true to schema to fix */}
            <div className={styles.statValue}>
              {userActivity.newAccountsCreated.toLocaleString()}
            </div>
            {/* DUMMY DATA: Percentage change is hardcoded */}
            <div className={styles.statChange}>
              {newAccountsChangePercent === null ? (
                <span>— vs. Last Month</span>
              ) : newAccountsChangePercent > 0 ? (
                <span className={styles.changePositive}>
                  ↑ {newAccountsChangePercent}% vs. Last Month
                </span>
              ) : newAccountsChangePercent < 0 ? (
                <span className={styles.changeNegative}>
                  ↓ {Math.abs(Number(newAccountsChangePercent))}% vs. Last Month
                </span>
              ) : (
                <span>— vs. Last Month</span>
              )}
            </div>
          </div>

          <div className={styles.statCard}>
            <div className={styles.statLabel}>Avg Check-Ins/User</div>
            <div className={styles.statValue}>{userActivity.avgCheckInsPerUser}</div>
            {/* DUMMY DATA: Percentage change is hardcoded */}
            <div className={styles.statChange}>
              {avgCheckInsChangePercent === null ? (
                <span>— vs. Last Month</span>
              ) : avgCheckInsChangePercent > 0 ? (
                <span className={styles.changePositive}>
                  ↑ {avgCheckInsChangePercent}% vs. Last Month
                </span>
              ) : avgCheckInsChangePercent < 0 ? (
                <span className={styles.changeNegative}>
                  ↓ {Math.abs(Number(avgCheckInsChangePercent))}% vs. Last Month
                </span>
              ) : (
                <span>— vs. Last Month</span>
              )}
            </div>
          </div>

          <div className={styles.statCard}>
            <div className={styles.statLabel}>Avg Time App Opened</div>
            {/* DUMMY DATA: Using newAccountsCreated as placeholder. Real implementation needs app open tracking in mobile app */}
            <div className={styles.statValue}>
              {userActivity.newAccountsCreated.toLocaleString()}
            </div>
            {/* DUMMY DATA: Percentage change is hardcoded */}
            <div className={styles.statChange}>
              <span>— vs. Last Month</span>
            </div>
          </div>
        </div>

        {/* Monthly Activities Chart */}
        <div className={styles.chartCard}>
          <div className={styles.chartHeader}>
            <h3 className={styles.chartTitle}>Average Monthly User Activities</h3>
            <div className={styles.legend}>
              <span className={styles.legendItem}>
                <span className={`${styles.legendDot} ${styles.dotCheckIns}`}></span>
                Check-ins
              </span>
              <span className={styles.legendItem}>
                <span className={`${styles.legendDot} ${styles.dotEntries}`}></span>
                Entries Written
              </span>
            </div>
          </div>
          <div className={styles.statsRow}>
            <div className={styles.stat}>
              <div className={styles.statNum}>
                {Math.round(userActivity.avgCheckInsPerUser * 100)}
              </div>
              <div className={styles.statLabel}>Check-ins</div>
            </div>
            <div className={styles.stat}>
              <div className={styles.statNum}>
                {Math.round(userActivity.avgEntriesPerUser * 100)}
              </div>
              <div className={styles.statLabel}>Entries Written</div>
            </div>
          </div>
          <SimpleLineChart data={monthlyActivity} dataKey1="checkIns" dataKey2="entries" />
        </div>
      </section>

      {/* Onboarding Analytics Section */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>ONBOARDING ANALYTICS</h2>

        <div className={styles.chartsRow}>
          <div className={styles.chartCard}>
            <h3 className={styles.chartTitle}>Age</h3>
            <DonutChart data={ageRangeData} />
          </div>

          <div className={styles.chartCard}>
            <h3 className={styles.chartTitle}>Ethnicity</h3>
            <DonutChart data={ethnicityData} />
          </div>
        </div>

        <div className={styles.chartCard}>
          <h3 className={styles.chartTitle}>Gender Distribution</h3>
          <BarChart data={genderData} isUserCount={true} />
        </div>

        <div className={styles.chartCard}>
          <h3 className={styles.chartTitle}>Education Level</h3>
          <HorizontalBarChart data={educationData} />
        </div>

        <div className={styles.chartCard}>
          <h3 className={styles.chartTitle}>Counseling</h3>
          <HorizontalBarChart data={counselingData} />
        </div>
      </section>
    </div>
  );
}
