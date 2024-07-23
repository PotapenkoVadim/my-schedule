"use client";

import { useAppContext } from "@/context";
import { useRouter } from "next/navigation";
import { useFetch } from "@/hooks";
import { signInService } from "@/services";
import { PATHS, SIGN_IN_ERROR } from "@/constants";
import { useUserStore } from "@/stores/user";
import { ShapesBackground } from "@/components";
import { SignInForm } from "./libs";
import styles from "./page.module.scss";

export default function SignInPage() {
  const router = useRouter();
  const { theme, showToast } = useAppContext();
  const [setUser] = useUserStore(({ setUser }) => [setUser]);

  const { isLoading, handleFetch: sigIn } = useFetch({
    queryFn: signInService,
    onSuccess: (response) => {
      if (!response) throw new Error();

      setUser(response);
      router.push(PATHS.calendar);
    },
    onError: () => showToast("error", SIGN_IN_ERROR),
  });

  return (
    <main data-theme={theme} className={styles.page}>
      <ShapesBackground />
      <SignInForm
        theme={theme}
        onSubmit={sigIn}
        isLoading={isLoading}
        className={styles.page__form}
      />
    </main>
  );
}
