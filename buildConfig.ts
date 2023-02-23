import packagejson from "./package.json";

export const userScriptHeader = {
  "@name": "Pixiv Automatic exclusion search",
  "@name:zh-CN": "Pixiv 自动排除搜索",
  "@name:ja": "Pixiv 自動で除外検索",
  "@version": packagejson.version,
  "@license": "MIT",
  "@author": "yakisova41",
  "@namespace": "https://yakisova.com/",
  "@description":
    'Pixiv Automatically exclude specific tags, auto filter with "users"',
  "@description:ja":
    "Pixiv 特定タグを自動除外 users入りのみに自動絞り込みする機能を追加します。",
  "@description:zh-CN": 'Pixiv 自动排除特定标签，自动过滤与 "users"。',
  "@match": "https://www.pixiv.net/*",
  "@grant": "none",
};

export const devServer = {
  port: 56026,
  host: "localhost",
  websocket: 25543,
  hot: true,
};

/**
 * Chrome extension support
 * manifest v3
 */
export const manifest = {
  name: "__MSG_Name__",
  short_name: "name",
  version: packagejson.version,
  manifest_version: 3,
  description: "__MSG_Description__",
  content_scripts: [
    {
      matches: ["https://www.pixiv.net/*"],
      js: ["contentScript.js"],
    },
  ],
  web_accessible_resources: [
    {
      resources: ["embed.js"],
      matches: ["https://www.pixiv.net/*"],
    },
  ],
  default_locale: "en",
};
