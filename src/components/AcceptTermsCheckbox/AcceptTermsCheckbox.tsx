import styles from "./AcceptTermsCheckbox.module.css";

type AcceptTermsCheckboxProps = {
  onChange: (value: boolean) => void;
  privacyPolicyURL?: string;
  termsAndConditionsURL?: string;
};
function AcceptTermsCheckbox({
  onChange,
  privacyPolicyURL,
  termsAndConditionsURL,
}: AcceptTermsCheckboxProps) {
  const linkElements = [];
  if (privacyPolicyURL) {
    linkElements.push(
      <a href={privacyPolicyURL} target="_blank">
        Privacy Policy
      </a>
    );
  }
  if (termsAndConditionsURL) {
    linkElements.push(
      <a href={termsAndConditionsURL} target="_blank">
        Terms & Conditions
      </a>
    );
  }
  if (linkElements.length === 0) {
    console.error("No privacy policy or terms & conditions URL provided.");
    return <></>;
  }
  const prompt = (
    <label htmlFor="termsAccepted" className={styles.acceptTermsText}>
      I accept the {linkElements[0]}{" "}
      {linkElements.length > 1 ? <>and {linkElements[1]}</> : ""}
    </label>
  );

  return (
    <div className={styles.acceptTermsContainer}>
      <input
        className={styles.acceptTermsCheckbox}
        type="checkbox"
        name="termsAccepted"
        id="termsAccepted"
        defaultChecked={false}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          onChange(event.currentTarget.checked);
        }}
      />
      {prompt}
    </div>
  );
}

export default AcceptTermsCheckbox;
