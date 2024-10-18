import styles from "./Alert.module.css";
import exclamationMark from "../../assets/exclamation-mark.svg";
import check from "../../assets/check.svg";
import { CSSProperties } from "react";

type AlertProps = {
  type: "error" | "success";
  children: string;
  style?: CSSProperties;
};
export default function Alert({ type, children, style }: AlertProps) {
  return (
    <div
      className={`${styles.alert} ${
        type === "error" ? styles.error : styles.success
      }`}
      style={style}
    >
      <img
        src={type === "error" ? exclamationMark : check}
        alt={type === "error" ? "Exclamation mark" : "Check mark"}
      />
      {children}
    </div>
  );
}
