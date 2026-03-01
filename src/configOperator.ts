import { getRunningRuntime, message } from "crx-monkey-next/client";
import { SetConfigMessage } from "../popup/ConfigCtx";

/**
 * localstorageからconfigを取得
 * @returns configのオブジェクト
 */
export function get(): TagFilterConfig {
  configExistCheck();
  const config: TagFilterConfig = JSON.parse(
    localStorage.getItem("pixiv-tag-filter-config"),
  );
  return config;
}

/**
 * localstorageのconfigに値を設定
 * @param key configのkey
 * @param value configに設定する値
 */
export function set<T extends keyof TagFilterConfig>(
  key: T,
  value: TagFilterConfig[T],
) {
  configExistCheck();

  const config = get();
  config[key] = value;

  localStorage.setItem("pixiv-tag-filter-config", JSON.stringify(config));
  document.dispatchEvent(new CustomEvent("pixiv-tag-filter-config-update"));
}

export function setupConfigMessageReciever() {
  if (document.currentScript !== null) {
    // userjs
    window.addEventListener("message", (e) => {
      const { data } = e;

      if (data.type === "get-config") {
        const config = get();

        const responseData: GetConfigResponse = {
          type: "get-config-response",
          data: { config },
        };
        e.source.postMessage(responseData, { targetOrigin: "*" });
      }

      if (data.type === "set-config") {
        const {
          content: { key, value },
        } = data as SetConfigMessage;
        set(key, value);
      }
    });
  } else {
    message.addListener<any>((msg, senders) => {
      if (msg.type === "get-config") {
        const config = get();

        const responseData: GetConfigResponse = {
          type: "get-config-response",
          data: { config },
        };
        message.sendMessage(responseData);
      }

      if (msg.type === "set-config") {
        const {
          content: { key, value },
        } = msg as SetConfigMessage;
        set(key, value);
      }
    });
  }
}

function configExistCheck() {
  const defaultValue = {
    blocklist: [],
    block: true,
    users: false,
    ugoiraBlock: false,
    r18gBlock: false,
  };

  const configStr = localStorage.getItem("pixiv-tag-filter-config");

  if (configStr === null) {
    localStorage.setItem(
      "pixiv-tag-filter-config",
      JSON.stringify(defaultValue),
    );
  } else {
    // config is exist
    const config = JSON.parse(configStr);
    Object.keys(defaultValue).forEach((key) => {
      if (config[key] === undefined) {
        localStorage.setItem(
          "pixiv-tag-filter-config",
          JSON.stringify({ ...config, [key]: defaultValue[key] }),
        );
      }
    });
  }
}

export interface GetConfigResponse {
  type: "get-config-response";
  data: { config: TagFilterConfig };
}

export type Users =
  | "00"
  | "000"
  | "0000"
  | "50"
  | "100"
  | "300"
  | "500"
  | "1000"
  | "5000"
  | "10000"
  | "20000"
  | "30000"
  | "40000"
  | "50000";

export interface TagFilterConfig {
  blocklist: string[];
  block: boolean;
  users: false | Users;
  ugoiraBlock: boolean;
  r18gBlock: boolean;
}
