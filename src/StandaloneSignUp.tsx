import SignUp from "./components/SignUp/SignUp";
import { AuthConfig } from "./types";
import defaultTheme from "./util/defaultTheme";

type StandaloneSignUpProps = {
  config: AuthConfig;
  isLoading: boolean;
  loadingComponent: React.ReactNode;
  onSignInClick: () => void;
};
export default function StandaloneSignUp({
  config,
  isLoading,
  loadingComponent,
  onSignInClick,
}: StandaloneSignUpProps) {
  const theme = config.theme || defaultTheme;
  const { signUpFields, enableSignUpValidation, oAuthProviders, handlers } =
    config;

  return (
    <SignUp
      theme={theme}
      enableValidation={enableSignUpValidation || false}
      fields={signUpFields}
      handleSignUp={handlers.signUp}
      authWithOAuth={handlers.authWithOauth}
      setSigningUp={() => onSignInClick()}
      oAuthProviders={oAuthProviders}
      isLoading={isLoading}
      loadingComponent={loadingComponent}
    />
  );
}
