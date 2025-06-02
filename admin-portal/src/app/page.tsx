import React from "react";

import Counseling from "../components/analytics/Counseling";
import Demographics from "../components/analytics/Demographics";
import MonthlyActivities from "../components/analytics/MonthlyActivities";
import RetentionCurve from "../components/analytics/RetentionCurve";
import UserActivityMetrics from "../components/analytics/UserActivityMetrics";

export default function Home() {
  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#F6F6EA",
        display: "flex",
        fontFamily: "Archivo",
      }}
    >
      {/* Sidebar */}
      <div
        style={{
          width: 243,
          height: "100vh",
          backgroundColor: "#2E563C",
          padding: 40,
          paddingTop: 50,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 26,
          position: "fixed",
          left: 0,
          top: 0,
        }}
      >
        <div
          style={{
            width: 163,
            height: 59,
            backgroundColor: "white",
            borderRadius: 4,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <span style={{ color: "#2E563C", fontWeight: "bold", fontSize: 14 }}>
            PSYCHES OF COLOR
          </span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 26 }}>
          <div
            style={{
              width: 163,
              height: 50,
              backgroundColor: "#1A3222",
              borderRadius: 8,
              display: "flex",
              alignItems: "center",
              gap: 16,
              paddingLeft: 10,
            }}
          >
            <svg width="18" height="19" fill="white">
              <path d="M3 15.4799V9.47992H6V15.4799H3ZM7.5 15.4799V3.47992H10.5V15.4799H7.5ZM12 15.4799V6.47992H15V15.4799H12Z" />
            </svg>
            <span style={{ color: "white", fontSize: 16 }}>Statistics</span>
          </div>
          <div
            style={{
              width: 163,
              height: 50,
              borderRadius: 8,
              display: "flex",
              alignItems: "center",
              gap: 16,
              paddingLeft: 10,
              cursor: "pointer",
            }}
          >
            <svg width="18" height="19" fill="white">
              <path d="M3 15.4799V9.47992H6V15.4799H3ZM7.5 15.4799V3.47992H10.5V15.4799H7.5ZM12 15.4799V6.47992H15V15.4799H12Z" />
            </svg>
            <span style={{ color: "white", fontSize: 16 }}>Editor</span>
          </div>
          <div
            style={{
              width: 163,
              height: 50,
              borderRadius: 8,
              display: "flex",
              alignItems: "center",
              gap: 16,
              paddingLeft: 10,
              cursor: "pointer",
            }}
          >
            <svg width="18" height="16" fill="white">
              <path d="M9 12C10.6569 12 12 10.6569 12 9C12 7.34315 10.6569 6 9 6C7.34315 6 6 7.34315 6 9C6 10.6569 7.34315 12 9 12Z" />
            </svg>
            <span style={{ color: "white", fontSize: 16 }}>User Settings</span>
          </div>
        </div>
      </div>

      {/* Main Area */}
      <div style={{ marginLeft: 243, flex: 1, backgroundColor: "#F6F6EA" }}>
        <div
          style={{
            width: "100%",
            height: 244,
            backgroundColor: "white",
            boxShadow: "0px 3px 5px rgba(205,205,205,0.1)",
            position: "fixed",
            top: 0,
            left: 243,
            zIndex: 10,
            padding: "50px 80px",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              height: 98,
            }}
          >
            <h1
              style={{ fontSize: 32, fontWeight: 600, color: "black", fontFamily: "Social_Gothic" }}
            >
              Statistics
            </h1>
            <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 11 }}>
                <div
                  style={{ width: 30, height: 30, backgroundColor: "#D9D9D9", borderRadius: "50%" }}
                ></div>
                <span style={{ fontSize: 18, fontWeight: 600, color: "black" }}>John Cena</span>
              </div>
              <svg width="13" height="9" fill="#6C6C6C">
                <path d="M6.5 9L0.713791 0.75L12.2862 0.75L6.5 9Z" />
              </svg>
            </div>
          </div>
          <div style={{ display: "flex", gap: 32, paddingTop: 24 }}>
            <span style={{ fontSize: 16, color: "#010101" }}>All</span>
            <span style={{ fontSize: 16, color: "#010101" }}>User</span>
            <span
              style={{
                fontSize: 16,
                color: "#2E563C",
                fontWeight: "bold",
                borderBottom: "1px solid #2E563C",
                paddingBottom: 9,
              }}
            >
              Demographics
            </span>
            <span style={{ fontSize: 16, color: "#010101" }}>Lesson Ratings</span>
          </div>
          <div style={{ height: 1, backgroundColor: "#B4B4B4", marginTop: 8 }}></div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginTop: 20,
            }}
          >
            <div
              style={{
                border: "1px solid #D9D9D9",
                borderRadius: 10,
                padding: "8px 12px",
                width: 193,
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <span style={{ fontSize: 16 }}>All Time</span>
              <svg width="16" height="12" fill="#010101">
                <path d="M8 11.0457L0.414719 0.545679H15.5853L8 11.0457Z" />
              </svg>
            </div>
            <button
              style={{
                backgroundColor: "#2E563C",
                borderRadius: 4,
                padding: "10px 24px",
                color: "white",
                fontFamily: "Social_Gothic",
                fontWeight: 600,
                fontSize: 16,
              }}
            >
              Export Data
            </button>
          </div>
        </div>

        <div style={{ paddingTop: 244, backgroundColor: "#F6F6EA", minHeight: "100vh" }}>
          <div style={{ width: "100%", maxWidth: 1200, margin: "0 auto", padding: "76px 80px" }}>
            <div style={{ marginBottom: 76 }}>
              <h2
                style={{
                  fontSize: 26,
                  fontWeight: 500,
                  color: "black",
                  fontFamily: "Social_Gothic",
                  marginBottom: 12,
                }}
              >
                User Activity
              </h2>
              <UserActivityMetrics />
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 28, marginBottom: 76 }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 28 }}>
                <MonthlyActivities />
                <RetentionCurve />
              </div>
            </div>

            <div style={{ marginBottom: 76 }}>
              <h2
                style={{
                  fontSize: 26,
                  fontWeight: 500,
                  color: "black",
                  fontFamily: "Social_Gothic",
                  marginBottom: 12,
                }}
              >
                Onboarding Analytics
              </h2>
              <Demographics />
            </div>

            <div>
              <h2
                style={{
                  fontSize: 26,
                  fontWeight: 500,
                  color: "black",
                  fontFamily: "Social_Gothic",
                  marginBottom: 12,
                }}
              >
                Lesson Ratings
              </h2>
              <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 20 }}>
                <div
                  style={{
                    width: 193,
                    height: 40,
                    border: "1px solid #D9D9D9",
                    borderRadius: 10,
                    padding: "8px 12px",
                    backgroundColor: "white",
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <span style={{ fontSize: 16 }}>All Lessons</span>
                  <svg width="16" height="12" fill="none">
                    <path d="M8 11.0457L0.414719 0.545679H15.5853L8 11.0457Z" fill="#010101" />
                  </svg>
                </div>
              </div>
              <Counseling />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
