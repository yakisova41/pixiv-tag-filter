import { defineManifest } from "crx-monkey-next";

export default defineManifest({
  name: "__MSG_Name__",
  short_name: "name",
  version: "0.3.2",
  manifest_version: 3,
  description: "__MSG_Description__",
  content_scripts: [
    {
      matches: ["https://www.pixiv.net/*"],
      js: ["src/contentScripts.ts"],
      css: ["src/contentStyle.css"],
      world: "MAIN",
      userscript_direct_inject: true,
      use_isolated_connection: true,
    },
  ],
  background: {
    service_worker: "src/sw.ts",
  },
  default_locale: "en",
  action: {
    default_popup: "./popup/index.html",
  },
  permissions: ["activeTab"],
});
