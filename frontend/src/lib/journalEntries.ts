import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { DocumentDirectoryPath, readFile, writeFile } from "react-native-fs";

import { useAuth } from "@/contexts/userContext";
import { JournalEntry } from "@/types";
import env from "@/util/validateEnv";

export const useGetJournalEntries = (createdAtGte?: string, createdAtLte?: string) => {
  const { firebaseUser } = useAuth();

  return useQuery({
    queryKey: ["journalEntries", createdAtGte, createdAtLte],
    queryFn: async () => {
      if (!firebaseUser) return null;
      try {
        const idToken = await firebaseUser?.getIdToken();
        const url = new URL(`${env.EXPO_PUBLIC_BACKEND_URI}/api/journalEntries`);
        if (createdAtGte) {
          url.searchParams.set("createdAtGte", createdAtGte);
        }
        if (createdAtLte) {
          url.searchParams.set("createdAtLte", createdAtLte);
        }
        const response = await fetch(url, {
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
    },
  });
};

export const useCreateJournalEntry = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      idToken,
      title,
      paragraph,
      imageUrl,
    }: {
      idToken: string;
      title: string;
      paragraph: string;
      imageUrl?: string;
    }) => {
      let persistentImageUrl: string | undefined = undefined;
      if (imageUrl) {
        // Copy image file from image picker cache to persistent documents directory
        const content = await readFile(imageUrl, "base64");
        const pathParts = imageUrl.split("/");
        const originalFilename = pathParts[pathParts.length - 1];
        const outputPath = `${DocumentDirectoryPath}/${originalFilename}`;
        await writeFile(outputPath, content, "base64");
        persistentImageUrl = `file://${outputPath}`;
      }

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
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ["journalEntries"] });
    },
  });
};
