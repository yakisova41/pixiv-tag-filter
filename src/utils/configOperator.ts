/**
 * localstorageにあるconfigの存在を確認
 * なければ作成
 */
export const configExist = () => {
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
      JSON.stringify(defaultValue)
    );
  } else {
    // config is exist
    const config = JSON.parse(configStr);
    Object.keys(defaultValue).forEach((key) => {
      if (config[key] === undefined) {
        localStorage.setItem(
          "pixiv-tag-filter-config",
          JSON.stringify({ ...config, [key]: defaultValue[key] })
        );
      }
    });
  }
};

/**
 * localstorageからconfigを取得
 * @returns configのオブジェクト
 */
export const get = (): TagFilterConfig => {
  configExist();
  const config: TagFilterConfig = JSON.parse(
    localStorage.getItem("pixiv-tag-filter-config")
  );
  return config;
};

/**
 * localstorageのconfigに値を設定
 * @param key configのkey
 * @param value configに設定する値
 */
export function set<T extends keyof TagFilterConfig>(
  key: T,
  value: TagFilterConfig[T]
) {
  configExist();

  const config = get();
  config[key] = value;

  localStorage.setItem("pixiv-tag-filter-config", JSON.stringify(config));
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
