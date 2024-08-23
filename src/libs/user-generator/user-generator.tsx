"use client";

import classnames from "classnames";
import { useRouter } from "next/navigation";
import { Button } from "@/components";
import { isCredentials } from "@/utils";
import { useFetch, useSession } from "@/hooks";
import { generateGuestService } from "@/services";
import { useAppContext } from "@/context";
import { PATHS, WENT_WRONG_ERROR } from "@/constants";
import { useUserStore } from "@/stores";
import { CredentialItems } from "./components";
import styles from "./user-generator.module.scss";

export function UserGenerator({ className }: { className?: string }) {
  const router = useRouter();
  const { showToast } = useAppContext();

  const handleError = () => showToast("error", WENT_WRONG_ERROR);

  const { sigIn, signOut, isSignInLoading } = useSession(handleError);
  const [credentials, setCredentials, resetCredentials] = useUserStore(
    ({ credentials, setCredentials, resetCredentials }) => [
      credentials,
      setCredentials,
      resetCredentials,
    ],
  );

  const { handleFetch, isLoading } = useFetch({
    queryFn: generateGuestService,
    onSuccess: setCredentials,
    onError: handleError,
  });

  const handleSignIn = async () => {
    if (credentials) {
      signOut();
      await sigIn(credentials);
      router.push(PATHS.calendar);
      return;
    }

    handleError();
  };

  return (
    <div className={classnames(styles.generator, className)}>
      <div className={styles.generator__message}>
        <span className="pi pi-info-circle" />
        <span>Создание временного пользователя</span>
      </div>

      <div className={styles.generator__text}>
        Приложение не предусмотрено для массового использования, но его можно
        протестировать. Сгенерируйте временного пользователя. Через сутки
        временный пользователь будет удален.
      </div>

      <div className={styles.generator__content}>
        <div>
          {isCredentials(credentials) ? (
            <>
              <CredentialItems credentials={credentials} />

              <div className={styles.generator__buttons}>
                <Button loading={isSignInLoading} onClick={handleSignIn}>
                  Войти
                </Button>

                <Button onClick={resetCredentials}>Сбросить данные</Button>
              </div>
            </>
          ) : (
            <Button loading={isLoading} onClick={handleFetch}>
              Сгенерировать пользователя
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
