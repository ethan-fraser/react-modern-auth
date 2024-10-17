import Login from "./components/Login/Login";
import { AuthConfig } from "./types";
import defaultTheme from "./util/defaultTheme";

type StandaloneLoginProps = {
  config: AuthConfig;
  isLoading: boolean;
  loadingComponent: React.ReactNode;
  onSignUpClick: () => void;
};
export default function StandaloneSignIn({
  config,
  isLoading,
  loadingComponent,
  onSignUpClick,
}: StandaloneLoginProps) {
  const theme = config.theme || defaultTheme;
  const { oAuthProviders, handlers } = config;
  return (
    <Login
      theme={theme}
      authWithPassword={handlers.authWithPassword}
      authWithOAuth={handlers.authWithOauth}
      setSigningUp={onSignUpClick}
      requestPasswordReset={handlers.requestPasswordReset}
      oAuthProviders={oAuthProviders}
      isLoading={isLoading}
      loadingComponent={loadingComponent}
    />
  );
}
