type QuestionType = "text" | "mcq";

export type User = {
  _id: string;
  name: string;
  email: string;
  uid: string;
  completedActivities: Activity[];
};

export type Section = {
  _id: string;
  title: string;
  activities: Activity[];
};

export type Activity = {
  _id: string;
  title: string;
  description: string;
  questions: string[];
};

export type Question = {
  _id: string;
  type: QuestionType;
  content: string;
  options?: {
    content: string;
    affirmation: string;
  }[];
  affirmation?: string;
};
