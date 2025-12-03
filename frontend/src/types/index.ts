type ActivityType = "reflection" | "mcq" | "wwyd" | "text";

export type CompletedLesson = {
  lessonId: string;
  completedAt: string;
};

export type User = {
  _id: string;
  name: string;
  email: string;
  uid: string;
  character: string;
  lastCompletedWeeklyCheckIn?: string | null;
  lastCompletedDailyCheckIn?: string | null;
  completedLessons: CompletedLesson[];
  currLesson: Lesson;
  onboardingInfo: OnboardingInfo;
  completedOnboarding: boolean;
};

export type OnboardingInfo = {
  ageRange: string;
  gender: string;
  ethnicity: string;
  educationLevel: string;
  counselingExperience: string;
  residence: string;
};

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
};

export type Activity = {
  _id: string;
  type: ActivityType;
  question: string;
  options?: {
    content: string;
    affirmation: string;
  }[];
  affirmation?: string;
};

export type JournalEntry = {
  _id: string;
  title: string;
  paragraph: string;
  imageUrl?: string;
  createdAt: string;
  updatedAt: string;
};
