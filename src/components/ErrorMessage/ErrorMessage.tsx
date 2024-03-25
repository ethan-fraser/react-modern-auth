import styles from "./ErrorMessage.module.css";
import exclamationMark from "../../assets/exclamation-mark.svg";
import { CSSProperties } from "react";

type ErrorMessageProps = {
  children: string;
  style?: CSSProperties;
};
function ErrorMessage({ children, style }: ErrorMessageProps) {
  return (
    <div className={styles.errorMessage} style={style}>
      <img src={exclamationMark} alt="Exclamation mark" />
      {children}
    </div>
  );
}

export default ErrorMessage;
