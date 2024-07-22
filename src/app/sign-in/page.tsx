"use client";

import { useAppContext } from "@/context";
import { SignInForm } from "./libs";
import { UserCredentials } from "./interfaces";
import styles from "./page.module.scss";

export default function SignInPage() {
  const { theme } = useAppContext();

  const sigIn = (credentials: UserCredentials) => {
    console.log("USER: ", credentials);
  };

  return (
    <main data-theme={theme} className={styles.page}>
      <SignInForm theme={theme} onSubmit={sigIn} isLoading={false} />
    </main>
  );
}
