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

    // ---------------------------------------------------------
    // UNIT 3: DEPRESSION
    // ---------------------------------------------------------

    const UNIT_TITLE = "Unit 3: Understanding Depression";

    // Check for duplicates
    const existingUnit = await Unit.findOne({ title: UNIT_TITLE });
    if (existingUnit) {
      console.log(`⚠️ Unit "${UNIT_TITLE}" already exists. Aborting.`);
      process.exit(0);
    }

    // ==========================================
    // LESSON 1: IDENTIFYING THE SIGNS
    // ==========================================

    const l1_a1 = await Activity.create({
      type: "mcq",
      question: "How do you typically know when you’re depressed?",
      options: [
        { content: "Loss of interest in activities", isCorrect: true },
        { content: "Feeling sad or hopeless", isCorrect: true },
        { content: "Difficulty concentrating", isCorrect: true },
        { content: "Changes in appetite or sleep patterns", isCorrect: true },
        { content: "Lack of energy or motivation", isCorrect: true },
        { content: "Other", isCorrect: true },
      ],
    });

    const l1_a2 = await Activity.create({
      type: "mcq",
      question: "Are you able to recognize depression in others?",
      options: [
        { content: "Yes, always", isCorrect: true },
        { content: "Yes, sometimes", isCorrect: true },
        { content: "No, not really", isCorrect: true },
        { content: "No, never", isCorrect: true },
      ],
    });

    const l1_a3 = await Activity.create({
      type: "mcq",
      question: "On a typical day, how would you describe your energy levels?",
      options: [
        { content: "Low", isCorrect: true },
        { content: "Average", isCorrect: true },
        { content: "High", isCorrect: true },
        { content: "Other", isCorrect: true },
      ],
    });

    const lesson1 = await Lesson.create({
      title: "Identifying the Signs",
      description: "Recognizing symptoms in yourself and others.",
      order: 1,
      activities: [l1_a1._id, l1_a2._id, l1_a3._id],
    });

    // Link activities back to lesson
    await Activity.updateMany(
      { _id: { $in: [l1_a1._id, l1_a2._id, l1_a3._id] } },
      { $set: { lesson: lesson1._id } },
    );

    // ==========================================
    // LESSON 2: NAVIGATING ISOLATION & COPING
    // ==========================================

    const l2_a1 = await Activity.create({
      type: "mcq",
      question: "What do you typically do to fight depression?",
      options: [
        { content: "Talk to a friend or family member", isCorrect: true },
        { content: "Seek professional help (therapy or counseling)", isCorrect: true },
        { content: "Engage in physical activity or exercise", isCorrect: true },
        { content: "Take time to relax or meditate", isCorrect: true },
        { content: "Avoid dealing with it", isCorrect: true }, // Technically 'incorrect' coping, but valid selection
        { content: "Other", isCorrect: true },
      ],
    });

    const l2_a2 = await Activity.create({
      type: "mcq",
      question: "When feeling down, how often do you isolate yourself from friends or family?",
      options: [
        { content: "Never", isCorrect: true },
        { content: "Rarely", isCorrect: true },
        { content: "Sometimes", isCorrect: true },
        { content: "Often", isCorrect: true },
        { content: "Always", isCorrect: true },
      ],
    });

    const l2_a3 = await Activity.create({
      type: "wwyd",
      question:
        "Lately, you have been isolated and distant from people who matter to you. It feels hard to reach out. What is one small step you can take to reconnect today?",
      options: [
        {
          content: "Send a simple text that says “Hey, I’ve been thinking about you.”",
          isCorrect: true,
        },
        { content: "Call or message someone and say “I miss you.”", isCorrect: true },
        { content: "Share a funny video or lighthearted meme", isCorrect: true },
        { content: "Sending a message and scheduling time for a meet up", isCorrect: true },
      ],
    });

    const lesson2 = await Lesson.create({
      title: "Navigating Isolation",
      description: "Strategies for connection and coping.",
      order: 2,
      activities: [l2_a1._id, l2_a2._id, l2_a3._id],
    });

    await Activity.updateMany(
      { _id: { $in: [l2_a1._id, l2_a2._id, l2_a3._id] } },
      { $set: { lesson: lesson2._id } },
    );

    // ==========================================
    // LESSON 3: HEALING & REFLECTION
    // ==========================================

    const l3_a1 = await Activity.create({
      type: "reflection",
      question: "Even on my hardest days, I am worthy of love, kindness, and compassion.",
      affirmation:
        "No matter what you're navigating—whether you're glowing or just getting by—you are still deserving of gentleness and grace. Treat yourself the way you’d treat a younger version of yourself.",
    });

    const l3_a2 = await Activity.create({
      type: "reflection",
      question:
        "Small steps forward are still progress. Every action I take toward healing matters.",
      affirmation:
        "No matter what you’re going through, your worth is never tied to how you feel or what you accomplish. Showing yourself love, kindness, and patience helps build resilience.",
    });

    const l3_a3 = await Activity.create({
      type: "reflection",
      question:
        "Think of a time when you felt hopeful or joyful. What people, places, or activities contributed to that feeling? How can you invite more of those into your life?",
      affirmation:
        "Joy is resistance. Find small ways to bring more of that into your life—it doesn’t have to be big to be powerful.",
    });

    const l3_a4 = await Activity.create({
      type: "reflection",
      question:
        "Write a letter to your future self on a day when you might be struggling. What words of encouragement would you want to hear?",
      affirmation:
        "You deserve to be your own safe space. Talk to yourself the way you would to someone you love—and let those words sink in.",
    });

    const l3_a5 = await Activity.create({
      type: "reflection",
      question:
        "Imagine a friend you deeply care about was feeling the way you are right now. What words of comfort or support would you offer them?",
      affirmation:
        "Sometimes we speak to others with more grace than we give ourselves. Offer yourself the same kindness you’d give a friend.",
    });

    const lesson3 = await Lesson.create({
      title: "Healing & Reflection",
      description: "Affirmations and prompts for self-compassion.",
      order: 3,
      activities: [l3_a1._id, l3_a2._id, l3_a3._id, l3_a4._id, l3_a5._id],
    });

    await Activity.updateMany(
      { _id: { $in: [l3_a1._id, l3_a2._id, l3_a3._id, l3_a4._id, l3_a5._id] } },
      { $set: { lesson: lesson3._id } },
    );

    // ==========================================
    // CREATE UNIT
    // ==========================================

    // Dynamic ordering: Place at the end
    const lastUnit = await Unit.findOne().sort({ order: -1 });
    const newOrder = (lastUnit?.order || 0) + 1;

    const newUnit = await Unit.create({
      title: UNIT_TITLE,
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
