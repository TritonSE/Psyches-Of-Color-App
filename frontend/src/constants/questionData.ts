// File: src/data/questionsData.ts

export type QuestionData = {
  type: "multipleChoice" | "shortAnswer";
  question: string;
  options?: string[];
  placeholder?: string;
  otherOptions?: string[];
};

export const activityPageQuestions: QuestionData[] = [
  {
    type: "multipleChoice",
    question:
      "How often do you replay conversations or events in your head, worrying about how they went?",
    options: ["Often", "Sometimes", "Rarely", "Never"],
  },
  {
    type: "multipleChoice",
    question: "Question 2",
    options: ["Often", "Sometimes", "Rarely", "Never"],
  },
];

export const onboardingQuestions: QuestionData[] = [
  {
    type: "multipleChoice",
    question: "How old are you?",
    options: ["Under 18", "18–24", "25–34", "35–44", "45 and over"],
  },
  {
    type: "multipleChoice",
    question: "What gender do you identify with?",
    options: ["Male", "Female", "Non-binary", "Prefer not to say", "Other"],
  },
  {
    type: "multipleChoice",
    question: "Which ethnicity or ethnic group do you identify with (Select all that apply)",
    options: ["Black or African", "Hispanic or Latino", "Asian", "White", "Other"],
  },
  {
    type: "multipleChoice",
    question: "What is your highest level of education?",
    options: [
      "Current Middle Schooler",
      "Middle School Graduate",
      "Current High Schooler",
      "High School Graduate",
      "GED or Secondary School Certification",
      "Current College Student",
      "College Graduate",
    ],
  },
  {
    type: "multipleChoice",
    question: "Have you had previous counseling experience?",
    options: [
      "Yes, I am currently attending counseling.",
      "Yes, I have attended counseling in the past.",
      "No, but I am open to trying it.",
      "No, I have not attended counseling.",
      "Prefer not to say",
    ],
  },

  {
    type: "shortAnswer",
    question: "Where do you reside in?",
    placeholder: "Enter City, State",
  },
];
