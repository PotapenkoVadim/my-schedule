"use client";

import { useAppContext } from "@/context";
import { useSession } from "@/hooks";
import { Spinner, ShapesBackground } from "@/components";
import { SignInForm } from "@/libs";
import styles from "./page.module.scss";

export default function SignInPage() {
  const { theme } = useAppContext();
  const {
    currentUser,
    sigIn,
    isSessionLoading,
    isSessionError,
    isSignInLoading,
  } = useSession();

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
            isLoading={isSignInLoading}
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
