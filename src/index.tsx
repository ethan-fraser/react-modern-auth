import ReactModernAuth from "./ReactModernAuth";
import Login from "./components/Login/StandaloneLogin";
import SignUp from "./components/SignUp/StandaloneSignUp";
import ForgotPassword from "./components/ForgotPassword/StandaloneForgotPassword";
import ResetPassword from "./components/ResetPassword/ResetPassword";
import {
  Theme,
  AuthErrorType,
  AuthError,
  AuthResponse,
  OptionalSignUpData,
  RequiredSignUpData,
  SignUpData,
  AvatarField,
  TermsAcceptedField,
  TextFieldType,
  TextField,
  SignUpField,
  SignUpFields,
  FieldChangeHandlers,
  SignUpErrorType,
  SignUpError,
  SignUpResponse,
  OAuthProvider,
  OAuthProviders,
  SignUpHandler,
  AuthWithPasswordHandler,
  AuthWithOAuthHandler,
  RequestPasswordResetHandler,
  AuthConfig,
} from "./types";

export { ReactModernAuth, Login, SignUp, ForgotPassword, ResetPassword };
export type {
  Theme,
  AuthErrorType,
  AuthError,
  AuthResponse,
  OptionalSignUpData,
  RequiredSignUpData,
  SignUpData,
  AvatarField,
  TermsAcceptedField,
  TextFieldType,
  TextField,
  SignUpField,
  SignUpFields,
  FieldChangeHandlers,
  SignUpErrorType,
  SignUpError,
  SignUpResponse,
  OAuthProvider,
  OAuthProviders,
  SignUpHandler,
  AuthWithPasswordHandler,
  AuthWithOAuthHandler,
  RequestPasswordResetHandler,
  AuthConfig,
};
