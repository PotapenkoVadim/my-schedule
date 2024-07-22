"use client";

import { useAppContext } from "@/context";
import { useFetch } from "@/hooks";
import { signInService } from "@/services/sign-in";
import { SignInForm } from "./libs";
import styles from "./page.module.scss";

export default function SignInPage() {
  const { theme } = useAppContext();

  const { isLoading, handleFetch: sigIn } = useFetch({
    queryFn: signInService,
    onSuccess: (response) => {
      console.log("RESPONSE: ", response);
    },
    onError: () => {
      console.log("error");
    },
  });

  return (
    <main data-theme={theme} className={styles.page}>
      <SignInForm theme={theme} onSubmit={sigIn} isLoading={isLoading} />
    </main>
  );
}
