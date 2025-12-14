const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:3000";

// DEV ONLY: Use mock data when enabled
const USE_MOCK_DATA = process.env.NEXT_PUBLIC_USE_MOCK_DATA === "true";

export type User = {
  _id: string;
  isAdmin: boolean;
};

export type UserActivityStats = {
  totalUserCount: number;
  totalUsersChangePercent?: number | null;
  newAccountsCreated: number;
  newAccountsChangePercent?: number | null;
  avgCheckInsPerUser: number;
  avgCheckInsChangePercent?: number | null;
  avgEntriesPerUser: number;
};

export type MonthlyActivity = {
  month: string;
  checkIns: number;
  entries: number;
};

export type OnboardingAnalytics = {
  ageRange: Record<string, number>;
  ethnicity: Record<string, number>;
  gender: Record<string, number>;
  counseling: Record<string, number>;
  education: Record<string, number>;
  residence: Record<string, number>;
};

export type StatsResponse = {
  userActivity: UserActivityStats;
  monthlyActivity: MonthlyActivity[];
  onboardingAnalytics: OnboardingAnalytics;
};

export type ActivityType = "mcq" | "wwyd" | "text";

export type Unit = {
  _id: string;
  title: string;
  order?: number;
  lessons: Lesson[];
};

export type Lesson = {
  _id: string;
  title: string;
  order?: number;
  description: string;
  activities: Activity[];
  unit: string;
};

export type ActivityOption = {
  content: string;
  affirmation: string;
};

export type Activity = {
  _id: string;
  type: ActivityType;
  question: string;
  options?: ActivityOption[];
  affirmation?: string;
};

/**
 * Generates mock data for development
 */
function generateMockData(): StatsResponse {
  return {
    userActivity: {
      totalUserCount: 3240,
      totalUsersChangePercent: 12,
      newAccountsCreated: 486,
      newAccountsChangePercent: 8,
      avgCheckInsPerUser: 150,
      avgCheckInsChangePercent: 5,
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
        Doctorate: 180,
      },
      residence: {
        Urban: 1840,
        Suburban: 980,
        Rural: 420,
      },
    },
  };
}

/**
 * Fetches statistics from the backend API
 * @param uid - User ID from Firebase auth
 * @returns Promise with statistics data
 */
export async function fetchStats(idToken: string): Promise<StatsResponse> {
  // DEV ONLY: Return mock data
  if (USE_MOCK_DATA) {
    console.warn("⚠️  DEV MODE: Using mock statistics data!");
    return generateMockData();
  }

  const response = await fetch(`${API_BASE_URL}/api/stats`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${idToken}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch statistics");
  }

  return (await response.json()) as StatsResponse;
}

/**
 * Verifies if a user is an admin
 * @param uid - User ID from Firebase auth
 * @returns Promise with admin status
 */
export async function verifyAdmin(idToken: string): Promise<boolean> {
  try {
    const response = await fetch(`${API_BASE_URL}/api/whoami`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${idToken}`,
      },
    });
    if (!response.ok) return false;

    const user = (await response.json()) as User;
    return user.isAdmin;
  } catch (error) {
    console.error("Error verifying admin status:", error);
    return false;
  }
}

// Units
export async function fetchAllUnits(idToken: string): Promise<Unit[]> {
  const response = await fetch(`${API_BASE_URL}/api/units`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${idToken}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch units");
  }

  return (await response.json()) as Unit[];
}

export async function createUnit(idToken: string, title: string): Promise<Unit> {
  const response = await fetch(`${API_BASE_URL}/api/units`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${idToken}`,
    },
    body: JSON.stringify({
      title,
    }),
  });

  if (!response.ok) {
    throw new Error("Failed to create unit");
  }

  return (await response.json()) as Unit;
}

export async function updateUnit(
  idToken: string,
  unitId: string,
  title?: string,
  order?: number,
): Promise<void> {
  const response = await fetch(`${API_BASE_URL}/api/units/${unitId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${idToken}`,
    },
    body: JSON.stringify({
      title,
      order,
    }),
  });

  if (!response.ok) {
    throw new Error("Failed to update unit");
  }
}

export async function deleteUnit(idToken: string, unitId: string): Promise<void> {
  const response = await fetch(`${API_BASE_URL}/api/units/${unitId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${idToken}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to delete unit");
  }
}

// Lessons
export async function createLesson(
  idToken: string,
  title: string,
  description: string,
  unitId: string,
): Promise<Lesson> {
  const response = await fetch(`${API_BASE_URL}/api/lessons`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${idToken}`,
    },
    body: JSON.stringify({
      title,
      description,
      unit: unitId,
    }),
  });

  if (!response.ok) {
    throw new Error("Failed to create lesson");
  }

  return (await response.json()) as Lesson;
}

export async function updateLesson(
  idToken: string,
  lessonId: string,
  title?: string,
  description?: string,
  order?: number,
): Promise<void> {
  const response = await fetch(`${API_BASE_URL}/api/lessons/${lessonId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${idToken}`,
    },
    body: JSON.stringify({
      title,
      description,
      order,
    }),
  });

  if (!response.ok) {
    throw new Error("Failed to update lesson");
  }
}

export async function deleteLesson(idToken: string, lessonId: string): Promise<void> {
  const response = await fetch(`${API_BASE_URL}/api/lessons/${lessonId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${idToken}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to delete lesson");
  }
}

// Activities
export async function createActivity(
  idToken: string,
  activityType: ActivityType,
  question: string,
  lessonId: string,
  affirmation?: string,
  options?: ActivityOption[],
): Promise<Lesson> {
  const response = await fetch(`${API_BASE_URL}/api/activities`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${idToken}`,
    },
    body: JSON.stringify({
      type: activityType,
      question,
      lesson: lessonId,
      options,
      affirmation,
    }),
  });

  if (!response.ok) {
    throw new Error("Failed to create activity");
  }

  return (await response.json()) as Lesson;
}

export async function updateActivity(
  idToken: string,
  activityId: string,
  question: string,
  affirmation?: string,
  options?: ActivityOption[],
): Promise<void> {
  const response = await fetch(`${API_BASE_URL}/api/activities/${activityId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${idToken}`,
    },
    body: JSON.stringify({
      question,
      options,
      affirmation,
    }),
  });

  if (!response.ok) {
    throw new Error("Failed to update lesson");
  }
}

export async function deleteActivity(idToken: string, activityId: string): Promise<void> {
  const response = await fetch(`${API_BASE_URL}/api/activities/${activityId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${idToken}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to delete activity");
  }
}
