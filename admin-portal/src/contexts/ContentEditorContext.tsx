"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";

import { useAuth } from "./AuthContext";

import { Lesson, Unit, fetchAllUnits } from "@/lib/api";

type ContentEditorContextType = {
  allUnits: Unit[] | null;
  loading: boolean;
  error: string | null;
  refreshUnits: () => unknown;
  currentLesson: Lesson | null;
  setCurrentLesson: (newLesson: Lesson | null) => unknown;
  currentUnit: Unit | null;
};

const ContentEditorContext = createContext<ContentEditorContextType | undefined>(undefined);

export function ContextEditorProvider({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  const [allUnits, setAllUnits] = useState<Unit[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentLesson, setCurrentLesson] = useState<Lesson | null>(null);

  const currentUnit = useMemo(
    () => allUnits?.find((unit) => unit._id === currentLesson?.unit) ?? null,
    [allUnits, currentLesson],
  );

  const refreshUnits = async () => {
    if (!user) return;

    try {
      setLoading(true);
      const token = await user.getIdToken();
      const data = await fetchAllUnits(token);
      setAllUnits(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load units");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void refreshUnits();
  }, [user]);

  return (
    <ContentEditorContext.Provider
      value={{
        allUnits,
        loading,
        error,
        refreshUnits,
        currentLesson,
        setCurrentLesson,
        currentUnit,
      }}
    >
      {children}
    </ContentEditorContext.Provider>
  );
}

export function useContentEditor() {
  const context = useContext(ContentEditorContext);
  if (context === undefined) {
    throw new Error("useContentEditor must be used within a ContentEditorContext");
  }
  return context;
}
