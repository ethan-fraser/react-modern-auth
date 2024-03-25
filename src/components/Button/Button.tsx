import { Theme } from "../../types";
import styles from "./Button.module.css";

type ButtonProps = {
  theme: Theme;
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
  secondary?: boolean;
  children?: React.ReactNode;
};
function Button({ theme, onClick, secondary = false, children }: ButtonProps) {
  // Applying theme as CSS variables requires type manipulation
  const buttonStyle: React.CSSProperties & {
    "--primary-color": string;
    "--accent-color": string;
  } = {
    "--primary-color": theme.primaryColor,
    "--accent-color": theme.accentColor,
  };

  return (
    <button
      onClick={onClick}
      className={`${styles.button} ${
        secondary ? styles.secondary : styles.primary
      }`}
      style={buttonStyle}
    >
      {children}
    </button>
  );
}

export default Button;
