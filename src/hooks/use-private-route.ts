import { useRouter } from "next/navigation";
import { checkUserPermissions, getInitialPath, getToken } from "@/utils";
import { useEffect, useReducer } from "react";
import { CURRENT_YEAR } from "@/constants";
import { RoutePermissions } from "@/types";
import { useSession } from "./use-session";

interface PrivateRouteState {
  isFetched: boolean;
  isApproved: boolean;
}

type PrivateRouteActions =
  | { type: "session_fetched" }
  | { type: "route_approved" };

const privateRouteReducer = (
  state: PrivateRouteState,
  action: PrivateRouteActions,
) => {
  switch (action.type) {
    case "session_fetched":
      return {
        ...state,
        isFetched: true,
      };

    case "route_approved":
      return {
        ...state,
        isApproved: true,
      };

    default:
      throw new Error();
  }
};

export const usePrivateRoute = (routePermission: RoutePermissions) => {
  const router = useRouter();
  const { currentUser, getSession } = useSession();

  const [{ isApproved, isFetched }, dispatch] = useReducer(
    privateRouteReducer,
    {
      isFetched: false,
      isApproved: false,
    },
  );

  useEffect(() => {
    const token = getToken();

    if (!currentUser && token) {
      getSession(CURRENT_YEAR).then(() =>
        dispatch({ type: "session_fetched" }),
      );
    } else {
      dispatch({ type: "session_fetched" });
    }
  }, []);

  useEffect(() => {
    if (isFetched) {
      if (checkUserPermissions(routePermission, currentUser)) {
        dispatch({ type: "route_approved" });
      } else {
        router.push(getInitialPath(currentUser));
      }
    }
  }, [currentUser, isFetched]);

  return { isApproved };
};
