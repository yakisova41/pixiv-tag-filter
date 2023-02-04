import React from "react";
import ReactDOM from "react-dom/client";
import OptionScreen from "./components/optionScreen/OptionScreen";

/**
 * optionの要素を作成します
 */
function addingOptionScreen() {
    const rootElement = document.createElement("div");
    rootElement.id = "pixiv_tag_filter_options_root";
    document.querySelector("body").appendChild(rootElement);
    const reactRoot = ReactDOM.createRoot(rootElement);

    reactRoot.render(
        <React.StrictMode>
            <OptionScreen />
        </React.StrictMode>
    );
}

export default addingOptionScreen;
