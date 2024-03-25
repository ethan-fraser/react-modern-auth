import { useState } from "react";
import Login from "./components/Login/Login";
import SignUp from "./components/SignUp/SignUp";
import { AuthConfig, Theme } from "./types";

const defaultTheme: Theme = {
  primaryColor: "#006af9",
  accentColor: "#007bff",
};

type AuthProps = {
  config: AuthConfig;
};
function Auth({ config }: AuthProps) {
  const [signingUp, setSigningUp] = useState(false);
  const theme = config.theme || defaultTheme;
  const { signUpFields, enableSignUpValidation, oAuthProviders, handlers } =
    config;

  return signingUp ? (
    <SignUp
      theme={theme}
      enableValidation={enableSignUpValidation || false}
      fields={signUpFields}
      handleSignUp={handlers.signUp}
      setSigningUp={setSigningUp}
    />
  ) : (
    <Login
      theme={theme}
      authWithPassword={handlers.authWithPassword}
      authWithOAuth={handlers.authWithOauth}
      setSigningUp={setSigningUp}
      requestPasswordReset={handlers.requestPasswordReset}
      oAuthProviders={oAuthProviders}
    />
  );
}

export default Auth;
