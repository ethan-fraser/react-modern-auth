import styles from "./FormHeader.module.css";

interface FormHeaderProps {
  children: React.ReactNode;
}
export default function FormHeader({ children }: FormHeaderProps) {
  return <div className={styles.formHeader}>{children}</div>;
}
