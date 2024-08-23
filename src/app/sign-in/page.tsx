"use client";

import { useAppContext } from "@/context";
import { usePrivateRoute, useSession } from "@/hooks";
import { Spinner, ShapesBackground } from "@/components";
import { SignInForm } from "@/libs";
import { WENT_WRONG_ERROR } from "@/constants";
import styles from "./page.module.scss";

export default function SignInPage() {
  const { theme, showToast } = useAppContext();
  const {
    currentUser,
    sigIn,
    isSessionLoading,
    isSessionError,
    isSignInLoading,
  } = useSession(() => showToast("error", WENT_WRONG_ERROR));
  const { isApprove } = usePrivateRoute(currentUser, "onlyLoggedOut");

  let content;
  if (isSessionLoading || !isApprove || (!currentUser && !isSessionError)) {
    content = <Spinner isPage />;
  } else {
    content = (
      <>
        <ShapesBackground />
        <SignInForm
          theme={theme}
          onSubmit={sigIn}
          isLoading={isSignInLoading}
          className={styles.page__form}
        />
      </>
    );
  }

  return (
    <main data-theme={theme} className={styles.page}>
      {content}
    </main>
  );
}
