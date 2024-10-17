import Login from "./components/Login/Login";
import { AuthConfig } from "./types";
import defaultTheme from "./util/defaultTheme";

type StandaloneLoginProps = {
  config: AuthConfig;
  isLoading: boolean;
  loadingComponent: React.ReactNode;
  onSignUpClick: () => void;
  onForgotPasswordClick: () => void;
};
export default function StandaloneSignIn({
  config,
  isLoading,
  loadingComponent,
  onSignUpClick,
  onForgotPasswordClick,
}: StandaloneLoginProps) {
  const theme = config.theme || defaultTheme;
  const { oAuthProviders, handlers } = config;
  return (
    <Login
      theme={theme}
      authWithPassword={handlers.authWithPassword}
      authWithOAuth={handlers.authWithOauth}
      onSignUpClick={onSignUpClick}
      onForgotPasswordClick={onForgotPasswordClick}
      oAuthProviders={oAuthProviders}
      isLoading={isLoading}
      loadingComponent={loadingComponent}
    />
  );
}
