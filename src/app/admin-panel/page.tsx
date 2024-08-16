"use client";

import { useAppContext } from "@/context";
import { useRouter } from "next/navigation";
import { useSession } from "@/hooks";
import { isAdmin } from "@/utils";
import { PATHS } from "@/constants";
import { Spinner } from "@/components";
import styles from "./page.module.scss";

export default function AdminPanel() {
  const router = useRouter();
  const { theme } = useAppContext();

  const { currentUser, isSessionLoading, isSessionError } = useSession();

  if (!currentUser || !isAdmin(currentUser)) {
    router.push(PATHS.home);
  }

  let content;
  if (isSessionLoading || (!currentUser && !isSessionError)) {
    content = <Spinner isPage />;
  } else {
    content = <div>Admin Panel</div>;
  }

  return (
    <main data-theme={theme} className={styles.page}>
      {content}
    </main>
  );
}
