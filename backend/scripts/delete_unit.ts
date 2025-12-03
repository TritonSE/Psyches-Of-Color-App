import "dotenv/config";
import mongoose from "mongoose";
import { Activity } from "../src/models/activity";
import { Lesson } from "../src/models/lesson";
import { Unit } from "../src/models/unit";

const MONGO_URI = process.env.MONGODB_URI;

// CHANGE THIS TO THE TITLE YOU WANT TO DELETE
const UNIT_TITLE_TO_DELETE = "Healing";

const deleteUnit = async () => {
  if (!MONGO_URI) {
    console.error("ERROR: Error: MONGODB_URI not found in .env file.");
    process.exit(1);
  }

  try {
    await mongoose.connect(MONGO_URI);
    console.log("🌱 Connected to MongoDB...");
    const unit = await Unit.findOne({ title: UNIT_TITLE_TO_DELETE });

    if (!unit) {
      console.log(`ERROR: Unit "${UNIT_TITLE_TO_DELETE}" not found.`);
      process.exit(0);
    }

    // Capture the order before deletion so we know where the gap will be
    const deletedOrder = unit.order;

    console.log(`Found Unit: ${unit.title} (Order: ${deletedOrder})`);

    // 2. Find all Lessons associated with this Unit
    const lessonIds = unit.lessons || [];

    // 3. Find all Activities associated with those Lessons
    const lessons = await Lesson.find({ _id: { $in: lessonIds } });

    // Flatten all activity IDs into one array
    const activityIds: (string | mongoose.Types.ObjectId)[] = [];
    lessons.forEach((lesson) => {
      if (lesson.activities) {
        activityIds.push(...lesson.activities);
      }
    });

    console.log(`Deleting ${activityIds.length} Activities...`);
    await Activity.deleteMany({ _id: { $in: activityIds } });

    console.log(`Deleting ${lessons.length} Lessons...`);
    await Lesson.deleteMany({ _id: { $in: lessonIds } });

    console.log(`Deleting Unit...`);
    await Unit.deleteOne({ _id: unit._id });

    // 4. Shift future orders down
    // For example, if I have units 1,2,3,4 and I want to delete unit 3,
    // then unit 4 becomes unit 3.
    if (deletedOrder !== undefined && deletedOrder !== null) {
      console.log(`Shifting units with order > ${deletedOrder} down by 1...`);

      const updateResult = await Unit.updateMany(
        { order: { $gt: deletedOrder } }, // Filter: Order is greater than the deleted one
        { $inc: { order: -1 } }, // Update: Decrease order by 1
      );

      console.log(`Reordered ${updateResult.modifiedCount} subsequent units.`);
    }

    console.log(`SUCCESS: Successfully deleted "${UNIT_TITLE_TO_DELETE}" and all its contents.`);
    process.exit(0);
  } catch (error) {
    console.error("ERROR: Error deleting unit:", error);
    process.exit(1);
  }
};

deleteUnit();
