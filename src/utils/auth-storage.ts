import { TOKEN_KEY, TOKEN_TTL_MS } from "@/constants";
import { StoredToken } from "@/types";

export const isExpired = (timeStamp?: number): boolean => {
  if (!timeStamp) return false;

  const now = new Date().getTime();
  const diff = now - timeStamp;

  return diff > TOKEN_TTL_MS;
};

export const setToken = (access_token: string): void => {
  localStorage.setItem(
    TOKEN_KEY,
    JSON.stringify({
      value: access_token,
      timeStamp: new Date().getTime(),
    }),
  );
};

export const removeToken = (): void => {
  localStorage.removeItem(TOKEN_KEY);
};

export const getToken = (): StoredToken | null => {
  let result = null;

  const storedToken = localStorage.getItem(TOKEN_KEY);
  if (storedToken) {
    result = JSON.parse(storedToken);
  }

  return result;
};
