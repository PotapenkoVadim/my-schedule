import { getToken } from "./auth-storage";

const hostUrl = `${process.env.NEXT_PUBLIC_API_HOST}/api`;

const getHeaders = () => {
  const accessToken = getToken()?.value || "no_token";

  return {
    "Content-type": "application/json",
    Authorization: `Bearer ${accessToken}`,
  };
};

const getApi = async <TR, TP = unknown>(
  uri: string,
  params?: TP,
): Promise<TR> => {
  const getParams = new URLSearchParams(params || "").toString();

  const response = await fetch(`${hostUrl}${uri}?${getParams}`, {
    method: "GET",
    credentials: "include",
    headers: getHeaders(),
  });

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  return response.json() as Promise<TR>;
};

const postApi = async <TR, TP = unknown>(
  uri: string,
  body?: TP,
): Promise<TR> => {
  const response = await fetch(`${hostUrl}${uri}`, {
    method: "POST",
    headers: getHeaders(),
    credentials: "include",
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  return response.json() as Promise<TR>;
};

const deleteApi = async <TR, TP = unknown>(
  uri: string,
  body?: TP,
): Promise<TR> => {
  const response = await fetch(`${hostUrl}${uri}`, {
    method: "DELETE",
    headers: getHeaders(),
    credentials: "include",
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  return response.json() as Promise<TR>;
};

const patchApi = async <TR, TP = unknown>(
  uri: string,
  body?: TP,
): Promise<TR> => {
  const response = await fetch(`${hostUrl}${uri}`, {
    method: "PATCH",
    headers: getHeaders(),
    credentials: "include",
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  return response.json() as Promise<TR>;
};

export { getApi, patchApi, postApi, deleteApi };
