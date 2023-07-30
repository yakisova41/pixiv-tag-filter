const path = require("path");
const packagejson = require("./package.json");
const scssPlugin = require("./plugins/esbuildSsrScssModulesPlugin");

module.exports = {
  userScriptHeader: [
    ["@name", "Pixiv Automatic exclusion search"],
    ["@name:zh-CN", "Pixiv 自动排除搜索"],
    ["@name:ja", "Pixiv 自動で除外検索"],
    ["@version", packagejson.version],
    ["@license", "MIT"],
    ["@author", "yakisova41"],
    ["@namespace", "https://yakisova.com/"],
    [
      "@description",
      'Pixiv Automatically exclude specific tags] auto filter with "users"',
    ],
    [
      "@description:ja",
      "Pixiv 特定タグを自動除外 users入りのみに自動絞り込みする機能を追加します。",
    ],
    ["@description:zh-CN", 'Pixiv 自动排除特定标签，自动过滤与 "users"。'],
    ["@match", "https://www.pixiv.net/*"],
    ["@grant", "none"],
  ],
  devServer: {
    port: 5173,
    host: "localhost",
    websocket: 5174,
    hot: true,
  },
  manifest: {
    name: "__MSG_Name__",
    short_name: "name",
    version: packagejson.version,
    manifest_version: 3,
    description: "__MSG_Description__",
    default_locale: "en",
  },
  locales: {
    ja: {
      Name: {
        message: "Pixiv tag filter",
      },
      Description: {
        message: "extension description",
      },
    },
    en: {
      Name: {
        message: "Pixiv tag filter",
      },
      Description: {
        message: "extension description",
      },
    },
  },
  esBuild: {
    plugins: [
      scssPlugin({
        jsCSSInject: true,
      }),
    ],
    target: "es2022",
    entryPoints: [path.join(__dirname, "src/index.ts")],
  },
};
