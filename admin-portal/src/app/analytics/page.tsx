import React from "react";
import UserActivityMetrics from "../../components/analytics/UserActivityMetrics";
import MonthlyActivities from "../../components/analytics/MonthlyActivities";
import RetentionCurve from "../../components/analytics/RetentionCurve";
import Demographics from "../../components/analytics/Demographics";
import Counseling from "../../components/analytics/Counseling";

const AnalyticsPage = () => {
  return (
    <main className="min-h-screen bg-[#F6F6EA]">
      <div className="max-w-7xl mx-auto p-6 space-y-6">
        <h2 className="text-2xl font-bold font-archivo mb-8">Analytics Dashboard</h2>

        <UserActivityMetrics />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <MonthlyActivities />
          <RetentionCurve />
        </div>

        <Demographics />
        <Counseling />
      </div>
    </main>
  );
};

export default AnalyticsPage;
