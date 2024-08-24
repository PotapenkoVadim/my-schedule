import { getToken } from "./auth-storage";

type Methods = "GET" | "POST" | "DELETE" | "PATCH";
const hostUrl = `${process.env.NEXT_PUBLIC_API_HOST}/api`;

const getParams = <T>(method: Methods, body?: T): RequestInit => {
  const accessToken = getToken()?.value || "no_token";

  return {
    method,
    credentials: "include",
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    ...(Boolean(body) && { body: JSON.stringify(body) }),
  };
};

const getApi = async <TR, TP = unknown>(
  uri: string,
  params?: TP,
): Promise<TR> => {
  const queryParams = new URLSearchParams(params || "").toString();
  const fetchParams = getParams("GET");

  const response = await fetch(`${hostUrl}${uri}?${queryParams}`, fetchParams);

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  return response.json() as Promise<TR>;
};

const postApi = async <TR, TP = unknown>(
  uri: string,
  body?: TP,
): Promise<TR> => {
  const fetchParams = getParams("POST", body);
  const response = await fetch(`${hostUrl}${uri}`, fetchParams);

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  return response.json() as Promise<TR>;
};

const deleteApi = async <TR, TP = unknown>(
  uri: string,
  body?: TP,
): Promise<TR> => {
  const fetchParams = getParams("DELETE", body);
  const response = await fetch(`${hostUrl}${uri}`, fetchParams);

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  return response.json() as Promise<TR>;
};

const patchApi = async <TR, TP = unknown>(
  uri: string,
  body?: TP,
): Promise<TR> => {
  const fetchParams = getParams("PATCH", body);
  const response = await fetch(`${hostUrl}${uri}`, fetchParams);

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  return response.json() as Promise<TR>;
};

export { getApi, patchApi, postApi, deleteApi };
