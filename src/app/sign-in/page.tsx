"use client";

import { useAppContext } from "@/context";
import { useSession } from "@/hooks";
import { Spinner, ShapesBackground, PageContent } from "@/components";
import { SignInForm } from "@/libs";
import { WENT_WRONG_ERROR } from "@/constants";
import { withPrivateRoute } from "@/hoc";
import { getToken } from "@/utils";
import styles from "./page.module.scss";

function SignInPage() {
  const token = getToken();
  const { theme, showToast } = useAppContext();
  const { sigIn, isSessionLoading, isSignInLoading } = useSession(() =>
    showToast("error", WENT_WRONG_ERROR),
  );

  let content;
  if (isSessionLoading || token) {
    content = <Spinner isPage />;
  } else {
    content = (
      <div className={styles.page__content}>
        <ShapesBackground />
        <PageContent>
          <SignInForm
            theme={theme}
            onSubmit={sigIn}
            isLoading={isSignInLoading}
            className={styles.page__form}
          />
        </PageContent>
      </div>
    );
  }

  return <div className={styles.page}>{content}</div>;
}

export default withPrivateRoute(SignInPage, "onlyLoggedOut");
