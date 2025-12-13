import { ComponentProps } from "react";

import styles from "./styles.module.css";

/**
 * Wrapper around HTML <input> element that provides our custom styles
 */
export const TextInput = (props: ComponentProps<"input">) => {
  return <input className={styles.input} {...props} />;
};
