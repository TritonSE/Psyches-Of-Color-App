const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3000";

// DEV ONLY: Use mock data when enabled
const USE_MOCK_DATA = process.env.NEXT_PUBLIC_USE_MOCK_DATA === "true";

export interface UserActivityStats {
  totalUserCount: number;
  newAccountsCreated: number;
  avgCheckInsPerUser: number;
  avgEntriesPerUser: number;
}

export interface MonthlyActivity {
  month: string;
  checkIns: number;
  entries: number;
}

export interface RetentionPoint {
  day: string;
  activeUsers: number;
}

export interface OnboardingAnalytics {
  ageRange: { [key: string]: number };
  ethnicity: { [key: string]: number };
  gender: { [key: string]: number };
  counseling: { [key: string]: number };
  education: { [key: string]: number };
  residence: { [key: string]: number };
}

export interface LessonMetrics {
  averageRating: number;
  ratingsByUnit: Array<{ unit: string; rating: number }>;
}

export interface StatsResponse {
  userActivity: UserActivityStats;
  monthlyActivity: MonthlyActivity[];
  retentionCurve: RetentionPoint[];
  onboardingAnalytics: OnboardingAnalytics;
  lessonMetrics: LessonMetrics;
}

/**
 * Generates mock data for development
 */
function generateMockData(): StatsResponse {
  return {
    userActivity: {
      totalUserCount: 3240,
      newAccountsCreated: 486,
      avgCheckInsPerUser: 150,
      avgEntriesPerUser: 200,
    },
    monthlyActivity: [
      { month: "2024-07", checkIns: 120, entries: 85 },
      { month: "2024-08", checkIns: 135, entries: 95 },
      { month: "2024-09", checkIns: 180, entries: 120 },
      { month: "2024-10", checkIns: 225, entries: 145 },
      { month: "2024-11", checkIns: 280, entries: 180 },
      { month: "2024-12", checkIns: 315, entries: 210 },
    ],
    retentionCurve: [
      { day: "Day 0", activeUsers: 100 },
      { day: "Day 1", activeUsers: 85 },
      { day: "Day 2", activeUsers: 72 },
      { day: "Day 3", activeUsers: 68 },
      { day: "Day 4", activeUsers: 58 },
      { day: "Day 5", activeUsers: 62 },
      { day: "Day 6", activeUsers: 75 },
      { day: "Day 7", activeUsers: 82 },
    ],
    onboardingAnalytics: {
      ageRange: {
        "18-24": 850,
        "25-34": 1200,
        "35-44": 680,
        "45-54": 350,
        "55+": 160,
      },
      ethnicity: {
        "African American": 890,
        Asian: 620,
        Hispanic: 580,
        White: 720,
        "Mixed/Other": 430,
      },
      gender: {
        Male: 1240,
        Female: 1580,
        "Non-binary": 280,
        "Prefer not to say": 140,
      },
      counseling: {
        "Never attended counseling": 1450,
        "Attended once or twice": 890,
        "Currently in counseling": 620,
        "Regularly attended in the past": 280,
      },
      education: {
        "High School": 420,
        "Some College": 680,
        "Bachelor's Degree": 1340,
        "Master's Degree": 620,
        "Doctorate": 180,
      },
      residence: {
        Urban: 1840,
        Suburban: 980,
        Rural: 420,
      },
    },
    lessonMetrics: {
      averageRating: 4.37,
      ratingsByUnit: [
        { unit: "Unit 1", rating: 4.2 },
        { unit: "Unit 2", rating: 4.5 },
        { unit: "Unit 3", rating: 4.4 },
      ],
    },
  };
}

/**
 * Fetches statistics from the backend API
 * @param uid - User ID from Firebase auth
 * @returns Promise with statistics data
 */
export async function fetchStats(uid: string): Promise<StatsResponse> {
  // DEV ONLY: Return mock data
  if (USE_MOCK_DATA) {
    console.warn("⚠️  DEV MODE: Using mock statistics data!");
    await new Promise((resolve) => setTimeout(resolve, 500)); // Simulate network delay
    return generateMockData();
  }

  const response = await fetch(`${API_BASE_URL}/api/stats`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${uid}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch statistics");
  }

  return response.json();
}

/**
 * Verifies if a user is an admin
 * @param uid - User ID from Firebase auth
 * @returns Promise with admin status
 */
export async function verifyAdmin(uid: string): Promise<boolean> {
  try {
    const response = await fetch(`${API_BASE_URL}/api/users/${uid}`);
    if (!response.ok) return false;
    
    const user = await response.json();
    return user.isAdmin === true;
  } catch (error) {
    console.error("Error verifying admin status:", error);
    return false;
  }
}

