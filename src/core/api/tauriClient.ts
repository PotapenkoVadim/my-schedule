import { invoke} from "@tauri-apps/api";
import { InvokeArgs} from "@tauri-apps/api/tauri";
import { ApiClient } from "../interfaces";

class TauriClient implements ApiClient {
  async invoke<T, R>(cmd: string, options?: R) {
    return invoke<string>(cmd, options as InvokeArgs).then((data) => JSON.parse(data) as T);
  }

  get<T, R>(cmd: string, options?: R) {
    return this.invoke<T, R>(cmd, options);
  }

  post<T, R>(cmd: string, options?: R) {
    return this.invoke<T, R>(cmd, options);
  }

  put<T, R>(cmd: string, options?: R) {
    return this.invoke<T, R>(cmd, options);
  }

  delete<T, R>(cmd: string, options?: R) {
    return this.invoke<T, R>(cmd, options);
  }
}

export default new TauriClient();