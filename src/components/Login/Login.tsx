import { useState } from "react";
import styles from "./Login.module.css";
import TextInput from "../TextInput/TextInput";
import Button from "../Button/Button";
import { AuthError, AuthResponse, OAuthProviders, Theme } from "../../types";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import FormHeader from "../FormHeader/FormHeader";

type LoginProps = {
  theme: Theme;
  authWithPassword?: (email: string, password: string) => Promise<AuthResponse>;
  authWithOAuth?: (provider: string) => Promise<AuthResponse>;
  requestPasswordReset?: () => void;
  setSigningUp: (signingUp: boolean) => void;
  oAuthProviders?: OAuthProviders;
  isLoading: boolean;
  loadingComponent: React.ReactNode;
};
function Login({
  theme,
  authWithPassword,
  authWithOAuth,
  requestPasswordReset,
  setSigningUp,
  oAuthProviders,
  isLoading,
  loadingComponent,
}: LoginProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<AuthError | null>(null);

  // Applying theme as CSS variables requires type manipulation
  const themeStyle: React.CSSProperties & { "--accent-color": string } = {
    "--accent-color": theme.accentColor,
  };

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    if (authWithPassword) {
      const result = await authWithPassword(email, password);
      if (!result.success && result.error) {
        setError(result.error);
      }
    } else {
      console.error("No password authentication method provided");
    }
  }

  async function handleLoginWithOAuth(provider: string) {
    if (authWithOAuth) {
      const result = await authWithOAuth(provider);
      if (!result.success && result.error) {
        setError(result.error);
      }
    } else {
      console.error("No oAuth authentication method provided");
    }
  }

  return (
    <div className={styles.loginContainer}>
      {isLoading ? (
        loadingComponent
      ) : (
        <>
          <FormHeader>Sign In</FormHeader>
          {error && error.type === "general" && (
            <ErrorMessage
              style={{
                marginBottom: "2em",
                width: "100%",
                paddingLeft: 0,
                paddingRight: 0,
              }}
            >
              {error.message}
            </ErrorMessage>
          )}
          <form className={styles.loginForm}>
            <TextInput
              type="email"
              label="Email"
              placeholder="you@example.com"
              accentColor={theme.accentColor}
              error={error && error.type === "identity" ? error.message : ""}
              onChange={(value) => setEmail(value)}
            />
            <TextInput
              type="password"
              label="Password"
              placeholder="Password"
              accentColor={theme.accentColor}
              error={error && error.type === "password" ? error.message : ""}
              onChange={(value) => setPassword(value)}
            />
            <span
              className={styles.forgotPasswordText}
              onClick={requestPasswordReset}
            >
              Forgot password?
            </span>
            <Button theme={theme} onClick={handleLogin}>
              Log In
            </Button>
          </form>
          {oAuthProviders && (
            <div className={styles.oAuthContainer}>
              <em className={styles.oAuthBreak}>or</em>
              <div className={styles.oAuthProviderContainer}>
                {oAuthProviders.map((oAuthProvider) => (
                  <div
                    key={oAuthProvider.name}
                    className={styles.oAuthProvider}
                    style={themeStyle}
                    onClick={() => handleLoginWithOAuth(oAuthProvider.name)}
                  >
                    <img src={oAuthProvider.logoSrc} alt={oAuthProvider.name} />
                  </div>
                ))}
              </div>
            </div>
          )}
          <span className={styles.signUpPrompt}>
            Don't have an account?{" "}
            <b className={styles.signUpText} onClick={() => setSigningUp(true)}>
              Sign up
            </b>
          </span>
        </>
      )}
    </div>
  );
}

export default Login;
