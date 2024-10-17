export type Theme = {
  primaryColor: string;
  accentColor: string;
};

// Authentication
export type AuthErrorType = "identity" | "password" | "general";
export type AuthError = {
  type: AuthErrorType;
  message: string;
};
export type AuthResponse = {
  success: boolean;
  error?: AuthError;
};

// Sign up data
export type OptionalSignUpData = {
  email?: string;
  firstName?: string;
  lastName?: string;
  name?: string;
  username?: string;
  avatar?: File | null;
  termsAccepted?: boolean;
};
export type RequiredSignUpData = {
  password: string;
  passwordConfirm: string;
};
export type SignUpData = OptionalSignUpData & RequiredSignUpData;

// Sign up config
export type AvatarField = {
  type: "avatar";
  required?: boolean;
  maxMB?: number;
};
export type TermsAcceptedField = {
  type: "termsAccepted";
  privacyPolicyURL?: string;
  termsAndConditionsURL?: string;
};
export type TextFieldType =
  | "email"
  | "firstName"
  | "lastName"
  | "name"
  | "username";
export type TextField = {
  type: TextFieldType;
  required?: boolean;
  defaultValue?: string;
};
export type SignUpField = TextField | TermsAcceptedField | AvatarField;
export type SignUpFields = SignUpField[];

// Sign up component
export type FieldChangeHandlers = {
  name?: (value: string) => void;
  firstName?: (value: string) => void;
  lastName?: (value: string) => void;
  email?: (value: string) => void;
  username?: (value: string) => void;
  avatar?: (value: File | null) => void;
  termsAccepted?: (value: boolean) => void;
  password: (value: string) => void;
  passwordConfirm: (value: string) => void;
};

// Sign up response
export type SignUpErrorType =
  | "general"
  | keyof OptionalSignUpData
  | keyof RequiredSignUpData;
export type SignUpError = {
  type: SignUpErrorType;
  message: string;
};
export type SignUpResponse = {
  success: boolean;
  errors: SignUpError[];
};

// Request password reset response
export type RequestPasswordResetResponse = {
  success: boolean;
  error?: string;
};

// oAuth providers
export type OAuthProvider = {
  name: string;
  logoSrc: string;
};
export type OAuthProviders = OAuthProvider[];

// Handlers
export type SignUpHandler = (data: SignUpData) => Promise<SignUpResponse>;
export type AuthWithPasswordHandler = (
  email: string,
  password: string
) => Promise<AuthResponse>;
export type AuthWithOAuthHandler = (provider: string) => Promise<AuthResponse>;
export type RequestPasswordResetHandler = (
  email: string
) => Promise<RequestPasswordResetResponse>;

// Auth config
export type AuthConfig = {
  signUpFields: SignUpFields;
  enableSignUpValidation?: boolean;
  oAuthProviders?: OAuthProviders;
  handlers: {
    authWithPassword: AuthWithPasswordHandler;
    authWithOauth?: AuthWithOAuthHandler;
    requestPasswordReset: RequestPasswordResetHandler;
    signUp: SignUpHandler;
  };
  theme?: Theme;
};
