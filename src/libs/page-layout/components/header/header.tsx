import { useRouter } from "next/navigation";
import { ThemeVariant, UserScopes } from "@/types";
import { Avatar, Logo } from "@/components";
import { PATHS } from "@/constants";
import { PermissionGuard } from "@/libs/permission-guard/permission-guard";
import { useSession } from "@/hooks";
import styles from "./header.module.scss";

export function Header({ theme }: { theme: ThemeVariant }) {
  const router = useRouter();
  const { currentUser } = useSession();

  const moveToHome = () => {
    router.push(PATHS.home);
  };

  return (
    <header data-theme={theme} className={styles.header}>
      <div className={styles.header__content}>
        <Logo onClick={moveToHome} className={styles.header__logo} />

        <PermissionGuard
          currentUser={currentUser}
          scopes={[UserScopes.allowCommon]}
        >
          <Avatar icon="pi pi-user" size="normal" shape="circle" />
        </PermissionGuard>
      </div>
    </header>
  );
}
