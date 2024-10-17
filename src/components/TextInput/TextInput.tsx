import { useState } from "react";
import styles from "./TextInput.module.css";
import eye from "../../assets/eye.svg";
import eyeSlash from "../../assets/eye-slash.svg";
import exclamationMark from "../../assets/exclamation-mark.svg";

type TextInputProps = {
  type?: "text" | "email" | "password";
  label: string;
  placeholder: string;
  error?: string;
  accentColor: string;
  required?: boolean;
  onChange: (value: string) => void;
};
function TextInput({
  type = "text",
  label,
  placeholder,
  error,
  accentColor,
  required = false,
  onChange,
}: TextInputProps) {
  const [value, setValue] = useState("");
  const [passwordVisisble, setPasswordVisible] = useState(false);

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setValue(event.target.value);
    onChange(event.target.value);
  }

  // Applying accent color as CSS variable requires type manipulation
  const inputStyle: React.CSSProperties & { "--accent-color": string } = {
    "--accent-color": accentColor,
  };

  return (
    <div className={styles.inputContainer}>
      <div className={styles.labelContainer}>
        <span className={styles.label}>
          {label}
          {required && <span className={styles.required}>*</span>}
        </span>
        {error && (
          <div className={styles.errorMessage}>
            {error}
            <img src={exclamationMark} alt="Exclamation mark" />
          </div>
        )}
      </div>
      <div className={styles.textInputContainer}>
        <input
          className={`${styles.textInput} ${error ? styles.erroredInput : ""}`}
          style={inputStyle}
          name={type}
          type={passwordVisisble ? "text" : type}
          placeholder={placeholder}
          value={value}
          onChange={handleChange}
        />
        {type === "password" && (
          <img
            src={passwordVisisble ? eye : eyeSlash}
            className={styles.eyeIcon}
            onClick={() => setPasswordVisible(!passwordVisisble)}
            alt={passwordVisisble ? "Hide password" : "Show password"}
          />
        )}
      </div>
    </div>
  );
}

export default TextInput;
