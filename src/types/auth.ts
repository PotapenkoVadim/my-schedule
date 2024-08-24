export type StoredToken = {
  value: string;
  timeStamp: number;
};

export type RoutePermissions =
  | "onlyAdmin"
  | "onlyUser"
  | "onlyLoggedIn"
  | "onlyLoggedOut";
