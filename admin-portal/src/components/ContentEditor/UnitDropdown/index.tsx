import Image from "next/image";
import { useState } from "react";
import { Tooltip } from "react-tooltip";

import { Button } from "../../Button";
import { Modal } from "../../Modal";
import { TextInput } from "../../TextInput";

import styles from "./styles.module.css";

import { useAuth } from "@/contexts/AuthContext";
import { useContentEditor } from "@/contexts/ContentEditorContext";
import { Unit, createLesson, deleteUnit, updateLesson, updateUnit } from "@/lib/api";

type UnitDropdownProps = {
  unit: Unit;
};

export const UnitDropdown = ({ unit }: UnitDropdownProps) => {
  const { user } = useAuth();
  const { allUnits, setCurrentLesson, refreshUnits } = useContentEditor();
  const [menuTooltipOpen, setMenuTooltipOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [loadingDeleteUnit, setLoadingDeleteUnit] = useState(false);

  const [updatedUnitTitle, setUpdatedUnitTitle] = useState(unit.title);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [loadingEditUnit, setLoadingEditUnit] = useState(false);

  const [newLessonTitle, setNewLessonTitle] = useState("");
  const [newLessonDescription, setNewLessonDescription] = useState("");
  const [addLessonModalOpen, setAddLessonModalOpen] = useState(false);
  const [loadingAddLesson, setLoadingAddLesson] = useState(false);

  const onConfirmDelete = async () => {
    if (!user) return;

    try {
      setLoadingDeleteUnit(true);
      const token = await user.getIdToken();
      await deleteUnit(token, unit._id);
      refreshUnits();
      setDeleteModalOpen(false);
    } catch (error) {
      alert(`Failed to delete unit: ${String(error)}`);
    } finally {
      setLoadingDeleteUnit(false);
    }
  };

  const onSaveEdits = async () => {
    if (!user || !updatedUnitTitle) return;

    try {
      setLoadingEditUnit(true);
      const token = await user.getIdToken();
      await updateUnit(token, unit._id, updatedUnitTitle);
      refreshUnits();
      setEditModalOpen(false);
    } catch (error) {
      alert(`Failed to update unit: ${String(error)}`);
    } finally {
      setLoadingEditUnit(false);
    }
  };

  const onCreateLesson = async () => {
    if (!user || !newLessonTitle || !newLessonDescription) return;

    try {
      setLoadingAddLesson(true);
      const token = await user.getIdToken();
      const newLesson = await createLesson(token, newLessonTitle, newLessonDescription, unit._id);
      refreshUnits();
      setAddLessonModalOpen(false);
      setCurrentLesson(newLesson);
    } catch (error) {
      alert(`Failed to create lesson: ${String(error)}`);
    } finally {
      setLoadingAddLesson(false);
    }
  };

  return (
    <div className={styles.root}>
      <div className={styles.header}>
        <div className={styles.closeRow}>
          <div
            className={styles.buttonContainer}
            onClick={() =>
              void (async () => {
                // Move this unit earlier
                const unitIndex = allUnits?.map((curUnit) => curUnit._id).indexOf(unit._id);
                if (!user || !allUnits || unitIndex === undefined || unitIndex === 0) return;

                const token = await user.getIdToken();
                await Promise.all([
                  updateUnit(token, unit._id, undefined, (unit.order ?? 1) - 1),
                  updateUnit(token, allUnits[unitIndex - 1]._id, undefined, unit.order),
                ]);
                refreshUnits();
              })()
            }
          >
            <Image src="/up_arrow.svg" width={18} height={18} alt="Up" />
          </div>

          <div
            className={styles.buttonContainer}
            onClick={() =>
              void (async () => {
                // Move this unit later
                const unitIndex = allUnits?.map((curUnit) => curUnit._id).indexOf(unit._id);
                if (
                  !user ||
                  !allUnits ||
                  unitIndex === undefined ||
                  unitIndex === allUnits.length - 1
                )
                  return;

                const token = await user.getIdToken();
                await Promise.all([
                  updateUnit(token, unit._id, undefined, (unit.order ?? allUnits.length - 2) + 1),
                  updateUnit(token, allUnits[unitIndex + 1]._id, undefined, unit.order),
                ]);
                refreshUnits();
              })()
            }
          >
            <Image src="/down_arrow.svg" width={18} height={18} alt="Down" />
          </div>
          <p className={styles.title}>{unit.title}</p>
        </div>
        <div className={styles.closeRow}>
          <div
            className={styles.buttonContainer}
            data-tooltip-id={`unit-add-tooltip-${unit._id}`}
            onClick={() => {
              setAddLessonModalOpen(true);
            }}
          >
            <Image src="/add.svg" width={18} height={18} alt="Add" />
          </div>
          <Tooltip
            id={`unit-add-tooltip-${unit._id}`}
            place="bottom"
            variant="success"
            content="Add Lesson"
          />

          <div
            className={styles.buttonContainer}
            data-tooltip-id={`unit-menu-tooltip-${unit._id}`}
            onClick={() => {
              setMenuTooltipOpen((open) => !open);
            }}
          >
            <Image src="/menu.svg" width={24} height={24} alt="Menu" />
          </div>

          <Tooltip
            className={styles.menuTooltipRoot}
            id={`unit-menu-tooltip-${unit._id}`}
            place="bottom"
            clickable
            isOpen={menuTooltipOpen}
          >
            <div
              className={styles.menuTooltipRow}
              onClick={() => {
                setEditModalOpen(true);
              }}
            >
              <Image src="/pencil.svg" width={20} height={20} alt="Pencil" />
              <p className={styles.menuTooltipText}>Edit Title</p>
            </div>
            <div
              className={styles.menuTooltipRow}
              onClick={() => {
                setDeleteModalOpen(true);
              }}
            >
              <Image src="/delete.svg" width={20} height={20} alt="Delete" />
              <p className={styles.menuTooltipText}>Delete Unit</p>
            </div>
          </Tooltip>
        </div>
      </div>
      {unit.lessons.map((lesson) => (
        <div className={styles.bodyItem} key={lesson._id} onClick={() => setCurrentLesson(lesson)}>
          <div
            className={styles.buttonContainer}
            onClick={(e) => {
              // Move this lesson earlier
              e.stopPropagation();

              void (async () => {
                const lessonIndex = unit.lessons
                  .map((curLesson) => curLesson._id)
                  .indexOf(lesson._id);

                if (!user || lessonIndex === 0) return;

                const token = await user.getIdToken();
                await Promise.all([
                  updateLesson(token, lesson._id, undefined, undefined, (lesson.order ?? 1) - 1),
                  updateLesson(
                    token,
                    unit.lessons[lessonIndex - 1]._id,
                    undefined,
                    undefined,
                    lesson.order,
                  ),
                ]);
                refreshUnits();
              })();
            }}
          >
            <Image src="/up_arrow.svg" width={18} height={18} alt="Up" />
          </div>

          <div
            className={styles.buttonContainer}
            onClick={(e) => {
              // Move this lesson later
              e.stopPropagation();

              void (async () => {
                const lessonIndex = unit.lessons
                  .map((curLesson) => curLesson._id)
                  .indexOf(lesson._id);

                if (!user || lessonIndex === unit.lessons.length - 1) return;

                const token = await user.getIdToken();
                await Promise.all([
                  updateLesson(
                    token,
                    lesson._id,
                    undefined,
                    undefined,
                    (lesson.order ?? unit.lessons.length - 2) + 1,
                  ),
                  updateLesson(
                    token,
                    unit.lessons[lessonIndex + 1]._id,
                    undefined,
                    undefined,
                    lesson.order,
                  ),
                ]);
                refreshUnits();
              })();
            }}
          >
            <Image src="/down_arrow.svg" width={18} height={18} alt="Down" />
          </div>

          <p className={styles.bodyText}>{lesson.title}</p>
        </div>
      ))}
      <Modal
        isOpen={deleteModalOpen}
        onClose={() => {
          setDeleteModalOpen(false);
        }}
        title="Are You Sure You Want to Delete"
        subtitle={unit.title}
        content={
          unit.lessons.length > 0 ? (
            <div className={styles.confirmDeleteText}>
              You will also be deleting:
              <ul>
                {unit.lessons.map((lesson) => (
                  <li key={lesson._id}>{lesson.title}</li>
                ))}
              </ul>
            </div>
          ) : null
        }
        primaryButton={
          <Button
            filled
            variant="danger"
            onClick={() => void onConfirmDelete()}
            disabled={loadingDeleteUnit}
          >
            Yes, Delete
          </Button>
        }
        secondaryButton={
          <Button
            filled={false}
            variant="danger"
            onClick={() => {
              setDeleteModalOpen(false);
            }}
          >
            No, Cancel
          </Button>
        }
      />

      <Modal
        isOpen={editModalOpen}
        onClose={() => {
          setEditModalOpen(false);
        }}
        title="Edit Unit Title"
        subtitle="Enter New Title"
        content={
          <TextInput
            value={updatedUnitTitle}
            onChange={(e) => {
              setUpdatedUnitTitle(e.target.value);
            }}
            placeholder="Enter Title"
          />
        }
        primaryButton={
          <Button
            filled
            variant="primary"
            onClick={() => void onSaveEdits()}
            disabled={loadingEditUnit}
          >
            Save
          </Button>
        }
        secondaryButton={
          <Button
            filled={false}
            variant="primary"
            onClick={() => {
              setEditModalOpen(false);
            }}
          >
            Cancel
          </Button>
        }
      />

      <Modal
        isOpen={addLessonModalOpen}
        onClose={() => {
          setAddLessonModalOpen(false);
        }}
        title="Create New Lesson"
        subtitle="Enter Lesson Title & Description"
        content={
          <div className={styles.newLessonModalContainer}>
            <TextInput
              value={newLessonTitle}
              onChange={(e) => {
                setNewLessonTitle(e.target.value);
              }}
              placeholder="Enter Title"
            />
            <TextInput
              value={newLessonDescription}
              onChange={(e) => {
                setNewLessonDescription(e.target.value);
              }}
              placeholder="Enter Description"
            />
            <p className={styles.newLessonBodyText}>
              This lesson will be created in the <strong>{unit.title}</strong> unit.
            </p>
          </div>
        }
        primaryButton={
          <Button
            filled
            variant="primary"
            onClick={() => void onCreateLesson()}
            disabled={loadingAddLesson}
          >
            Create Lesson
          </Button>
        }
        secondaryButton={
          <Button
            filled={false}
            variant="primary"
            onClick={() => {
              setAddLessonModalOpen(false);
            }}
          >
            Cancel
          </Button>
        }
      />
    </div>
  );
};
