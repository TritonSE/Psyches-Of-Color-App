import { DocumentDirectoryPath, readFile, writeFile } from "react-native-fs";

import { JournalEntry } from "@/types";
import env from "@/util/validateEnv";

export const getJournalEntries = async (idToken: string): Promise<JournalEntry[] | null> => {
  try {
    const response = await fetch(`${env.EXPO_PUBLIC_BACKEND_URI}/api/journalEntries`, {
      headers: {
        Authorization: `Bearer ${idToken}`,
      },
    });
    if (response.ok) {
      const data = (await response.json()) as { entries: JournalEntry[] };
      return data.entries;
    } else {
      // TODO display error modal to user
      console.error(`Error retrieving journal entries: HTTP ${response.status.toString()}`);
      return null;
    }
  } catch (error) {
    console.error("Error retrieving journal entries: ", error);

    return null;
  }
};

export const createJournalEntry = async (
  idToken: string,
  title: string,
  paragraph: string,
  imageUrl?: string,
): Promise<JournalEntry> => {
  let persistentImageUrl = undefined;
  if (imageUrl) {
    // Copy image file from image picker cache to persistent documents directory
    const content = await readFile(imageUrl, "base64");
    const pathParts = imageUrl.split("/");
    const originalFilename = pathParts[pathParts.length - 1];
    const outputPath = `${DocumentDirectoryPath}/${originalFilename}`;
    await writeFile(outputPath, content, "base64");
    persistentImageUrl = `file://${outputPath}`;
  }

  console.log("before:", imageUrl, "after:", persistentImageUrl);

  const response = await fetch(`${env.EXPO_PUBLIC_BACKEND_URI}/api/journalEntries`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${idToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ title, paragraph, imageUrl: persistentImageUrl }),
  });
  if (response.ok) {
    return (await response.json()) as JournalEntry;
  } else {
    throw new Error(`HTTP ${response.status.toString()}`);
  }
};
