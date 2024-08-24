import { UserCredentials } from "@/interfaces";
import styles from "./credential-items.module.scss";

export function CredentialItems({
  credentials,
}: {
  credentials: UserCredentials;
}) {
  return (
    <>
      {Object.keys(credentials).map((key) => (
        <div className={styles.credentials__item}>
          <span>{key}:</span>
          <span>{credentials[key as "username" | "password"]}</span>
        </div>
      ))}
    </>
  );
}
