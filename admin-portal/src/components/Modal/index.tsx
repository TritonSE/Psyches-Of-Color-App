import Image from "next/image";
import { ReactNode } from "react";

import styles from "./styles.module.css";

type ModalProps = {
  isOpen: boolean;
  onClose: () => unknown;
  title: string;
  subtitle: string;
  content: ReactNode;
  primaryButton: ReactNode;
  secondaryButton: ReactNode;
};

export const Modal = ({
  isOpen,
  onClose,
  title,
  subtitle,
  content,
  primaryButton,
  secondaryButton,
}: ModalProps) => {
  return isOpen ? (
    <div className={styles.backdrop}>
      <div className={styles.root}>
        <p className={styles.title}>{title}</p>
        <p className={styles.subtitle}>{subtitle}</p>
        {content}
        <div className={styles.buttonsRow}>
          {secondaryButton}
          {primaryButton}
        </div>
        <div className={styles.close} onClick={onClose}>
          <Image src="/x.svg" width={12} height={12} alt="X" />
        </div>
      </div>
    </div>
  ) : null;
};
