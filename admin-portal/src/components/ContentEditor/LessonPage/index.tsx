import Image from "next/image";
import { useEffect, useState } from "react";
import { Tooltip } from "react-tooltip";

import styles from "./styles.module.css";

import { Button } from "@/components/Button";
import { Modal } from "@/components/Modal";
import { TextInput } from "@/components/TextInput";
import { useAuth } from "@/contexts/AuthContext";
import { useContentEditor } from "@/contexts/ContentEditorContext";
import {
  Activity,
  ActivityType,
  createActivity,
  deleteActivity,
  deleteLesson,
  updateActivity,
  updateLesson,
} from "@/lib/api";

type EditingActivity = {
  isNew: boolean;
  activity: Activity;
};

const HUMAN_READABLE_QUESTION_TYPES: Record<ActivityType, string> = {
  mcq: "Multiple Choice",
  text: "Reflection",
  wwyd: "WWYD Scenario",
};

export const LessonPage = () => {
  const { user } = useAuth();
  const { allUnits, currentLesson, currentUnit, setCurrentLesson, refreshUnits } =
    useContentEditor();
  const [deleteLessonModalOpen, setDeleteLessonModalOpen] = useState(false);
  const [loadingDeleteLesson, setLoadingDeleteLesson] = useState(false);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [activityIdsToDelete, setActivityIdsToDelete] = useState<string[]>([]);
  const [activities, setActivities] = useState<EditingActivity[]>([]);
  const [addQuestionTooltipOpen, setAddQuestionTooltipOpen] = useState(false);

  const [loadingSaveLesson, setLoadingSaveLesson] = useState(false);

  useEffect(() => {
    // Whenever we start editing a new lesson, update our state
    if (!currentLesson) return;
    setTitle(currentLesson.title);
    setDescription(currentLesson.description);
    setActivityIdsToDelete([]);
    setActivities(
      currentLesson?.activities.map((activity) => ({
        isNew: false,
        activity,
      })) ?? [],
    );
  }, [currentLesson]);

  const onConfirmDelete = async () => {
    if (!user || !currentLesson) return;

    try {
      setLoadingDeleteLesson(true);
      const token = await user.getIdToken();
      await deleteLesson(token, currentLesson._id);
      setCurrentLesson(null);
      refreshUnits();
      setDeleteLessonModalOpen(false);
    } catch (error) {
      alert(`Failed to delete lesson: ${String(error)}`);
    } finally {
      setLoadingDeleteLesson(false);
    }
  };

  const onSaveChanges = async () => {
    if (!user || !currentLesson) return;

    try {
      setLoadingSaveLesson(true);
      const token = await user.getIdToken();
      await Promise.all([
        updateLesson(token, currentLesson._id, title, description),
        ...activityIdsToDelete.map((activityId) => deleteActivity(token, activityId)),
        ...activities.map(({ activity, isNew }) =>
          isNew
            ? createActivity(
                token,
                activity.type,
                activity.question,
                currentLesson._id,
                activity.type === "text" ? activity.affirmation : undefined,
                activity.type === "text" ? undefined : activity.options,
              )
            : updateActivity(
                token,
                activity._id,
                activity.question,
                activity.type === "text" ? activity.affirmation : undefined,
                activity.type === "text" ? undefined : activity.options,
              ),
        ),
      ]);
      setCurrentLesson(null);
      refreshUnits();
    } catch (error) {
      alert(`Failed to save changes: ${String(error)}`);
    } finally {
      setLoadingSaveLesson(false);
    }
  };

  return (
    <div className={styles.container}>
      {/* Header */}
      <div className={styles.header}>
        <h1 className={styles.title}>Content Editor</h1>
      </div>

      <section className={styles.section}>
        <div className={styles.unitListRow} onClick={() => setCurrentLesson(null)}>
          <Image src="/arrow_back.svg" width={18} height={18} alt="Back" />
          <h2 className={styles.sectionTitle}>Unit List</h2>
        </div>
        <div className={styles.dropdownRow}>
          <div className={styles.dropdownContainer}>
            <p className={styles.dropdownTitle}>Unit</p>
            <select
              className={styles.dropdown}
              value={currentUnit?._id}
              onChange={(e) =>
                setCurrentLesson(
                  allUnits?.find((unit) => unit._id === e.target.value)?.lessons[0] ?? null,
                )
              }
            >
              {allUnits?.map((unit) => (
                <option key={unit._id} value={unit._id}>
                  {unit.title}
                </option>
              ))}
            </select>
          </div>

          <div className={styles.dropdownContainer}>
            <p className={styles.dropdownTitle}>Lesson</p>
            <select
              className={styles.dropdown}
              value={currentLesson?._id}
              onChange={(e) =>
                setCurrentLesson(
                  allUnits
                    ?.find((unit) => unit._id === currentLesson?.unit)
                    ?.lessons?.find((lesson) => lesson._id === e.target.value) ?? null,
                )
              }
            >
              {allUnits
                ?.find((unit) => unit._id === currentLesson?.unit)
                ?.lessons.map((lesson) => (
                  <option key={lesson._id} value={lesson._id}>
                    {lesson.title}
                  </option>
                ))}
            </select>
          </div>
        </div>
      </section>

      <Button
        variant="danger"
        filled
        onClick={() => {
          setDeleteLessonModalOpen(true);
        }}
      >
        Delete Lesson
      </Button>

      <p className={styles.subsectionTitle}>Lesson Information</p>
      <div className={styles.subsectionContainer}>
        <div>
          <label htmlFor="title" className={styles.label}>
            Title
          </label>
          <TextInput
            id="title"
            value={title ?? ""}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
            placeholder="Enter Title"
          />
        </div>

        <div>
          <label htmlFor="description" className={styles.label}>
            Description
          </label>
          <TextInput
            id="description"
            value={description ?? ""}
            onChange={(e) => {
              setDescription(e.target.value);
            }}
            placeholder="Enter Description"
          />
        </div>
      </div>

      <p className={styles.subsectionTitle}>Activities</p>
      <div className={styles.subsectionContainer}>
        {activities.map(({ activity, isNew }) => (
          <div className={styles.questionContainer} key={activity._id}>
            <div className={styles.questionHeader}>
              {HUMAN_READABLE_QUESTION_TYPES[activity.type]}
              <div
                className={styles.cursorPointer}
                onClick={() => {
                  setActivityIdsToDelete([...activityIdsToDelete, activity._id]);
                  setActivities(
                    activities?.filter((curActivity) => curActivity.activity._id !== activity._id),
                  );
                }}
              >
                <Image src="/x.svg" width={16} height={16} alt="Delete" />
              </div>
            </div>

            <div>
              <label htmlFor="question" className={styles.label}>
                Question
              </label>
              <TextInput
                id="question"
                value={activity.question ?? ""}
                onChange={(e) => {
                  setActivities(
                    activities.map((curActivity) =>
                      curActivity.activity._id === activity._id
                        ? { ...curActivity, activity: { ...activity, question: e.target.value } }
                        : curActivity,
                    ),
                  );
                }}
                placeholder="Enter Question"
              />
            </div>

            {activity.type === "text" ? (
              <div>
                <label htmlFor="affirmation" className={styles.label}>
                  Affirmation
                </label>
                <TextInput
                  id="affirmation"
                  value={activity.affirmation ?? ""}
                  onChange={(e) => {
                    setActivities(
                      activities.map((curActivity) =>
                        curActivity.activity._id === activity._id
                          ? {
                              ...curActivity,
                              activity: { ...activity, affirmation: e.target.value },
                            }
                          : curActivity,
                      ),
                    );
                  }}
                  placeholder="Enter Affirmation"
                />
              </div>
            ) : (
              <>
                {activity.options?.map((option, index) => (
                  <div key={index}>
                    <div>
                      <div className={styles.row}>
                        <label htmlFor={`option ${index} content`} className={styles.label}>
                          Option {index + 1}
                        </label>
                        <div
                          className={styles.cursorPointer}
                          onClick={() => {
                            setActivities(
                              activities.map((curActivity) =>
                                curActivity.activity._id === activity._id
                                  ? {
                                      activity: {
                                        ...activity,
                                        options: activity.options?.filter((_, i) => index !== i),
                                      },
                                      isNew,
                                    }
                                  : curActivity,
                              ),
                            );
                          }}
                        >
                          <Image src="/delete.svg" width={18} height={18} alt="Delete" />
                        </div>
                      </div>
                      <TextInput
                        id={`option ${index} content`}
                        value={option.content ?? ""}
                        onChange={(e) => {
                          setActivities(
                            activities.map((curActivity) =>
                              curActivity.activity._id === activity._id
                                ? {
                                    activity: {
                                      ...activity,
                                      options: activity.options?.map((curOption, i) =>
                                        index === i
                                          ? {
                                              ...curOption,
                                              content: e.target.value,
                                            }
                                          : curOption,
                                      ),
                                    },
                                    isNew,
                                  }
                                : curActivity,
                            ),
                          );
                        }}
                        placeholder="Enter Option"
                      />
                    </div>

                    <div className={styles.feedback}>
                      <label htmlFor={`option ${index} affirmation`} className={styles.label}>
                        Feedback
                      </label>
                      <TextInput
                        id={`option ${index} affirmation`}
                        value={option.affirmation ?? ""}
                        onChange={(e) => {
                          setActivities(
                            activities.map((curActivity) =>
                              curActivity.activity._id === activity._id
                                ? {
                                    activity: {
                                      ...activity,
                                      options: activity.options?.map((curOption, i) =>
                                        index === i
                                          ? {
                                              ...curOption,
                                              affirmation: e.target.value,
                                            }
                                          : curOption,
                                      ),
                                    },
                                    isNew,
                                  }
                                : curActivity,
                            ),
                          );
                        }}
                        placeholder="Enter Feedback"
                      />
                    </div>
                  </div>
                ))}

                <Button
                  variant="primary"
                  filled
                  onClick={() => {
                    setActivities(
                      activities.map((curActivity) =>
                        curActivity.activity._id === activity._id
                          ? {
                              activity: {
                                ...activity,
                                options: [
                                  ...(activity.options ?? []),
                                  { content: "", affirmation: "" },
                                ],
                              },
                              isNew,
                            }
                          : curActivity,
                      ),
                    );
                  }}
                >
                  New Option
                </Button>
              </>
            )}
          </div>
        ))}

        <div
          className={styles.addQuestionButton}
          onClick={() => {
            setAddQuestionTooltipOpen(!addQuestionTooltipOpen);
          }}
          data-tooltip-id="question-add-tooltip"
        >
          <Image src="/add_white.svg" width={14} height={14} alt="Add" />
        </div>

        <Tooltip
          className={styles.addQuestionTooltip}
          id="question-add-tooltip"
          place="left"
          clickable
          isOpen={addQuestionTooltipOpen}
        >
          {Object.keys(HUMAN_READABLE_QUESTION_TYPES).map((questionType) => (
            <p
              className={styles.questionTypeOption}
              key={questionType}
              onClick={() => {
                setActivities([
                  ...activities,
                  {
                    isNew: true,
                    activity: {
                      type: questionType as ActivityType,
                      question: "",
                      options: [],
                      _id: crypto.randomUUID(),
                    },
                  },
                ]);
                setAddQuestionTooltipOpen(false);
              }}
            >
              {HUMAN_READABLE_QUESTION_TYPES[questionType as ActivityType]}
            </p>
          ))}
        </Tooltip>
      </div>

      <div className={styles.buttonsRow}>
        <Button filled={false} variant="primary" onClick={() => setCurrentLesson(null)}>
          Cancel
        </Button>

        <Button
          filled
          variant="primary"
          onClick={() => void onSaveChanges()}
          disabled={loadingSaveLesson}
        >
          Save Changes
        </Button>
      </div>

      <Modal
        isOpen={deleteLessonModalOpen}
        onClose={() => {
          setDeleteLessonModalOpen(false);
        }}
        title="Are You Sure You Want to Delete"
        subtitle={currentLesson?.title ?? ""}
        content={null}
        primaryButton={
          <Button
            filled
            variant="danger"
            onClick={() => void onConfirmDelete()}
            disabled={loadingDeleteLesson}
          >
            Yes, Delete
          </Button>
        }
        secondaryButton={
          <Button
            filled={false}
            variant="danger"
            onClick={() => {
              setDeleteLessonModalOpen(false);
            }}
          >
            No, Cancel
          </Button>
        }
      />
    </div>
  );
};
