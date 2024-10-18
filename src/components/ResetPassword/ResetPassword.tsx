import { useState } from "react";
import { AuthConfig } from "../../types";
import Alert from "../Alert/Alert";
import styles from "./ResetPassword.module.css";
import TextInput from "../TextInput/TextInput";
import Button from "../Button/Button";
import defaultTheme from "../../util/defaultTheme";

interface ResetPasswordProps {
  config: AuthConfig;
  isLoading: boolean;
  loadingComponent: React.ReactNode;
  onSignInClick: () => void;
}
export default function ResetPassword({
  config,
  isLoading,
  loadingComponent,
  onSignInClick,
}: ResetPasswordProps) {
  const theme = config.theme || defaultTheme;
  const { handlers } = config;

  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (!handlers.resetPassword) {
      setError("Reset password functionality is not enabled.");
      return;
    }

    if (password !== passwordConfirm) {
      setError("Passwords do not match");
      return;
    }

    const result = await handlers.resetPassword(password);
    if (result.success) {
      setSuccess(true);
    } else {
      if (result.error) {
        setError(result.error);
      } else {
        setError("An error occurred. Please try again later.");
      }
    }
  }

  return (
    <div className={styles.resetPasswordContainer}>
      {isLoading ? (
        loadingComponent
      ) : (
        <>
          {error && (
            <Alert
              type="error"
              style={{
                marginBottom: "2em",
                width: "100%",
                paddingLeft: 0,
                paddingRight: 0,
              }}
            >
              {error}
            </Alert>
          )}
          {success && (
            <Alert
              type="success"
              style={{
                marginBottom: "2em",
                width: "100%",
                paddingLeft: 0,
                paddingRight: 0,
              }}
            >
              Password reset successfully. You can now sign in with your new
              password.
            </Alert>
          )}
          <form className={styles.resetPasswordForm}>
            <TextInput
              type="password"
              label="New Password"
              placeholder="New Password"
              accentColor={theme.accentColor}
              onChange={(value) => setPassword(value)}
            />
            <TextInput
              type="password"
              label="Confirm Password"
              placeholder="Confirm Password"
              accentColor={theme.accentColor}
              onChange={(value) => setPasswordConfirm(value)}
            />
            <Button theme={theme} onClick={handleSubmit}>
              Reset Password
            </Button>
          </form>
          <span className={styles.signInPrompt} onClick={onSignInClick}>
            Back to log in
          </span>
        </>
      )}
    </div>
  );
}
