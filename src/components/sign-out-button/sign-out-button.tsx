import { UserEntity } from "@/interfaces";
import { PermissionGuard } from "@/libs";
import { UserScopes } from "@/types";
import { LoadingButton } from "../loading-button/Loading-button";

export function SignOutButton({
  user,
  onSignOut,
  isLoading,
  className,
}: {
  user: UserEntity | null;
  onSignOut: () => void;
  isLoading: boolean;
  className?: string;
}) {
  if (!user) return null;

  return (
    <PermissionGuard currentUser={user} scopes={[UserScopes.allowCommon]}>
      <LoadingButton
        loading={isLoading}
        onClick={onSignOut}
        className={className}
      >
        Выйти
      </LoadingButton>
    </PermissionGuard>
  );
}
