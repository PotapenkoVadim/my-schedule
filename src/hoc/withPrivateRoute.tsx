import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "@/hooks";
import { checkUserPermissions, getInitialPath } from "@/utils";
import { Spinner } from "@/components";
import { RoutePermissions } from "@/types";
import { useAppContext } from "@/context";

export function withPrivateRoute<P>(
  WrappedComponent: React.ComponentType<P>,
  routePermission: RoutePermissions,
) {
  function ComponentWithPrivateRoute(props: any) {
    const router = useRouter();
    const [isApprove, setIsApprove] = useState(false);
    const { currentUser, isSessionSuccess } = useSession();
    const { theme } = useAppContext();

    useEffect(() => {
      if (isSessionSuccess !== undefined || currentUser) {
        if (checkUserPermissions(routePermission, currentUser)) {
          setIsApprove(true);
        } else {
          router.push(getInitialPath(currentUser));
        }
      }
    }, [isSessionSuccess, currentUser, router]);

    if (!isApprove) return <Spinner theme={theme} isPage />;

    return <WrappedComponent {...props} />;
  }

  return ComponentWithPrivateRoute;
}
