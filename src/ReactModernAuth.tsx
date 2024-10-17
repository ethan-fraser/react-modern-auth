import { useState } from "react";
import Login from "./components/Login/Login";
import SignUp from "./components/SignUp/SignUp";
import ForgotPassword from "./components/ForgotPassword/ForgotPassword";
import { AuthConfig } from "./types";
import defaultTheme from "./util/defaultTheme";

type AuthProps = {
  config: AuthConfig;
  isLoading: boolean;
  loadingComponent: React.ReactNode;
};
function Auth({ config, isLoading, loadingComponent }: AuthProps) {
  const [signingUp, setSigningUp] = useState(false);
  const [forgotPassword, setForgotPassword] = useState(false);
  const theme = config.theme || defaultTheme;
  const { signUpFields, enableSignUpValidation, oAuthProviders, handlers } =
    config;

  function handleForgotPasswordClick() {
    setForgotPassword(true);
    setSigningUp(false);
  }

  function handleSignUpClick() {
    setSigningUp(true);
    setForgotPassword(false);
  }

  function handleSignInClick() {
    setSigningUp(false);
    setForgotPassword(false);
  }

  return forgotPassword ? (
    <ForgotPassword
      theme={theme}
      onSubmit={handlers.requestPasswordReset}
      onSignInClick={handleSignInClick}
      isLoading={isLoading}
      loadingComponent={loadingComponent}
    />
  ) : signingUp ? (
    <SignUp
      theme={theme}
      enableValidation={enableSignUpValidation || false}
      fields={signUpFields}
      handleSignUp={handlers.signUp}
      authWithOAuth={handlers.authWithOauth}
      onSignInClick={handleSignInClick}
      oAuthProviders={oAuthProviders}
      isLoading={isLoading}
      loadingComponent={loadingComponent}
    />
  ) : (
    <Login
      theme={theme}
      authWithPassword={handlers.authWithPassword}
      authWithOAuth={handlers.authWithOauth}
      onSignUpClick={handleSignUpClick}
      onForgotPasswordClick={handleForgotPasswordClick}
      oAuthProviders={oAuthProviders}
      isLoading={isLoading}
      loadingComponent={loadingComponent}
    />
  );
}

export default Auth;
