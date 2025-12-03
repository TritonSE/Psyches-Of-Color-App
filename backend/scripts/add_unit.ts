import "dotenv/config";
import mongoose from "mongoose";
import { Activity } from "../src/models/activity";
import { Lesson } from "../src/models/lesson";
import { Unit } from "../src/models/unit";

const MONGO_URI = process.env.MONGODB_URI;

const addNewUnit = async () => {
  if (!MONGO_URI) {
    console.error("❌ Error: MONGODB_URI not found in .env file.");
    process.exit(1);
  }

  try {
    await mongoose.connect(MONGO_URI);
    console.log("🌱 Connected to MongoDB...");

    // UNIT: HEALING
    const UNIT_TITLE = "Healing";
    const UNIT_DESCRIPTION =
      "Healing is described as a personal, nonlinear journey of recovering from emotional, mental, or physical distress. It involves self-awareness, self-compassion, and intentional efforts to rebuild strength and inner peace. Healing can take many forms, including seeking support, practicing self-care, and reframing negative thoughts.";

    // Check for duplicates
    const existingUnit = await Unit.findOne({ title: UNIT_TITLE });
    if (existingUnit) {
      console.log(`⚠️ Unit "${UNIT_TITLE}" already exists. Aborting.`);
      process.exit(0);
    }

    // ==========================================
    // LESSON 1: UNDERSTANDING THE JOURNEY
    // ==========================================

    // l1_a1 stands for Lesson 1, Activity 1
    const l1_a1 = await Activity.create({
      type: "mcq",
      question: "How do you respond when faced with emotional pain?",
      options: [
        { content: "I try to ignore it and move on", isCorrect: true },
        { content: "I acknowledge it but struggle to process it", isCorrect: true },
        { content: "I express my feelings through healthy outlets", isCorrect: true },
        { content: "I seek support from loved ones or professionals", isCorrect: true },
      ],
    });

    // l1_a1 stands for Lesson 1, Activity 2 and so on
    const l1_a2 = await Activity.create({
      type: "mcq",
      question: "What does healing look like to you?",
      options: [
        { content: "Forgetting the past and moving forward", isCorrect: true },
        { content: "Allowing myself to feel and process emotions", isCorrect: true },
        { content: "Becoming the best version of myself through growth", isCorrect: true },
        { content: "Avoiding pain and discomfort", isCorrect: true },
      ],
    });

    const l1_a3 = await Activity.create({
      type: "mcq",
      question: "When you experience setbacks in your healing journey, how do you react?",
      options: [
        { content: "I feel like giving up", isCorrect: true },
        { content: "I remind myself that healing takes time", isCorrect: true },
        { content: "I reflect on what I’ve learned so far", isCorrect: true },
        { content: "I seek support and adjust my approach", isCorrect: true },
      ],
    });

    // Reflection for Lesson 1
    const l1_a4 = await Activity.create({
      type: "text",
      question: "My healing journey is my own and I honor my progress.",
      affirmation:
        "There’s no universal timeline for healing. Every small step you take is a sign of strength and self-respect.",
    });

    // Creating the first lesson
    const lesson1 = await Lesson.create({
      title: "Understanding the Journey",
      description: "Defining what healing looks like for you.",
      // Needs to have order 1 because it is the first lesson in the unit
      order: 1,
      // List all the activities that should be in this lesson. Get the ids using ._id
      activities: [l1_a1._id, l1_a2._id, l1_a3._id, l1_a4._id],
    });

    await Activity.updateMany(
      { _id: { $in: [l1_a1._id, l1_a2._id, l1_a3._id, l1_a4._id] } },
      { $set: { lesson: lesson1._id } },
    );

    // LESSON 2: TOOLS FOR SELF-COMPASSION

    // l2_a1 stands for Lesson 2, Activity 1 and so on
    const l2_a1 = await Activity.create({
      type: "mcq",
      question: "Which of the following helps you feel most at peace during difficult times?",
      options: [
        { content: "Engaging in creative activities (writing, art, music)", isCorrect: true },
        { content: "Practicing mindfulness or meditation", isCorrect: true },
        { content: "Talking to someone I trust", isCorrect: true },
        { content: "Spending time alone for self-reflection", isCorrect: true },
      ],
    });

    const l2_a2 = await Activity.create({
      type: "mcq",
      question: "How often do you give yourself grace when struggling?",
      options: [
        { content: "Never", isCorrect: true },
        { content: "Rarely", isCorrect: true },
        { content: "Sometimes", isCorrect: true },
        { content: "Often", isCorrect: true },
      ],
    });

    const l2_a3 = await Activity.create({
      type: "mcq",
      question: "What is one thing you can do today to support your healing journey?",
      options: [
        { content: "Set small, realistic goals for myself", isCorrect: true },
        { content: "Identify and challenge negative self-talk", isCorrect: true },
        { content: "Engage in self-care activities", isCorrect: true },
        { content: "All of the above", isCorrect: true },
      ],
    });

    const l2_a4 = await Activity.create({
      type: "text",
      question: "I am entitled to time, space and patience as I heal.",
      affirmation:
        "You don’t have to rush your recovery. Give yourself the same grace you’d offer someone you love.",
    });

    // Create the second lesson. Note order 2 because it is the second lesson
    const lesson2 = await Lesson.create({
      title: "Tools for Self-Compassion",
      description: "Practical ways to nurture your healing.",
      order: 2,
      activities: [l2_a1._id, l2_a2._id, l2_a3._id, l2_a4._id],
    });

    // Link activities to lesson
    await Activity.updateMany(
      { _id: { $in: [l2_a1._id, l2_a2._id, l2_a3._id, l2_a4._id] } },
      { $set: { lesson: lesson2._id } },
    );

    // LESSON 3: REFLECTION & RESILIENCE
    const l3_a1 = await Activity.create({
      type: "wwyd",
      question:
        "You’ve been making progress, but today you feel emotionally drained. A friend invites you to talk, but you feel the urge to withdraw. What would you do?",
      options: [
        {
          content: "Remind yourself that healing isn’t linear and give space for difficult days",
          isCorrect: true,
        },
        { content: "Take a moment to name what I am feeling", isCorrect: true },
        { content: "Engage in a grounding technique", isCorrect: true },
        { content: "Talk to someone you trust", isCorrect: true },
      ],
    });

    const l3_a2 = await Activity.create({
      type: "text",
      question: "What does healing mean to you and how have you seen it show up in your life?",
      affirmation:
        "Taking time to reflect on what healing looks like for you helps you recognize moments of growth and resilience.",
    });

    const l3_a3 = await Activity.create({
      type: "text",
      question: "What past experiences or thoughts do you need to release to continue healing?",
      affirmation:
        "Identifying what no longer serves you is a crucial step toward emotional freedom.",
    });

    const l3_a4 = await Activity.create({
      type: "text",
      question: "I release what no longer serves me and choose peace.",
      affirmation:
        "Letting go is a form of self-liberation. With each release, you make more room for calm, clarity, and comfort.",
    });

    const lesson3 = await Lesson.create({
      title: "Reflection & Resilience",
      description: "Deepening your understanding of your own journey.",
      order: 3,
      activities: [l3_a1._id, l3_a2._id, l3_a3._id, l3_a4._id],
    });

    await Activity.updateMany(
      { _id: { $in: [l3_a1._id, l3_a2._id, l3_a3._id, l3_a4._id] } },
      { $set: { lesson: lesson3._id } },
    );

    // CREATING UNIT

    // Find the last unit in the database (n) and make this unit n+1.
    // For example, if I already have 10 units (n=10) then this will be 11th
    // If no units exist, set n=0 so that this will be unit 1
    const lastUnit = (await Unit.findOne().sort({ order: -1 })) as any;
    const newOrder = (lastUnit?.order || 0) + 1;

    // Create the unit itself
    const newUnit = await Unit.create({
      title: UNIT_TITLE,
      description: UNIT_DESCRIPTION,
      order: newOrder,
      lessons: [lesson1._id, lesson2._id, lesson3._id],
    });

    // Link lessons to unit
    await Lesson.updateMany(
      { _id: { $in: [lesson1._id, lesson2._id, lesson3._id] } },
      { $set: { unit: newUnit._id } },
    );

    console.log(`✅ Successfully added "${UNIT_TITLE}"`);
    process.exit(0);
  } catch (error) {
    console.error("❌ Error adding unit:", error);
    process.exit(1);
  }
};

addNewUnit();
