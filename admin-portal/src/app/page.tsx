import React from "react";
import UserActivityMetrics from "../components/analytics/UserActivityMetrics";
import MonthlyActivities from "../components/analytics/MonthlyActivities";
import RetentionCurve from "../components/analytics/RetentionCurve";
import Demographics from "../components/analytics/Demographics";
import Counseling from "../components/analytics/Counseling";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#F6F6EA] flex font-['Archivo']">
      {/* Left Navigation Sidebar */}
      <div className="w-[243px] h-screen bg-[#2E563C] flex flex-col items-center py-[50px] px-[40px] gap-[26px] fixed left-0 top-0">
        {/* Logo Section */}
        <div className="w-[163px] h-[59px] flex flex-col gap-[10px]">
          {/* Logo/Icon placeholder - replace with actual logo */}
          {/* The Figma design shows a complex logo which will be handled separately if assets are provided. */}
          {/* For now, a placeholder with correct dimensions and styling according to Figma's 'Primary-Liberation 1' frame. */}
          <div className="w-[163px] h-[59px] bg-white rounded flex items-center justify-center">
            {/* This is a simplified representation. The actual logo is an SVG group. */}
            <span className="text-[#2E563C] font-bold text-sm">PSYCHES OF COLOR</span>
          </div>
        </div>

        {/* Navigation Buttons */}
        <div className="flex flex-col gap-[26px]">
          {/* Statistics Button - Active */}
          <div className="w-[163px] h-[50px] bg-[#1A3222] rounded-lg flex items-center gap-4 px-[10px]">
            <div className="w-6 h-6 flex items-center justify-center">
              {/* Statistics Icon - from Figma node I7247:26097;2928:21153;2921:20557 */}
              <svg
                width="18"
                height="19"
                viewBox="0 0 18 19"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M3 15.4799V9.47992H6V15.4799H3ZM7.5 15.4799V3.47992H10.5V15.4799H7.5ZM12 15.4799V6.47992H15V15.4799H12Z"
                  fill="white"
                />
              </svg>
            </div>
            <span className="text-white font-['Archivo'] font-normal text-base tracking-[0.32px] leading-[17.408px]">
              Statistics
            </span>
          </div>

          {/* Editor Button - Inactive */}
          <div className="w-[163px] h-[50px] rounded-lg flex items-center gap-4 px-[10px] hover:bg-[#1A3222]/50 transition-colors">
            <div className="w-6 h-6 flex items-center justify-center">
              {/* Editor Icon - from Figma node I7247:26097;2928:21154;2921:20613 - Assuming same icon for simplicity, update if different */}
              <svg
                width="18"
                height="19"
                viewBox="0 0 18 19"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M3 15.4799V9.47992H6V15.4799H3ZM7.5 15.4799V3.47992H10.5V15.4799H7.5ZM12 15.4799V6.47992H15V15.4799H12Z"
                  fill="white"
                />
              </svg>
            </div>
            <span className="text-white font-['Archivo'] font-normal text-base tracking-[0.32px] leading-[17.408px]">
              Editor
            </span>
          </div>

          {/* User Settings Button - Inactive */}
          <div className="w-[163px] h-[50px] rounded-lg flex items-center gap-4 px-[10px] hover:bg-[#1A3222]/50 transition-colors">
            <div className="w-6 h-6 flex items-center justify-center">
              {/* User Settings Icon - from Figma node I7247:26097;2928:21155;2921:20621 */}
              <svg
                width="18"
                height="16"
                viewBox="0 0 18 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M9 12C10.6569 12 12 10.6569 12 9C12 7.34315 10.6569 6 9 6C7.34315 6 6 7.34315 6 9C6 10.6569 7.34315 12 9 12Z"
                  fill="white"
                />
              </svg>
            </div>
            <span className="text-white font-['Archivo'] font-normal text-base tracking-[0.32px] leading-[17.408px]">
              User Settings
            </span>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 ml-[243px] bg-[#F6F6EA]">
        {/* Fixed Header - Figma node 7247:26131 */}
        <div className="w-full h-[244px] bg-white shadow-[0px_3px_5px_0px_rgba(205,205,205,0.1)] fixed top-0 left-[243px] right-0 z-10 px-[80px] flex flex-col">
          {/* Header Content - Figma node 7247:26140 */}
          <div className="flex justify-between items-center h-[98px] py-[50px]">
            {" "}
            {/* Adjusted padding to match Figma overall header height */}
            <h1 className="text-[32px] font-semibold text-black font-['Social_Gothic'] tracking-[0.64px] leading-[48px]">
              Statistics
            </h1>
            {/* User Profile Section - Figma node 7247:26142 */}
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-[11px]">
                <div className="w-[30px] h-[30px] bg-[#D9D9D9] rounded-full"></div>{" "}
                {/* Ellipse 23 */}
                <span className="text-[18px] font-semibold text-black font-['Archivo'] leading-[19.584px]">
                  John Cena
                </span>
              </div>
              {/* Arrow Icon - Figma node 7247:26146 */}
              <svg
                width="13"
                height="9"
                viewBox="0 0 13 9"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M6.5 9L0.713791 0.75L12.2862 0.75L6.5 9Z" fill="#6C6C6C" />
              </svg>
            </div>
          </div>

          {/* Tab Navigation - Figma node 7247:26132 */}
          <div className="flex flex-col gap-[20px] pt-[24px]">
            {" "}
            {/* Adjusted pt to align with figma image, original 'pb-[20px]' removed as spacing is handled by parent */}
            {/* Tab Buttons - Figma node I7247:26133;2899:5956 */}
            <div className="flex items-center gap-8">
              <button className="text-base font-normal text-[#010101] font-['Archivo'] tracking-[0.32px] leading-[24px]">
                All
              </button>
              <button className="text-base font-normal text-[#010101] font-['Archivo'] tracking-[0.32px] leading-[24px]">
                User
              </button>
              <button className="text-base font-bold text-[#2E563C] font-['Archivo'] tracking-[0.32px] leading-[24px] relative pb-[9px]">
                Demographics
                {/* Active Tab Underline - from Figma node I7247:26133;2899:5963 */}
                <div className="absolute bottom-0 left-0 w-full h-[1px] bg-[#2E563C]"></div>
              </button>
              <button className="text-base font-normal text-[#010101] font-['Archivo'] tracking-[0.32px] leading-[24px]">
                Lesson Ratings
              </button>
            </div>
            {/* Underline for all tabs container - Figma node I7247:26133;2899:5962 */}
            <div className="w-full h-px bg-[#B4B4B4] relative">
              {/* The green active underline is now part of the button for better alignment */}
            </div>
            {/* Controls Row - Figma node 7247:26134 */}
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-[17px]">
                {/* All Time Button - Figma node 7247:26136 */}
                <div className="w-[193px] h-[40px] border border-[#D9D9D9] rounded-[10px] flex items-center justify-between px-3 py-2">
                  <span className="text-base font-normal text-[#010101] font-['Archivo'] tracking-[0.32px] leading-[17.408px]">
                    All Time
                  </span>
                  {/* Dropdown Icon - Figma node 7247:26138 */}
                  <svg
                    width="16"
                    height="12"
                    viewBox="0 0 16 12"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M8 11.0457L0.414719 0.545679H15.5853L8 11.0457Z" fill="#010101" />
                  </svg>
                </div>
              </div>
              {/* Export Data Button - Figma node 7247:26139 */}
              <button className="w-[146px] h-[40px] bg-[#2E563C] rounded-[4px] flex items-center justify-center px-[24px] py-[10px]">
                <span className="text-base font-semibold text-white font-['Social_Gothic'] tracking-[0.16px] leading-[24px]">
                  Export Data
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* Main Dashboard Content - Figma node 7226:17265 */}
        {/* pt-[244px] is critical to ensure content starts below the fixed header */}
        <div className="pt-[244px] bg-[#F6F6EA] min-h-screen">
          {/* Figma: padding: 76px 80px for the main content wrapper */}
          <div className="w-full mx-auto px-[80px] py-[76px]">
            {" "}
            {/* Max width from figma: 1197px for content area, but side nav is 243px. 1440-243 = 1197. Let's assume content flows within this. */}
            {/* User Activity Section - Figma node 7226:17271 */}
            <div className="mb-[76px]">
              <div className="mb-[12px]">
                {" "}
                {/* Figma: gap 12px */}
                <h2 className="text-[26px] font-medium text-black font-['Social_Gothic'] tracking-[0.52px] leading-[39px]">
                  User Activity
                </h2>
              </div>
              <UserActivityMetrics />{" "}
              {/* Figma node 7226:17273, child of User Activity. Styling should be handled inside this component based on figma. */}
            </div>
            {/* Monthly Activities and Retention Curve - Figma node 7226:17270 contains these next two sections as children. Spacing between them is 28px (gap from 7226:17273)*/}
            {/* The parent frame for these two items is a flex column with 28px gap in figma's "Frame 1171276150" */}
            {/* However, current code structure is a grid. Let's try to match Figma's visual grouping. The outer `mb-[76px]` is for space to next major section. */}
            <div className="flex flex-col gap-[28px] mb-[76px]">
              {" "}
              {/* Matching Figma's vertical stacking and spacing */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-[28px]">
                {" "}
                {/* Figma's 7226:17311 (Monthly) and 7226:17380 (Retention) are side-by-side */}
                <MonthlyActivities /> {/* Figma node 7226:17311 */}
                <RetentionCurve /> {/* Figma node 7226:17380 */}
              </div>
            </div>
            {/* Onboarding Analytics Section - Figma node 7226:17435 */}
            <div className="mb-[76px]">
              <div className="mb-[12px]">
                {" "}
                {/* Figma: gap 12px */}
                <h2 className="text-[26px] font-medium text-black font-['Social_Gothic'] tracking-[0.52px] leading-[39px]">
                  Onboarding Analytics
                </h2>
              </div>
              {/* Demographics component contains Age, Ethnicity, Gender, Counseling. These are in a row, wrap according to figma node 7226:17437 */}
              <Demographics />
            </div>
            {/* Lesson Ratings Section - Figma node 7226:17593 */}
            <div>
              <div className="mb-[12px]">
                {" "}
                {/* Figma: gap 12px from title to dropdown */}
                <h2 className="text-[26px] font-medium text-black font-['Social_Gothic'] tracking-[0.52px] leading-[39px]">
                  Lesson Ratings
                </h2>
              </div>
              {/* All Lessons Dropdown - Figma node 7226:17597 */}
              <div className="flex items-center gap-4 mb-[20px]">
                {" "}
                {/* Figma: 20px gap from dropdown to charts */}
                <div className="w-[193px] h-[40px] border border-[#D9D9D9] rounded-[10px] flex items-center justify-between px-3 py-2 bg-white">
                  <span className="text-base font-normal text-[#010101] font-['Archivo'] tracking-[0.32px] leading-[17.408px]">
                    All Lessons
                  </span>
                  <svg
                    width="16"
                    height="12"
                    viewBox="0 0 16 12"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M8 11.0457L0.414719 0.545679H15.5853L8 11.0457Z" fill="#010101" />
                  </svg>
                </div>
              </div>
              {/* Counseling component now represents the charts for Lesson Ratings as per Figma node 7226:17600 */}
              <Counseling />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
