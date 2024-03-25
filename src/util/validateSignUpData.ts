import {
  SignUpFields,
  SignUpData,
  TermsAcceptedField,
  SignUpError,
} from "../types";

export default function validateSignUpData(
  fields: SignUpFields,
  data: SignUpData
) {
  const errors: SignUpError[] = [];

  for (const field of fields) {
    const fieldValue = data[field.type];

    // Validate required fields
    if ("required" in field && field.required) {
      if (
        fieldValue === null ||
        fieldValue === undefined ||
        fieldValue === ""
      ) {
        errors.push({
          type: field.type,
          message: `${fieldTypeToFieldName[field.type]} is required.`,
        });
      }
    }

    // Validate avatar file size
    if (field.type === "avatar" && "maxMB" in field && fieldValue) {
      const maxMB = field.maxMB;
      const avatarFileSizeMb = (fieldValue as File).size / (1024 * 1024);
      console.log(avatarFileSizeMb);
      if (maxMB && avatarFileSizeMb >= maxMB) {
        errors.push({
          type: "avatar",
          message: `Avatar file must be smaller than ${field.maxMB}MB.`,
        });
      }
    }
  }

  // If enforceAutomatically is true, enforce that terms were accepted
  const termsAcceptedField = fields.find(
    (field) => field.type === "termsAccepted"
  ) as TermsAcceptedField;
  if (termsAcceptedField && !data.termsAccepted) {
    const terms: string[] = [];
    if (termsAcceptedField.privacyPolicyURL) terms.push("Privacy Policy");
    if (termsAcceptedField.termsAndConditionsURL)
      terms.push("Terms & Conditions");
    if (terms.length === 0) {
      console.error(
        "The termsAccepted field was included, but no privacy policy or " +
          "terms & conditions URL was provided. Continuing with sign up as " +
          "if the termsAccepted field was not included."
      );
    } else {
      errors.push({
        type: "termsAccepted",
        message: `Please read and accept the ${terms[0]}${
          terms.length > 1 ? ` and ${terms[1]}.` : "."
        }`,
      });
    }
  }

  // Validate password
  const password = data.password;
  if (password.length < 8) {
    errors.push({
      type: "password",
      message: "Password must be at least 8 characters.",
    });
  }

  // Validate passwords matching
  const passwordConfirm = data.passwordConfirm;
  if (passwordConfirm !== password) {
    errors.push({
      type: "passwordConfirm",
      message: "Passwords do not match.",
    });
  }

  return errors;
}

const fieldTypeToFieldName = {
  email: "Email",
  name: "Name",
  firstName: "First name",
  lastName: "Last name",
  username: "Username",
  avatar: "Avatar",
};
