import { useEffect, useState } from "react";
import {
  SignUpFields,
  SignUpData,
  SignUpResponse,
  Theme,
  SignUpField,
  FieldChangeHandlers,
  TextField,
  AvatarField,
  TermsAcceptedField,
  SignUpError,
  SignUpErrorType,
} from "../../types";
import styles from "./SignUp.module.css";
import TextInput from "../TextInput/TextInput";
import AcceptTermsCheckbox from "../AcceptTermsCheckbox/AcceptTermsCheckbox";
import AvatarUpload from "../AvatarUpload/AvatarUpload";
import Button from "../Button/Button";
import validateSignUpData from "../../util/validateSignUpData";
import ErrorMessage from "../ErrorMessage/ErrorMessage";

type SignUpProps = {
  theme: Theme;
  fields: SignUpFields;
  enableValidation: boolean;
  handleSignUp?: (data: SignUpData) => Promise<SignUpResponse>;
  setSigningUp: (signingUp: boolean) => void;
};
function SignUp({
  theme,
  fields,
  enableValidation,
  handleSignUp,
  setSigningUp,
}: SignUpProps) {
  const [fieldValues, setFieldValues] = useState<SignUpData>({
    password: "",
    passwordConfirm: "",
    termsAccepted: false,
  });
  const [fieldChangeHandlers, setFieldChangeHandlers] =
    useState<FieldChangeHandlers>({
      password: (value: string) =>
        setFieldValues((prev) => {
          return { ...prev, password: value };
        }),
      passwordConfirm: (value: string) =>
        setFieldValues((prev) => {
          return { ...prev, passwordConfirm: value };
        }),
    });
  const [errors, setErrors] = useState<SignUpError[]>([]);

  function getFirstErrorByType(type: SignUpErrorType) {
    return errors.find((error) => error.type === type)?.message || "";
  }

  async function onSignUpButtonClicked(event: React.FormEvent) {
    event.preventDefault();

    if (enableValidation) {
      const errors = validateSignUpData(fields, fieldValues);
      if (errors.length) {
        setErrors(errors);
        return;
      }
    }

    // Send handleSignUp and handle error
    if (handleSignUp) {
      const response = await handleSignUp(fieldValues);
      if (!response.success && response.errors) {
        setErrors(response.errors);
      }
    } else {
      console.error("No sign up handler method provided");
    }
  }

  // Initialise change handlers for each field supplied
  useEffect(() => {
    setFieldChangeHandlers(
      fields.reduce((acc, field: SignUpField) => {
        if (field.type in fieldChangeHandlers) return acc;
        switch (field.type) {
          case "name":
          case "firstName":
          case "lastName":
          case "email":
          case "username":
            setFieldValues((prev) => {
              return { ...prev, [field.type]: "" };
            });
            return {
              ...acc,
              [field.type]: (value: string) =>
                setFieldValues((prev) => {
                  return { ...prev, [field.type]: value };
                }),
            };
          case "avatar":
            setFieldValues((prev) => {
              return { ...prev, [field.type]: null };
            });
            return {
              ...acc,
              [field.type]: (value: File | null) =>
                setFieldValues((prev) => {
                  return { ...prev, [field.type]: value };
                }),
            };
          case "termsAccepted":
            setFieldValues((prev) => {
              return { ...prev, [field.type]: false };
            });
            return {
              ...acc,
              [field.type]: (value: boolean) =>
                setFieldValues((prev) => {
                  return { ...prev, [field.type]: value };
                }),
            };
        }
      }, fieldChangeHandlers)
    );
  }, [fields, fieldChangeHandlers]);

  // Create components for each supplied field
  const optionalFieldComponents: JSX.Element[] = fields.reduce(
    (acc, field: SignUpField) => {
      // firstName/lastName are a speciel case,
      // since we want them rendered side-by-side
      // See below this .reduce() block for their code
      if (field.type === "firstName" || field.type === "lastName") return acc;
      switch (field.type) {
        case "name":
          acc.push(
            <TextInput
              type="text"
              label="Name"
              placeholder="Your Name"
              accentColor={theme.accentColor}
              onChange={fieldChangeHandlers[field.type]!}
              required={field.required || false}
              error={getFirstErrorByType(field.type)}
            />
          );
          break;
        case "email":
          acc.push(
            <TextInput
              type="email"
              label="Email"
              placeholder="you@example.com"
              accentColor={theme.accentColor}
              onChange={fieldChangeHandlers[field.type]!}
              required={field.required || false}
              error={getFirstErrorByType(field.type)}
            />
          );
          break;
        case "username":
          acc.push(
            <TextInput
              type="text"
              label="Username"
              placeholder="username"
              accentColor={theme.accentColor}
              onChange={fieldChangeHandlers[field.type]!}
              required={field.required || false}
              error={getFirstErrorByType(field.type)}
            />
          );
      }
      return acc;
    },
    [] as JSX.Element[]
  );

  // If both firstName and lastName are supplied, create a component for them
  // and add it at the top of the form
  const firstNameField = fields.find(
    (field) => field.type === "firstName"
  ) as TextField;
  const lastNameField = fields.find(
    (field) => field.type === "lastName"
  ) as TextField;
  const firstNameLastNameInput =
    firstNameField && lastNameField ? (
      <div className={styles.firstLastNameContainer}>
        <TextInput
          type="text"
          label="First Name"
          placeholder="First name"
          accentColor={theme.accentColor}
          onChange={fieldChangeHandlers.firstName!}
          required={firstNameField.required || false}
          error={getFirstErrorByType(firstNameField.type)}
        />
        <TextInput
          type="text"
          label="Last Name"
          placeholder="Last name"
          accentColor={theme.accentColor}
          onChange={fieldChangeHandlers.lastName!}
          required={lastNameField.required || false}
          error={getFirstErrorByType(lastNameField.type)}
        />
      </div>
    ) : null;
  if (firstNameLastNameInput) {
    optionalFieldComponents.unshift(firstNameLastNameInput);
  }

  // If it exists, render this field manually below the password fields
  const termsAcceptedField = fields.find(
    (field) => field.type === "termsAccepted"
  ) as TermsAcceptedField;

  // If it exists, render this field manually above the rest of the fields
  const avatarField = fields.find(
    (field) => field.type === "avatar"
  ) as AvatarField;

  return (
    <div className={styles.signUpContainer}>
      <h1>Sign Up</h1>
      <form className={styles.signUpForm}>
        {getFirstErrorByType("general") && (
          <ErrorMessage style={{ marginBottom: "1em" }}>
            {getFirstErrorByType("general")}
          </ErrorMessage>
        )}
        {avatarField && (
          <>
            <AvatarUpload
              onChange={fieldChangeHandlers.avatar!}
              required={avatarField.required || false}
            />
            {getFirstErrorByType("avatar") && (
              <ErrorMessage style={{ marginTop: "-2em", marginBottom: "2em" }}>
                {getFirstErrorByType("avatar")}
              </ErrorMessage>
            )}
          </>
        )}
        {...optionalFieldComponents}
        <TextInput
          type="password"
          label="Password"
          placeholder="password"
          accentColor={theme.accentColor}
          onChange={fieldChangeHandlers.password}
          error={getFirstErrorByType("password")}
          required
        />
        <TextInput
          type="password"
          label="Confirm Password"
          placeholder="password"
          accentColor={theme.accentColor}
          onChange={fieldChangeHandlers.passwordConfirm}
          error={getFirstErrorByType("passwordConfirm")}
          required
        />
        {termsAcceptedField && (
          <AcceptTermsCheckbox
            onChange={fieldChangeHandlers.termsAccepted!}
            privacyPolicyURL={termsAcceptedField.privacyPolicyURL}
            termsAndConditionsURL={termsAcceptedField.termsAndConditionsURL}
          />
        )}
        {getFirstErrorByType("termsAccepted") && (
          <ErrorMessage style={{ marginBottom: "1em" }}>
            {getFirstErrorByType("termsAccepted")}
          </ErrorMessage>
        )}
        <Button theme={theme} onClick={onSignUpButtonClicked}>
          Sign Up
        </Button>
      </form>
      <span className={styles.logInPrompt}>
        Already have an account?{" "}
        <b className={styles.logInText} onClick={() => setSigningUp(false)}>
          Log in
        </b>
      </span>
    </div>
  );
}

export default SignUp;
