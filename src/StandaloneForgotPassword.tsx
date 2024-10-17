import ForgotPassword from "./components/ForgotPassword/ForgotPassword";
import { AuthConfig } from "./types";
import defaultTheme from "./util/defaultTheme";

type StandaloneForgotPasswordProps = {
  config: AuthConfig;
  isLoading: boolean;
  loadingComponent: React.ReactNode;
  onSignInClick: () => void;
};
export default function StandaloneForgotPassword({
  config,
  isLoading,
  loadingComponent,
  onSignInClick,
}: StandaloneForgotPasswordProps) {
  const theme = config.theme || defaultTheme;
  const { handlers } = config;

  return (
    <ForgotPassword
      theme={theme}
      onSubmit={handlers.requestPasswordReset}
      onSignInClick={onSignInClick}
      isLoading={isLoading}
      loadingComponent={loadingComponent}
    />
  );
}
