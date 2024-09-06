import React from "react";
import { Spinner } from "@/components";
import { RoutePermissions } from "@/types";
import { useAppContext } from "@/context";
import { usePrivateRoute } from "@/hooks/use-private-route";

export function withPrivateRoute<P>(
  WrappedComponent: React.ComponentType<P>,
  routePermission: RoutePermissions,
) {
  function ComponentWithPrivateRoute(props: any) {
    const { theme } = useAppContext();
    const { isApproved } = usePrivateRoute(routePermission);

    if (!isApproved) return <Spinner theme={theme} isPage />;

    return <WrappedComponent {...props} />;
  }

  return ComponentWithPrivateRoute;
}
