"use client";

import { useState } from "react";

import styles from "./styles.module.css";

import { Button } from "@/components/Button";
import { UnitDropdown } from "@/components/ContentEditor/UnitDropdown";
import { Modal } from "@/components/Modal";
import { TextInput } from "@/components/TextInput";
import { useAuth } from "@/contexts/AuthContext";
import { useContentEditor } from "@/contexts/ContentEditorContext";
import { createUnit } from "@/lib/api";

export const ContentEditorHomePage = () => {
  const { user } = useAuth();
  const { refreshUnits } = useContentEditor();
  const { loading, error, allUnits } = useContentEditor();
  const [addUnitModalOpen, setAddUnitModalOpen] = useState(false);
  const [newUnitTitle, setNewUnitTitle] = useState("");
  const [loadingCreateUnit, setLoadingCreateUnit] = useState(false);

  const onCreateUnit = async () => {
    if (!newUnitTitle || !user) return;

    try {
      setLoadingCreateUnit(true);
      const token = await user.getIdToken();
      await createUnit(token, newUnitTitle);
      refreshUnits();
      setAddUnitModalOpen(false);
      setNewUnitTitle("");
    } catch (errorMessage) {
      alert(`Failed to create unit: ${String(errorMessage)}`);
    } finally {
      setLoadingCreateUnit(false);
    }
  };

  if (loading) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.spinner}></div>
        <p>Loading units...</p>
      </div>
    );
  }

  if (error ?? !allUnits) {
    return (
      <div className={styles.errorContainer}>
        <p>{error ?? "Failed to load units"}</p>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      {/* Header */}
      <div className={styles.header}>
        <h1 className={styles.title}>Content Editor</h1>
      </div>

      <section className={styles.section}>
        <div className={styles.unitListRow}>
          <h2 className={styles.sectionTitle}>Unit List</h2>
          <Button
            filled
            variant="primary"
            onClick={() => {
              setAddUnitModalOpen(true);
            }}
          >
            Add Unit
          </Button>
        </div>
        <div className={styles.unitsContainer}>
          {allUnits.map((unit) => (
            <UnitDropdown key={unit._id} unit={unit} />
          ))}
        </div>
      </section>
      <Modal
        isOpen={addUnitModalOpen}
        onClose={() => {
          setAddUnitModalOpen(false);
        }}
        title="Create New Unit"
        subtitle="Enter Unit Title"
        content={
          <TextInput
            value={newUnitTitle}
            onChange={(e) => {
              setNewUnitTitle(e.target.value);
            }}
            placeholder="Enter Title"
          />
        }
        primaryButton={
          <Button
            filled
            variant="primary"
            onClick={() => void onCreateUnit()}
            disabled={loadingCreateUnit}
          >
            Create Unit
          </Button>
        }
        secondaryButton={
          <Button
            filled={false}
            variant="primary"
            onClick={() => {
              setAddUnitModalOpen(false);
            }}
          >
            Cancel
          </Button>
        }
      />
    </div>
  );
};
