import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { ConfigProvider } from "./ConfigCtx";
import { translate } from "../src/translate";
import pkg from "../package.json";

const rootElem = document.querySelector("#root")!;
const root = createRoot(rootElem);

(async () => {
  let isPixiv = true;

  if (typeof chrome !== "undefined") {
    if (typeof chrome.tabs !== "undefined") {
      const [tab] = await chrome.tabs.query({
        active: true,
        currentWindow: true,
      });
      const url = new URL(tab.url);
      if (url.host !== "www.pixiv.net") {
        isPixiv = false;
      }
    }
  }

  root.render(
    <StrictMode>
      {isPixiv ? (
        <ConfigProvider>
          <App />
        </ConfigProvider>
      ) : (
        <div className="container">
          <div className="top">
            <div className="brand">
              <h1>{translate("Pixiv tag filter")}</h1>
              <span className="version">v {pkg.version}</span>
            </div>
          </div>
          <p>
            {translate(
              "Please open the settings popup while viewing a Pixiv page.",
            )}
          </p>
        </div>
      )}
    </StrictMode>,
  );
})();
