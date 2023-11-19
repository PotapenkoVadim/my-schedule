export interface ApiClient {
  get: <T, R>(cmd: string, options?: R) => Promise<T>;
  post: <T, R>(cmd: string, options?: R) => Promise<T>;
  put: <T, R>(cmd: string, options?: R) => Promise<T>;
  delete: <T, R>(cmd: string, options?: R) => Promise<T>;
}