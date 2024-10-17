import { useState } from "react";
import Login from "./components/Login/Login";
import SignUp from "./components/SignUp/SignUp";
import { AuthConfig } from "./types";
import defaultTheme from "./util/defaultTheme";

type AuthProps = {
  config: AuthConfig;
  isLoading: boolean;
  loadingComponent: React.ReactNode;
};
function Auth({ config, isLoading, loadingComponent }: AuthProps) {
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
      authWithOAuth={handlers.authWithOauth}
      setSigningUp={setSigningUp}
      oAuthProviders={oAuthProviders}
      isLoading={isLoading}
      loadingComponent={loadingComponent}
    />
  ) : (
    <Login
      theme={theme}
      authWithPassword={handlers.authWithPassword}
      authWithOAuth={handlers.authWithOauth}
      setSigningUp={setSigningUp}
      requestPasswordReset={handlers.requestPasswordReset}
      oAuthProviders={oAuthProviders}
      isLoading={isLoading}
      loadingComponent={loadingComponent}
    />
  );
}

export default Auth;
