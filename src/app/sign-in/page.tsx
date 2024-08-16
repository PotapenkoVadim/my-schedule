"use client";

import { useAppContext } from "@/context";
import { useRouter } from "next/navigation";
import { useFetch, useSession } from "@/hooks";
import { signInService } from "@/services";
import { PATHS, SIGN_IN_ERROR } from "@/constants";
import { Spinner, ShapesBackground } from "@/components";
import { SignInForm } from "@/libs";
import { useOrderStore } from "@/stores/order";
import styles from "./page.module.scss";

export default function SignInPage() {
  const router = useRouter();
  const { theme, showToast } = useAppContext();
  const { currentUser, setCurrentUser, isSessionLoading, isSessionError } =
    useSession();
  const [setOrderList] = useOrderStore(({ setOrderList }) => [setOrderList]);

  const { isLoading, handleFetch: sigIn } = useFetch({
    queryFn: signInService,
    onSuccess: (response) => {
      if (!response) throw new Error();

      setCurrentUser(response);
      setOrderList(response.orders || null);
      router.push(PATHS.calendar);
    },
    onError: () => showToast("error", SIGN_IN_ERROR),
  });

  let content;
  if (isSessionLoading || (!currentUser && !isSessionError)) {
    content = <Spinner isPage />;
  } else {
    content = (
      <>
        <ShapesBackground />
        {!currentUser ? (
          <SignInForm
            theme={theme}
            onSubmit={sigIn}
            isLoading={isLoading}
            className={styles.page__form}
          />
        ) : (
          <div className={styles.page__greeting}>
            Привет, {currentUser.username}!
          </div>
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
