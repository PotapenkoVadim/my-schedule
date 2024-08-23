import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { UserEntity } from "@/interfaces";
import { getInitialPath, isAdmin } from "@/utils";

type RouteMode = "onlyAdmin" | "onlyUser" | "onlyLoggedIn" | "onlyLoggedOut";

export const usePrivateRoute = (user: UserEntity | null, mode: RouteMode) => {
  const router = useRouter();
  const [isApprove, setIsApprove] = useState(false);

  useEffect(() => {
    const isUser = Boolean(user);
    const routerConfig = {
      onlyAdmin: isAdmin(user),
      onlyLoggedIn: isUser,
      onlyUser: user && !isAdmin(user),
      onlyLoggedOut: !isUser,
    };

    if (!routerConfig[mode]) router.push(getInitialPath(user));
    else setIsApprove(true);
  }, [user, mode, router]);

  return { isApprove };
};
