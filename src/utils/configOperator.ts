/**
 * localstorageにあるconfigの存在を確認
 * なければ作成
 */
export const configExist = () => {
  const config = localStorage.getItem("pixiv-tag-filter-config");

  if (config === null) {
    localStorage.setItem(
      "pixiv-tag-filter-config",
      JSON.stringify({
        blocklist: [],
        block: true,
        users: false,
      })
    );
  }
};

/**
 * localstorageからconfigを取得
 * @returns configのオブジェクト
 */
export const get = (): TagFilterConfig => {
  configExist();
  return JSON.parse(localStorage.getItem("pixiv-tag-filter-config"));
};

/**
 * localstorageのconfigに値を設定
 * @param key configのkey
 * @param value configに設定する値
 */
export const set = (key: keyof TagFilterConfig, value: any) => {
  configExist();

  const config = get();
  config[key] = value;

  localStorage.setItem("pixiv-tag-filter-config", JSON.stringify(config));
};

export type Users =
  | "00"
  | "00"
  | "000"
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

export type TagFilterConfig = {
  blocklist?: string[];
  block?: boolean;
  users?: false | Users;
};
