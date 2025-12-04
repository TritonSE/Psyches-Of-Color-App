import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { DocumentDirectoryPath, readFile, writeFile } from "react-native-fs";

import { useAuth } from "@/contexts/userContext";
import { JournalEntry } from "@/types";
import env from "@/util/validateEnv";

const persistImageToDocumentsDir = async (imageUrl: string): Promise<string> => {
  const normalizedPath = imageUrl.replace("file://", "");
  const content = await readFile(normalizedPath, "base64");
  const pathParts = normalizedPath.split("/");
  const originalFilename = pathParts[pathParts.length - 1];
  const outputPath = `${DocumentDirectoryPath}/${originalFilename}`;

  await writeFile(outputPath, content, "base64");

  return `file://${outputPath}`;
};

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
        persistentImageUrl = await persistImageToDocumentsDir(imageUrl);
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

export const useUpdateJournalEntry = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      idToken,
      id,
      title,
      paragraph,
      imageUrl,
    }: {
      idToken: string;
      id: string;
      title: string;
      paragraph: string;
      imageUrl?: string | null;
    }) => {
      let persistentImageUrl: string | undefined = undefined;

      if (imageUrl) {
        // If it's already a persistent file in DocumentDirectoryPath, reuse it
        const isAlreadyPersistent =
          imageUrl.startsWith("file://") && imageUrl.includes(DocumentDirectoryPath);

        if (isAlreadyPersistent) {
          persistentImageUrl = imageUrl;
        } else {
          persistentImageUrl = await persistImageToDocumentsDir(imageUrl);
        }
      }

      const response = await fetch(`${env.EXPO_PUBLIC_BACKEND_URI}/api/journalEntries/${id}`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${idToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          paragraph,
          imageUrl: persistentImageUrl,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status.toString()}`);
      }

      return (await response.json()) as JournalEntry;
    },
    onSuccess: () => {
      // Refetch lists so UI shows updated entry
      void queryClient.invalidateQueries({ queryKey: ["journalEntries"] });
    },
  });
};
