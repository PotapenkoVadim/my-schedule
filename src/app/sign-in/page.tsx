"use client";

import { useAppContext } from "@/context";
import { useRouter } from "next/navigation";
import { useFetch, useSession } from "@/hooks";
import { signInService } from "@/services";
import { PATHS, SIGN_IN_ERROR } from "@/constants";
import { useUserStore } from "@/stores/user";
import { Spinner, ShapesBackground } from "@/components";
import { SignInForm } from "@/libs";
import { useOrderStore } from "@/stores/order";
import styles from "./page.module.scss";

export default function SignInPage() {
  const router = useRouter();
  const { theme, showToast } = useAppContext();
  const { isSessionLoading, isSessionError } = useSession();
  const [user, setUser] = useUserStore(({ user, setUser }) => [user, setUser]);
  const [setOrderList] = useOrderStore(({ setOrderList }) => [setOrderList]);

  const { isLoading, handleFetch: sigIn } = useFetch({
    queryFn: signInService,
    onSuccess: (response) => {
      if (!response) throw new Error();

      setUser(response);
      setOrderList(response.orders || null);
      router.push(PATHS.calendar);
    },
    onError: () => showToast("error", SIGN_IN_ERROR),
  });

  let content;
  if (isSessionLoading || (!user && !isSessionError)) {
    content = <Spinner isPage />;
  } else {
    content = (
      <>
        <ShapesBackground />
        {!user ? (
          <SignInForm
            theme={theme}
            onSubmit={sigIn}
            isLoading={isLoading}
            className={styles.page__form}
          />
        ) : (
          <div className={styles.page__greeting}>Привет, {user.username}!</div>
        )}
      </>
    );
  }

  return (
    <main data-theme={theme} className={styles.page}>
      {content}
    </main>
  );
}
