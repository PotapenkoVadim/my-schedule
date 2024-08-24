import { UserEntity } from "@/interfaces";
import { PermissionGuard } from "@/libs";
import { UserScopes } from "@/types";
import { Button } from "@/components";

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
      <Button loading={isLoading} onClick={onSignOut} className={className}>
        Выйти
      </Button>
    </PermissionGuard>
  );
}
