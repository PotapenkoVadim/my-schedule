import styles from "./form-error.module.scss";

export function FormError({ error }: { error?: string }) {
  if (!error) return null;

  return <span className={styles.error}>{error}</span>;
}
