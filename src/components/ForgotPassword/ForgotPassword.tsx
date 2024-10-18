import { useState } from "react";
import { RequestPasswordResetHandler, Theme } from "../../types";
import styles from "./ForgotPassword.module.css";
import TextInput from "../TextInput/TextInput";
import Button from "../Button/Button";
import Alert from "../Alert/Alert";

type ForgotPasswordProps = {
  theme: Theme;
  onSubmit: RequestPasswordResetHandler;
  onSignInClick: () => void;
  isLoading: boolean;
  loadingComponent: React.ReactNode;
};
export default function ForgotPassword({
  theme,
  onSubmit,
  onSignInClick,
  isLoading,
  loadingComponent,
}: ForgotPasswordProps) {
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setSuccess(false);

    const result = await onSubmit(email);
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
    <div className={styles.forgotPasswordContainer}>
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
              Password reset email sent. Check your inbox.
            </Alert>
          )}
          <form className={styles.forgotPasswordForm}>
            <TextInput
              type="email"
              label="Email"
              placeholder="you@example.com"
              accentColor={theme.accentColor}
              onChange={(value) => setEmail(value)}
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
