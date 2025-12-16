"use client";

import { ContentEditorHomePage } from "@/components/ContentEditor/HomePage";
import { LessonPage } from "@/components/ContentEditor/LessonPage";
import { useContentEditor } from "@/contexts/ContentEditorContext";

export default function EditorPage() {
  const { currentLesson } = useContentEditor();
  if (currentLesson) {
    return <LessonPage />;
  } else {
    return <ContentEditorHomePage />;
  }
}
