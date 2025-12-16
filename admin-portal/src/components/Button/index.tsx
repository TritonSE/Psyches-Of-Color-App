import { ComponentProps } from "react";

import styles from "./styles.module.css";

type ButtonProps = {
  filled: boolean;
  variant: "primary" | "danger";
} & ComponentProps<"button">;

export const Button = ({ filled, variant, ...props }: ButtonProps) => {
  const extraClass = filled
    ? variant === "primary"
      ? styles.primaryFilled
      : styles.dangerFilled
    : variant === "primary"
      ? styles.primaryOutlined
      : styles.dangerOutlined;

  return <button className={`${styles.button} ${extraClass}`} {...props} />;
};
