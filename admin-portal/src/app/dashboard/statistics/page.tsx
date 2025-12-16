"use client";

import { useEffect, useState } from "react";

import { useAuth } from "../../../contexts/AuthContext";
import { ActivityGroup, StatsResponse, User, fetchAllUsers, fetchStats } from "../../../lib/api";

import styles from "./statistics.module.css";

import { Button } from "@/components/Button";

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
  data: ActivityGroup[];
  dataKey1: "checkIns" | "entries";
  dataKey2?: "checkIns" | "entries";
  xAxisKey?: "group";
}) {
  if (data.length === 0) return <div className={styles.noData}>No data available</div>;

  const maxValue = Math.max(
    ...data.map((d) => Math.max(d[dataKey1] || 0, dataKey2 ? d[dataKey2] || 0 : 0)),
  );

  // Generate Y-axis labels (5 evenly spaced values from maxValue to 0)
  const yAxisLabels = [0, 1, 2, 3, 4].map(
    (i) => Math.round((maxValue - (i * maxValue) / 4) * 100) / 100,
  );

  return (
    <div className={styles.lineChart}>
      <svg viewBox="0 0 600 200" className={styles.chartSvg}>
        Y-axis labels
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
              const x = 50 + i * (500 / Math.max(data.length - 1, 1));
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
                const x = 50 + i * (500 / Math.max(data.length - 1, 1));
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
          } else if (d.group) {
            label = d.group;
          } else {
            label = String(i);
          }
          return (
            <text
              key={i}
              x={50 + i * (500 / Math.max(data.length - 1, 1))}
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
function UserRetentionChart({ data }: { data: number[] }) {
  if (data.length === 0) return <div className={styles.noData}>No data available</div>;

  // Generate Y-axis labels (5 evenly spaced values from 0 to 1)
  const yAxisLabels = [0, 1, 2, 3, 4].map((i) => (4 - i) / 4.0);

  return (
    <div className={styles.lineChart}>
      <svg viewBox="0 0 600 200" className={styles.chartSvg}>
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
        {/* Data line */}
        <polyline
          points={data
            .map((d, i) => {
              const x = 50 + i * (500 / Math.max(data.length - 1, 1));
              const y = 180 - d * 140;
              return `${x},${y}`;
            })
            .join(" ")}
          fill="none"
          stroke="#1a4d2e"
          strokeWidth="2"
        />
        {/* X-axis labels */}
        {data.map((d, i) => {
          if (data.length >= 10 && i % 5 !== 0) return null;

          const label = `Day ${i}`;
          return (
            <text
              key={i}
              x={50 + i * (500 / Math.max(data.length - 1, 1))}
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

const TIME_RANGE_OPTIONS = [
  "All Time",
  "Past Week",
  "Past Month",
  "Past Year",
  "Custom Range",
] as const;
type TimeRangeOption = (typeof TIME_RANGE_OPTIONS)[number];

const ACTIVITY_GROUP_OPTIONS = ["Yearly", "Monthly", "Daily"] as const;
type ActivityGroupOption = (typeof ACTIVITY_GROUP_OPTIONS)[number];

export default function DashboardPage() {
  const { user } = useAuth();
  const [stats, setStats] = useState<StatsResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [allUsers, setAllUsers] = useState<User[]>();
  const [emailsCopied, setEmailsCopied] = useState(false);
  const [selectedTimeRange, setSelectedTimeRange] = useState<TimeRangeOption>("All Time");
  const [filterStartDate, setFilterStartDate] = useState("");
  const [filterEndDate, setFilterEndDate] = useState("");
  const [activityGroupOption, setActivityGroupOption] = useState<ActivityGroupOption>("Monthly");

  const loadStats = async () => {
    if (!user) return;

    let startDate = "",
      endDate = "";
    switch (selectedTimeRange) {
      case "All Time":
        // All time - don't filter at all
        break;
      case "Past Year":
        startDate = new Date(new Date().getTime() - 1000 * 60 * 60 * 24 * 365)
          .toISOString()
          .slice(0, 10);
        break;
      case "Past Month":
        startDate = new Date(new Date().getTime() - 1000 * 60 * 60 * 24 * 30)
          .toISOString()
          .slice(0, 10);
        break;
      case "Past Week":
        startDate = new Date(new Date().getTime() - 1000 * 60 * 60 * 24 * 7)
          .toISOString()
          .slice(0, 10);
        break;
      case "Custom Range":
      default:
        startDate = filterStartDate;
        endDate = filterEndDate;
    }

    try {
      setLoading(true);
      const token = await user.getIdToken();
      const data = await fetchStats(token, startDate, endDate, activityGroupOption);
      setStats(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load statistics");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (selectedTimeRange === "Custom Range") return;

    void loadStats();
  }, [user, selectedTimeRange, activityGroupOption]);

  useEffect(() => {
    const loadAllUsers = async () => {
      if (!user) return;

      const token = await user.getIdToken();
      const data = await fetchAllUsers(token);
      setAllUsers(data);
    };

    void loadAllUsers();
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

  const { userActivity, activityGroups, onboardingAnalytics } = stats;

  const newAccountsChangePercent = userActivity.newAccountsChangePercent ?? null;
  const totalUsersChangePercent = userActivity.totalUsersChangePercent ?? null;
  const avgCheckInsChangePercent = userActivity.avgCheckInsChangePercent ?? null;
  const avgEntriesChangePercent = userActivity.avgEntriesChangePercent ?? null;

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

  const timePeriodName =
    selectedTimeRange === "Past Month"
      ? "Month"
      : selectedTimeRange === "Past Year"
        ? "Year"
        : selectedTimeRange === "Past Week"
          ? "Week"
          : "Period";

  return (
    <div className={styles.container}>
      {/* Header */}
      <div className={styles.header}>
        <h1 className={styles.title}>Statistics</h1>
        <div className={styles.filters}>
          <button className={styles.downloadButton}>DOWNLOAD</button>
        </div>
      </div>

      {/* Time range filter */}
      <div className={styles.timeRangeFilterRow}>
        <select
          value={selectedTimeRange}
          onChange={(e) => {
            setSelectedTimeRange(e.target.value as TimeRangeOption);
          }}
          className={styles.dropdown}
        >
          {TIME_RANGE_OPTIONS.map((timeRange) => (
            <option key={timeRange} value={timeRange}>
              {timeRange}
            </option>
          ))}
        </select>
        {selectedTimeRange === "Custom Range" && (
          <>
            <label className={styles.dateInputLabel} htmlFor="start-date">
              Start date
            </label>
            <input
              className={styles.dropdown}
              type="date"
              id="start-date"
              name="start_date"
              value={filterStartDate}
              onChange={(e) => {
                setFilterStartDate(e.target.value);
              }}
            />

            <label className={styles.dateInputLabel} htmlFor="end-date">
              End date
            </label>
            <input
              className={styles.dropdown}
              type="date"
              id="end-date"
              name="end_date"
              value={filterEndDate}
              onChange={(e) => {
                setFilterEndDate(e.target.value);
              }}
            />

            <Button variant="primary" filled={false} onClick={() => void loadStats()}>
              Apply Changes
            </Button>
          </>
        )}
      </div>

      {/* User Activity Section */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>USER ACTIVITY</h2>

        <div className={styles.statsGrid}>
          <div className={styles.statCard}>
            <div className={styles.statLabel}>Total User Count</div>
            <div className={styles.statValue}>{userActivity.totalUserCount.toLocaleString()}</div>
            <div className={styles.statChange}>
              {totalUsersChangePercent === null ? (
                <span>— vs. Last {timePeriodName}</span>
              ) : totalUsersChangePercent > 0 ? (
                <span className={styles.changePositive}>
                  ↑ {totalUsersChangePercent}% vs. Last {timePeriodName}
                </span>
              ) : totalUsersChangePercent < 0 ? (
                <span className={styles.changeNegative}>
                  ↓ {Math.abs(Number(totalUsersChangePercent))}% vs. Last {timePeriodName}
                </span>
              ) : (
                <span>— vs. Last {timePeriodName}</span>
              )}
            </div>
          </div>

          <div className={styles.statCard}>
            <div className={styles.statLabel}>New Accounts Created</div>
            <div className={styles.statValue}>
              {userActivity.newAccountsCreated.toLocaleString()}
            </div>
            <div className={styles.statChange}>
              {newAccountsChangePercent === null ? (
                <span>— vs. Last {timePeriodName}</span>
              ) : newAccountsChangePercent > 0 ? (
                <span className={styles.changePositive}>
                  ↑ {newAccountsChangePercent}% vs. Last {timePeriodName}
                </span>
              ) : newAccountsChangePercent < 0 ? (
                <span className={styles.changeNegative}>
                  ↓ {Math.abs(Number(newAccountsChangePercent))}% vs. Last {timePeriodName}
                </span>
              ) : (
                <span>— vs. Last {timePeriodName}</span>
              )}
            </div>
          </div>

          <div className={styles.statCard}>
            <div className={styles.statLabel}>Avg Check-Ins per User</div>
            <div className={styles.statValue}>{userActivity.avgCheckInsPerUser}</div>
            <div className={styles.statChange}>
              {avgCheckInsChangePercent === null ? (
                <span>— vs. Last {timePeriodName}</span>
              ) : avgCheckInsChangePercent > 0 ? (
                <span className={styles.changePositive}>
                  ↑ {avgCheckInsChangePercent}% vs. Last {timePeriodName}
                </span>
              ) : avgCheckInsChangePercent < 0 ? (
                <span className={styles.changeNegative}>
                  ↓ {Math.abs(Number(avgCheckInsChangePercent))}% vs. Last {timePeriodName}
                </span>
              ) : (
                <span>— vs. Last {timePeriodName}</span>
              )}
            </div>
          </div>

          <div className={styles.statCard}>
            <div className={styles.statLabel}>Avg Journal Entries per User</div>
            <div className={styles.statValue}>{userActivity.avgEntriesPerUser}</div>
            <div className={styles.statChange}>
              {avgEntriesChangePercent === null ? (
                <span>— vs. Last {timePeriodName}</span>
              ) : avgEntriesChangePercent > 0 ? (
                <span className={styles.changePositive}>
                  ↑ {avgCheckInsChangePercent}% vs. Last {timePeriodName}
                </span>
              ) : avgEntriesChangePercent < 0 ? (
                <span className={styles.changeNegative}>
                  ↓ {Math.abs(Number(avgEntriesChangePercent))}% vs. Last {timePeriodName}
                </span>
              ) : (
                <span>— vs. Last {timePeriodName}</span>
              )}
            </div>
          </div>
        </div>

        {/* Monthly Activities Chart */}
        <div className={styles.chartCard}>
          <div className={styles.chartHeader}>
            <h3 className={styles.chartTitle}>User Activities Over Time</h3>

            <select
              value={activityGroupOption}
              onChange={(e) => {
                setActivityGroupOption(e.target.value as ActivityGroupOption);
              }}
              className={styles.dropdown}
            >
              {ACTIVITY_GROUP_OPTIONS.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>

            <div className={styles.legend}>
              <span className={styles.legendItem}>
                <span className={`${styles.legendDot} ${styles.dotCheckIns}`}></span>
                Check-ins
              </span>
              <span className={styles.legendItem}>
                <span className={`${styles.legendDot} ${styles.dotEntries}`}></span>
                Journal Entries Written
              </span>
            </div>
          </div>
          <div className={styles.statsRow}>
            <div className={styles.stat}>
              <div className={styles.statNum}>{userActivity.totalCheckIns}</div>
              <div className={styles.statLabel}>Total Check-ins</div>
            </div>
            <div className={styles.stat}>
              <div className={styles.statNum}>{userActivity.totalEntries}</div>
              <div className={styles.statLabel}>Total Journal Entries Written</div>
            </div>
          </div>
          <SimpleLineChart data={activityGroups} dataKey1="checkIns" dataKey2="entries" />
        </div>

        {/* User Retention Chart */}
        <div className={styles.chartCard}>
          <div className={styles.chartHeader}>
            <h3 className={styles.chartTitle}>User Retention</h3>
          </div>
          <p className={styles.statLabel}>
            Calculated as the percentage of users who interact with the app each day after signing
            up.
          </p>
          <UserRetentionChart data={stats.userRetention} />
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

      {/* All Users Section */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>ALL USERS</h2>
        <Button
          variant="primary"
          filled
          onClick={() => {
            const emails = allUsers?.map((u) => u.email).join(", ");
            if (emails) {
              navigator.clipboard
                .writeText(emails)
                .then(() => {
                  setEmailsCopied(true);
                })
                .catch((errorMessage) => {
                  alert(`Error copying emails: ${String(errorMessage)}`);
                });
            }
          }}
        >
          {emailsCopied ? "Copied to Clipboard" : "Copy All Emails"}
        </Button>
        <table className={styles.usersTable}>
          <thead>
            <tr>
              <th className={`${styles.usersTableCell} ${styles.usersTableHeaderCell}`}>Name</th>
              <th className={`${styles.usersTableCell} ${styles.usersTableHeaderCell}`}>Email</th>
            </tr>
          </thead>
          <tbody>
            {allUsers?.map((currentUser) => (
              <tr key={currentUser._id}>
                <td className={styles.usersTableCell}>{currentUser.name}</td>
                <td className={styles.usersTableCell}>{currentUser.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
}
