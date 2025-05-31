type ActivityType = "reflection" | "mcq" | "wwyd";

export type User = {
  _id: string;
  name: string;
  email: string;
  uid: string;
  completedLessons: Lesson[];
};

export type Unit = {
  _id: string;
  title: string;
  lessons: Lesson[];
};

export type Lesson = {
  _id: string;
  title: string;
  description: string;
  activities: Activity[];
};

export type Activity = {
  _id: string;
  type: ActivityType;
  content: string;
  options?: {
    content: string;
    affirmation: string;
  }[];
  affirmation?: string;
};
