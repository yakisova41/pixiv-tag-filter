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
    },
  ],
  web_accessible_resources: [
    {
      resources: ["embed.js"],
      matches: ["https://www.pixiv.net/*"],
    },
  ],
  default_locale: "en",
});
